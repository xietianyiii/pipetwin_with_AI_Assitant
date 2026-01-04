# app/core/request_context.py

import contextvars
import uuid

# 当前请求的 request_id（上下文变量）
request_id_ctx_var = contextvars.ContextVar(
    "request_id", default=None
)

def generate_request_id() -> str:
    return uuid.uuid4().hex[:8]

def set_request_id(request_id: str):
    request_id_ctx_var.set(request_id)

def get_request_id() -> str:
    rid = request_id_ctx_var.get()
    return rid if rid else "-"
