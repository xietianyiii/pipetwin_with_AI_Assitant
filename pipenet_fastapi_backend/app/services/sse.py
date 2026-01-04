import json
from typing import Any

def sse_event(event: str, data: Any) -> str:
    """
    标准 SSE 格式：event + data(JSON)
    """
    payload = json.dumps(data, ensure_ascii=False)
    return f"event: {event}\ndata: {payload}\n\n"

def sse_comment(text: str) -> str:
    """
    SSE 心跳（注释行）: ping 不会触发前端 message
    """
    return f": {text}\n\n"
