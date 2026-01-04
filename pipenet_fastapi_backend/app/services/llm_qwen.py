import logging
from openai import OpenAI
from app.core.settings import settings
from app.tools.schemas import PIPE_TOOLS

logger = logging.getLogger("app.llm.qwen")

client = OpenAI(
    api_key=settings.DASHSCOPE_API_KEY,
    base_url=settings.QWEN_BASE_URL,
)

def qwen_stream(messages: list[dict]):
    """
    使用 Qwen Function Calling 的流式调用
    """
    logger.info("调用 Qwen 模型（Function Calling），消息数=%d", len(messages))

    return client.chat.completions.create(
        model=settings.QWEN_MODEL,
        messages=messages,
        tools=PIPE_TOOLS,          # ⭐ 启用 Function Calling
        tool_choice="auto",        # ⭐ 模型自行决定是否调用
        stream=True,
    )
