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

        // ===== done =====
        if (event === "done" || data === "[DONE]") {
            handlers.onDone();
            return;
        }

        // ===== action（唯一来源）=====
        if (event === "action") {
            try {
                const action = JSON.parse(data);
                dispatchAIAction(action);
            } catch (e) {
                console.error("解析 AI action 失败", data);
            }
            return;
        }

        // ===== error =====
        if (event === "error") {
            try {
                const obj = JSON.parse(data);
                handlers.onError(obj?.message ?? "AI 出错");
            } catch {
                handlers.onError(data || "AI 出错");
            }
            return;
        }

        // ===== delta（只可能是文本）=====
        if (event === "delta" || event === "message") {
            try {
                const obj = JSON.parse(data);
                if (typeof obj?.text === "string") {
                    handlers.onDelta(obj.text);
                }
            } catch {
                // 理论上不会走到这里，兜底
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

export async function sendAIFeedback(
    payload: any,
    handlers: StreamHandlers
) {
    const safePayload = JSON.parse(JSON.stringify(toRaw(payload)));

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

    const parser = createSseParser((evt) => {
        const data = evt.data ?? "";
        const event = (evt.event ?? "message").trim();

        if (event === "done" || data === "[DONE]") {
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
            try {
                const obj = JSON.parse(data);
                handlers.onError(obj?.message ?? "AI 出错");
            } catch {
                handlers.onError(data || "AI 出错");
            }
            return;
        }

        if (event === "delta" || event === "message") {
            try {
                const obj = JSON.parse(data);
                if (typeof obj?.text === "string") {
                    handlers.onDelta(obj.text);
                }
            } catch {
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
