export interface SseEvent {
  event: string; // 默认 "message"
  data: string;  // 原始字符串（通常是 JSON）
}

export function createSseParser(onEvent: (evt: SseEvent) => void) {
  let buffer = "";

  function feed(chunkText: string) {
    buffer += chunkText;

    // 按 SSE 事件分隔符 \n\n 切事件，但必须用 while 防止一次来多个事件
    while (true) {
      const idx = buffer.indexOf("\n\n");
      if (idx === -1) break;

      const rawEvent = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);

      const evt = parseEvent(rawEvent);
      if (evt) onEvent(evt);
    }
  }

  function parseEvent(raw: string): SseEvent | null {
    // 允许心跳：以 ":" 开头的注释行
    const lines = raw.split("\n").filter(Boolean);
    if (lines.length === 0) return null;
    if (lines.every((l) => l.startsWith(":"))) return null;

    let event = "message";
    const dataLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith("event:")) {
        event = line.slice("event:".length).trim();
      } else if (line.startsWith("data:")) {
        dataLines.push(line.slice("data:".length).trimStart());
      }
      // id: / retry: 可按需扩展
    }

    return { event, data: dataLines.join("\n") };
  }

  return { feed };
}
