import { ref, computed } from "vue";
import { chatStream, sendAIFeedback } from "@/api/aiQwen";
import type { ChatMessage, ChatStatus } from "@/types/chat";

function uid() {
    // 简单够用，避免 index key
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function useChat() {
    const messages = ref<ChatMessage[]>([]);
    const input = ref("");
    const status = ref<ChatStatus>("idle");
    const errorMsg = ref("");
    const currentAIIndex = ref<number | null>(null);

    let abortCtrl: AbortController | null = null;

    // raf 合并更新
    let pending = "";
    let rafId = 0;

    const isStreaming = computed(() => status.value === "streaming");

    function flushTo(aiIndex: number) {
        if (!pending) return;
        if (messages.value[aiIndex]) {
            messages.value[aiIndex].content += pending;
        }
        pending = "";
    }

    function scheduleFlush(aiIndex: number) {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            flushTo(aiIndex);
        });
    }

    async function send() {
        if (!input.value.trim() || isStreaming.value) return;

        errorMsg.value = "";
        if (status.value !== "waiting_action") {
            status.value = "streaming";
        }

        const userText = input.value.trim();
        input.value = "";

        messages.value.push({
            id: uid(),
            role: "user",
            content: userText,
            createdAt: Date.now(),
            feedback: null,
        });

        const aiIndex =
            messages.value.push({
                id: uid(),
                role: "assistant",
                content: "",
                createdAt: Date.now(),
            }) - 1;

        currentAIIndex.value = aiIndex;

        abortCtrl = new AbortController();

        // ⚠️ 发送给后端的 messages：不要带 id/createdAt
        const payload = messages.value.map((m) => ({ role: m.role, content: m.content }));

        await chatStream(
            payload,
            {
                onDelta: (text: string) => {
                    pending += text;
                    scheduleFlush(aiIndex);
                },
                onDone: () => {
                    // 结束前把残留刷进去
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = 0;
                    flushTo(aiIndex);

                    if (status.value !== "waiting_action") {
                        status.value = "idle";
                    }

                    abortCtrl = null;
                },
                onError: (msg: string) => {
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = 0;
                    flushTo(aiIndex);

                    status.value = "error";
                    errorMsg.value = msg || "AI 出错";
                    if (messages.value[aiIndex]) {
                        messages.value[aiIndex].content += "\n\n⚠️ AI 出错，请稍后重试。";
                    }
                    abortCtrl = null;
                },
            },
            abortCtrl.signal
        );
    }

    function stop() {
        if (!abortCtrl) return;
        abortCtrl.abort();
        abortCtrl = null;
        if (status.value !== "waiting_action") {
            status.value = "idle";
        }

    }

    function clear() {
        stop();
        messages.value = [];
        input.value = "";
        errorMsg.value = "";
        if (status.value !== "waiting_action") {
            status.value = "idle";
        }

    }

    async function continueWithFeedback(payload: any) {
        errorMsg.value = "";

        // ⭐ 从 waiting_action → streaming
        if (status.value !== "waiting_action") {
            status.value = "streaming";
        }

        // ⭐⭐⭐ 关键：清空 pending（否则第二次 AI 内容会被吞）
        pending = "";

        // ⭐ 新建一条 assistant 消息
        const aiIndex =
            messages.value.push({
                id: uid(),
                role: "assistant",
                content: "",
                createdAt: Date.now(),
            }) - 1;

        currentAIIndex.value = aiIndex;

        await sendAIFeedback(payload, {
            onDelta: (text: string) => {
                pending += text;
                scheduleFlush(aiIndex);
            },
            onDone: () => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = 0;
                flushTo(aiIndex);

                status.value = "idle";

            },
            onError: (msg: string) => {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = 0;
                flushTo(aiIndex);

                status.value = "error";
                errorMsg.value = msg || "AI 出错";
                if (messages.value[aiIndex]) {
                    messages.value[aiIndex].content += "\n\n⚠️ AI 出错，请稍后重试。";
                }
            },
        });

        console.log("messages after feedback:", messages.value);
    }

    function startWaitingAction() {
        status.value = "waiting_action";
    }

    function finishWaitingAction() {
        if (status.value === "waiting_action") {
            status.value = "idle";
        }
    }

    async function regenerateFrom(index: number) {
        if (status.value === "streaming") return;

        // 1️⃣ 删除 index 之后的所有消息
        messages.value = messages.value.slice(0, index);

        // 2️⃣ 找到最近的 user 消息
        const lastUser = [...messages.value]
            .reverse()
            .find((m) => m.role === "user");

        if (!lastUser) return;

        input.value = lastUser.content;

        // 3️⃣ 重新发送
        await send();
    }

    function toggleFeedback(index: number, type: "up" | "down") {
        const msg = messages.value[index];
        if (!msg || msg.role !== "assistant") return;

        msg.feedback = msg.feedback === type ? null : type;
    }

    function addAssistantMessage(text: string) {
        const index = currentAIIndex.value;

        // 理论上一定存在，但做个兜底
        if (index === null || !messages.value[index]) {
            const newIndex =
                messages.value.push({
                    id: uid(),
                    role: "assistant",
                    content: text,
                    createdAt: Date.now(),
                    feedback: null,
                }) - 1;

            currentAIIndex.value = newIndex;
            return;
        }

        const msg = messages.value[index];

        // 如果已有内容，则换行追加
        if (msg.content) {
            msg.content += "\n\n" + text;
        } else {
            msg.content = text;
        }
    }

    return {
        messages,
        input,
        status,
        errorMsg,
        isStreaming,
        send,
        stop,
        clear,
        continueWithFeedback,
        startWaitingAction,
        finishWaitingAction,
        regenerateFrom,
        toggleFeedback,
        addAssistantMessage,
    };
}

