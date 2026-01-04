# app/routers/ai.py

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Literal
import asyncio
import anyio
import json
import logging

from app.services.llm_qwen import qwen_stream
from app.services.sse import sse_event, sse_comment

logger = logging.getLogger("app.aiQwen")

router = APIRouter(prefix="/api/ai", tags=["AI"])


# ---------- Schemas ----------
class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


# ---------- System Prompt ----------
SYSTEM_PROMPT = """
你是 51world 旗下 51WIM 的「城市脉络 AI 引擎」。

你可以通过调用系统提供的函数来触发前端操作。
当你判断需要执行某个操作时，请直接调用对应的函数。
不要在文本中描述你调用了函数。
"""


# ---------- Router ----------
@router.post("/chat/stream")
async def chat_stream(req: ChatRequest, request: Request):
    async def event_generator():
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend([m.model_dump() for m in req.messages])

        heartbeat_interval = 15.0
        last_hb = asyncio.get_event_loop().time()

        sent_actions = set()

        try:
            stream = qwen_stream(messages)

            for chunk in stream:
                if await request.is_disconnected():
                    return

                choice = chunk.choices[0]
                delta = choice.delta

                # ===== 1️⃣ 普通文本 =====
                if delta.content:
                    yield sse_event("delta", {"text": delta.content})

                # ===== 2️⃣ Function Calling =====
                if delta.tool_calls:
                    for tool_call in delta.tool_calls:
                        if tool_call.type != "function":
                            continue

                        fn = tool_call.function

                        if fn.name in sent_actions:
                            continue
                        sent_actions.add(fn.name)

                        logger.info("触发 Function Calling: %s", fn.name)

                        try:
                            args = json.loads(fn.arguments or "{}")
                        except Exception:
                            args = {}

                        yield sse_event(
                            "action",
                            {
                                "type": "action",
                                "source": "ai",
                                "name": fn.name,
                                "args": args,
                            }
                        )

                # ===== 心跳 =====
                now = asyncio.get_event_loop().time()
                if now - last_hb >= heartbeat_interval:
                    last_hb = now
                    yield sse_comment("ping")

                await asyncio.sleep(0)

            yield sse_event("done", {})

        except (anyio.get_cancelled_exc_class(), asyncio.CancelledError):
            return
        except Exception as e:
            logger.exception("AI stream 异常")
            yield sse_event("error", {"message": str(e)})

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )


@router.post("/chat/feedback")
async def chat_feedback(payload: dict, request: Request):
    problems = payload.get("problems", [])

    async def event_generator():
        messages = [
            {
                "role": "system",
                "content": SYSTEM_PROMPT + f"""

前端已完成管网智能分析，得到如下问题数据（JSON）：
{json.dumps(problems, ensure_ascii=False)}

请你：
1. 用中文总结这些问题
2. 分析潜在风险
3. 询问用户是否需要进行智能修复
"""
            }
        ]

        heartbeat_interval = 15.0
        last_hb = asyncio.get_event_loop().time()

        try:
            stream = qwen_stream(messages)

            sent_actions = set()  # ⭐ 防止重复 action（下面解释）

            for chunk in stream:
                if await request.is_disconnected():
                    return

                delta = chunk.choices[0].delta if chunk.choices else None
                if not delta:
                    continue

                # ===== 1️⃣ 普通文本 =====
                if delta.content:
                    yield sse_event("delta", {"text": delta.content})

                # ===== 2️⃣ Function Calling =====
                if delta.tool_calls:
                    for tool_call in delta.tool_calls:
                        if tool_call.type != "function":
                            continue

                        fn = tool_call.function

                        # ⭐⭐⭐ 防止重复 Action
                        if fn.name in sent_actions:
                            continue
                        sent_actions.add(fn.name)

                        try:
                            args = json.loads(fn.arguments or "{}")
                        except Exception:
                            args = {}

                        logger.info("feedback 触发 Function Calling: %s", fn.name)

                        yield sse_event(
                            "action",
                            {
                                "type": "action",
                                "source": "ai",   # ⭐ 必须
                                "name": fn.name,
                                "args": args,
                            }
                        )

                # ===== 心跳 =====
                now = asyncio.get_event_loop().time()
                if now - last_hb >= heartbeat_interval:
                    last_hb = now
                    yield sse_comment("ping")

                await asyncio.sleep(0)

            yield sse_event("done", {})

        except Exception as e:
            logger.exception("feedback stream 异常")
            yield sse_event("error", {"message": str(e)})

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
