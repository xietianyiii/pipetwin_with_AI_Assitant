#### AI助手

##### 前端

```
src/
├─ api/
│  └─ ai.ts                # ⭐ AI SSE 通信与解析（SSE / action / delta）
│
├─ ai-actions/
│  └─ index.ts             # ⭐ AI Action 分发器（广播指令）
│
├─ composables/
│  └─ useChat.ts           # 聊天状态与逻辑（send / stop / stream）
│  └─ useSseParser.ts      # SSE 解析（buffer + event）
│  └─ useAutoScroll.ts     # 自动滚动策略
│
├─ components/
│  └─ ai/
│     └─ AiCard.vue        # AI 助手 UI（聊天卡片）
│     └─ ChatView.vue      # 消息列表（渲染/滚动）
│     └─ ChatInput.vue     # 输入框、按钮、快捷键
│     └─ MessageBubble.vue # 单条消息气泡
│
├─ types/
│  └─ chat.ts              # ⭐ 聊天 / AI 相关类型定义

```

##### 后端

```
app/
├─ main.py                      # ⭐ FastAPI 入口（中间件 / 日志初始化）
│
├─ core/
│  ├─ settings.py               # 配置（环境变量）
│  ├─ logging.py                # ⭐ 日志系统
│  └─ request_context.py        # ⭐ request_id 上下文
│
├─ routers/
│  └─ ai.py                     # ⭐ AI SSE + Action 核心接口
│
├─ services/
│  ├─ llm_qwen.py               # Qwen 模型调用封装
│  └─ sse.py                    # SSE 工具函数
│
├─ schemas/                     # Pydantic 模型（可扩展）
│
└─ logs/
   └─ app.log                   # 运行时日志文件

```

## 前端

### 📂 `api/`

**角色：和后端说话**

- 只负责 HTTP / SSE
- 解析 `event: delta / action / done`
- 不关心 UI、不关心三维

> 👉 **这里是“协议层”**

------

### 📂 `ai-actions/`

**角色：AI 指令出口**

- 接收 AI 发来的 action
- 广播成全局事件（`window.dispatchEvent`）
- 不知道 Twin.vue
- 不知道三维

> 👉 **这里是“AI 意图层”**

------

### 📂 `composables/`

**角色：可复用业务逻辑**

- ```
  useChat.ts
  ```

  - 消息列表
  - 流式更新
  - stop / abort

- 不直接渲染 UI

> 👉 **这里是“状态与逻辑层”**

------

### 📂 `components/ai/`

**角色：纯 UI**

- AiCard.vue
- 只关心展示
- 不关心三维
- 不关心 AI action

> 👉 **这里是“表现层”**

------

### 📂 `views/Twin.vue`

⭐ **最重要的文件之一**

**角色：三维世界宿主**

- 初始化三维 App
- 持有所有三维 API
- 唯一能执行：
  - `handleAIAnalysis`
  - `handlePipeliftClicked`
- 监听 AI action 事件

> 👉 **这里是“物理世界 / 数字孪生层”**

## 后端

### 📄 `main.py`

**角色：系统入口**

- 初始化日志
- 注册 middleware（request_id）
- 挂载 router

> 👉 **这里是“启动与全局配置层”**

------

### 📂 `core/`

**角色：基础设施**

#### `settings.py`

- 读取 `.env`
- 管理模型名、Key、Base URL

#### `logging.py`

- 定义日志格式
- Handler / Filter
- 文件轮转

#### `request_context.py`

- 生成 request_id
- 用 `contextvars` 在全链路传递

> 👉 **这里是“系统底座”**

------

### 📂 `routers/ai.py`

⭐ **后端最核心文件**

- 接收聊天请求
- 拼接 prompt
- 调用模型
- 解析 `<ACTION>`
- 发 SSE（delta / action / done）

> 👉 **这里是“AI 大脑出口”**

------

### 📂 `services/`

**角色：业务能力封装**

#### `llm_qwen.py`

- 只负责和模型说话
- 不知道 HTTP / SSE

#### `sse.py`

- 只负责 SSE 格式
- 不知道 AI / 业务

> 👉 **这里是“能力模块层”**