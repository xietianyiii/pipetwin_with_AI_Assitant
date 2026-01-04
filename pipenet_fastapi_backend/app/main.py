from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.logging import setup_logging
from app.core.request_context import generate_request_id, set_request_id

from app.routers.pipes import router as pipes_router
from app.routers.upload import router as upload_router
from app.routers.aiQwen import router as ai_router

# ⭐ 初始化日志（一定要最先）
setup_logging()

app = FastAPI(title="PipeNet API")

@app.middleware("http")
async def request_id_middleware(request: Request, call_next):
    # 1️⃣ 生成 request_id
    request_id = generate_request_id()

    # 2️⃣ 放入上下文
    set_request_id(request_id)

    # 3️⃣ 处理请求
    response = await call_next(request)

    # 4️⃣ 返回给前端（可选，但强烈推荐）
    response.headers["X-Request-ID"] = request_id
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(pipes_router)
app.include_router(ai_router)
