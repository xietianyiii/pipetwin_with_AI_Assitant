import { createSseParser } from "@/composables/useSseParser.ts";
import { dispatchAIAction } from "@/ai-action";
import type { ChatMessage } from "@/types/chat";
import { toRaw } from "vue";

export interface StreamHandlers {
    onDelta: (text: string) => void;
    onDone: () => void;
    onError: (message: string) => void;
}

export async function chatStream(
    messages: Pick<ChatMessage, "role" | "content">[],
    handlers: StreamHandlers,
    signal?: AbortSignal
) {
    const res = await fetch("/api/ai/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal,
    });

    if (!res.ok) {
        handlers.onError(`HTTP ${res.status}`);
        return;
    }

    const reader = res.body?.getReader();
    if (!reader) {
        handlers.onError("No stream reader");
        return;
    }

    const decoder = new TextDecoder("utf-8");

    const parser = createSseParser((evt) => {
        const data = evt.data ?? "";
        const event = (evt.event ?? "message").trim();

        // ✅ 兼容旧后端：用特殊文本标记结束/错误
        if (data === "[DONE]") {
            handlers.onDone();
            return;
        }
        if (data.startsWith("[ERROR]")) {
            handlers.onError(data.replace("[ERROR]", "").trim());
            return;
        }

        // ✅ 新后端：按 event 分流（关键！！）
        if (event === "done") {
            handlers.onDone();
            return;
        }

        if (event === "action") {
            try {
                const action = JSON.parse(evt.data);
                dispatchAIAction(action);
            } catch (e) {
                console.error("解析 AI action 失败", evt.data);
            }
            return;
        }

        if (event === "error") {
            // error 通常是 JSON：{"message":"..."}
            if (looksLikeJson(data)) {
                try {
                    const obj = JSON.parse(data);
                    handlers.onError(obj?.message ?? "AI 出错");
                } catch {
                    handlers.onError(data || "AI 出错");
                }
            } else {
                handlers.onError(data || "AI 出错");
            }
            return;
        }

        // ✅ 只有 delta / message 才当成“要追加到 UI 的文本”
        if (event === "delta" || event === "message") {

            if (tryDispatchActionFromJson(data)) {
                return; // ⛔ 不渲染
            }
            // 新后端 delta 通常是 JSON：{"text":"..."}
            if (looksLikeJson(data)) {
                try {
                    const obj = JSON.parse(data);
                    if (typeof obj?.text === "string") handlers.onDelta(obj.text);
                    else if (typeof obj?.delta === "string") handlers.onDelta(obj.delta);
                    else if (typeof obj?.content === "string") handlers.onDelta(obj.content);
                    // 如果 JSON 不是以上结构，就不要把 "{}" 这种追加出来
                } catch {
                    // JSON 解析失败时，兜底当纯文本
                    handlers.onDelta(data);
                }
            } else {
                // 旧后端 / 兼容模式：纯 token
                handlers.onDelta(data);
            }
            return;
        }

        // ✅ 其它 event（例如 ping）一律忽略，避免把 "{}" 之类渲染出来
    });


    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunkText = decoder.decode(value, { stream: true });
            parser.feed(chunkText);
        }
    } catch (e: any) {
        // abort 不算 error
        if (e?.name === "AbortError") return;
        handlers.onError(e?.message ?? "Stream error");
    }
}

function looksLikeJson(s: string) {
    const t = s.trim();
    return (t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"));
}

export async function sendAIFeedback(
    payload: any,
    handlers: StreamHandlers
) {
    const safePayload = JSON.parse(
        JSON.stringify(toRaw(payload))
    );

    const res = await fetch("/api/ai/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safePayload),
    });

    if (!res.ok) {
        handlers.onError(`HTTP ${res.status}`);
        return;
    }

    const reader = res.body?.getReader();
    if (!reader) {
        handlers.onError("No stream reader");
        return;
    }

    const decoder = new TextDecoder("utf-8");

    // 🎯 关键：重新创建一个 SSE parser（和 chatStream 一样）
    const parser = createSseParser((evt) => {
        const data = evt.data ?? "";
        const event = (evt.event ?? "message").trim();

        if (data === "[DONE]" || event === "done") {
            handlers.onDone();
            return;
        }

        if (event === "action") {
            try {
                const action = JSON.parse(data);
                dispatchAIAction(action);
            } catch (e) {
                console.error("解析 AI action 失败", data);
            }
            return;
        }

        if (event === "error") {
            if (looksLikeJson(data)) {
                try {
                    const obj = JSON.parse(data);
                    handlers.onError(obj?.message ?? "AI 出错");
                } catch {
                    handlers.onError(data || "AI 出错");
                }
            } else {
                handlers.onError(data || "AI 出错");
            }
            return;
        }

        if (event === "delta" || event === "message") {

            // ⭐ Action 兜底
            if (tryDispatchActionFromJson(data)) {
                return;
            }
            
            if (looksLikeJson(data)) {
                try {
                    const obj = JSON.parse(data);
                    if (typeof obj?.text === "string") handlers.onDelta(obj.text);
                    else if (typeof obj?.content === "string") handlers.onDelta(obj.content);
                } catch {
                    handlers.onDelta(data);
                }
            } else {
                handlers.onDelta(data);
            }
        }
    });

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunkText = decoder.decode(value, { stream: true });
            parser.feed(chunkText);
        }
    } catch (e: any) {
        if (e?.name === "AbortError") return;
        handlers.onError(e?.message ?? "Stream error");
    }
}

function tryDispatchActionFromJson(data: string): boolean {
    if (!looksLikeJson(data)) return false;

    try {
        const obj = JSON.parse(data);
        if (obj?.type === "action" && typeof obj?.name === "string") {
            dispatchAIAction(obj);
            return true; // ⭐ 已消费
        }
    } catch {
        /* ignore */
    }
    return false;
}
