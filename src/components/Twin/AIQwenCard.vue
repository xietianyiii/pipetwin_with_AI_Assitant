<template>
  <div
    class="draggable-card"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="startDrag"
    ref="cardRef"
  >
    <div class="card-header">
      <span>AI助手</span>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>

    <div class="card-body">
      <div class="chat-messages">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['chat-msg', msg.role]"
        >
          <span class="role">{{ msg.role === "user" ? "我" : "AI" }}：</span>
          <span class="content">{{ msg.content }}</span>
        </div>
      </div>

      <textarea
        v-model="input"
        class="chat-input"
        rows="2"
        placeholder="向 AI 提问..."
      />

      <button class="send-btn" @click="send" :disabled="loading">
        {{ loading ? "思考中…" : "发送" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";

const emit = defineEmits(["close"]);

const position = ref({ x: 1500, y: 300 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const cardRef = ref<HTMLElement | null>(null);
const velocity = ref({ x: 0, y: 0 }); // 用于跟踪拖动速度
const lastPosition = ref({ x: 0, y: 0 }); // 用于计算速度
const lastTime = ref(0); // 用于计算时间差

// 允许自定义边界
const BOUND = {
  minX: 14,
  maxX: 1500,
  minY: 70,
  maxY: 770,
};

const startDrag = (e: MouseEvent) => {
  if (!cardRef.value) return;
  isDragging.value = true;

  offset.value.x = e.clientX - position.value.x;
  offset.value.y = e.clientY - position.value.y;

  // 重置速度
  velocity.value.x = 0;
  velocity.value.y = 0;
  lastPosition.value.x = position.value.x;
  lastPosition.value.y = position.value.y;
  lastTime.value = Date.now();

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;

  let newX = e.clientX - offset.value.x;
  let newY = e.clientY - offset.value.y;

  // 使用手动边界配置
  newX = Math.max(BOUND.minX, Math.min(newX, BOUND.maxX));
  newY = Math.max(BOUND.minY, Math.min(newY, BOUND.maxY));

  // 计算时间差
  const now = Date.now();
  const deltaTime = now - lastTime.value;

  if (deltaTime > 0) {
    // 计算速度 (像素/毫秒)
    velocity.value.x = (newX - lastPosition.value.x) / deltaTime;
    velocity.value.y = (newY - lastPosition.value.y) / deltaTime;
  }

  // 更新位置和时间
  position.value = { x: newX, y: newY };
  lastPosition.value.x = newX;
  lastPosition.value.y = newY;
  lastTime.value = now;
};

// 惯性动画函数
const inertiaAnimation = () => {
  // 初始速度
  let vx = velocity.value.x * 1000; // 转换为像素/秒
  let vy = velocity.value.y * 1000;

  // 物理参数
  const friction = 0.92; // 摩擦系数 (更真实的摩擦力)
  const minVelocity = 0.5; // 最小速度阈值
  const deceleration = 0.98; // 减速度

  // 上一帧时间
  let lastTimestamp = 0;

  // 动画函数
  const animate = (timestamp: number) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.1); // 转换为秒，最大0.1秒
    lastTimestamp = timestamp;

    // 应用减速度和摩擦力
    vx *= deceleration * friction;
    vy *= deceleration * friction;

    // 计算新位置
    let newX = position.value.x + vx * deltaTime;
    let newY = position.value.y + vy * deltaTime;

    // 使用手动边界配置
    newX = Math.max(BOUND.minX, Math.min(newX, BOUND.maxX));
    newY = Math.max(BOUND.minY, Math.min(newY, BOUND.maxY));

    // 如果碰到边界，反转速度方向以产生反弹效果
    if (newX <= BOUND.minX || newX >= BOUND.maxX) {
      vx = -vx * 0.3; // 反弹并减少速度
    }
    if (newY <= BOUND.minY || newY >= BOUND.maxY) {
      vy = -vy * 0.3; // 反弹并减少速度
    }

    // 更新位置
    position.value.x = newX;
    position.value.y = newY;

    // 如果速度足够大，继续动画
    if (Math.abs(vx) > minVelocity || Math.abs(vy) > minVelocity) {
      requestAnimationFrame(animate);
    }
  };

  // 开始动画
  if (Math.abs(vx) > minVelocity || Math.abs(vy) > minVelocity) {
    requestAnimationFrame(animate);
  }
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);

  // 启动惯性动画
  inertiaAnimation();
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const messages = ref<ChatMessage[]>([]);
const input = ref("");
const loading = ref(false);

const send = async () => {
  if (!input.value.trim() || loading.value) return;

  const userText = input.value;
  input.value = "";

  // 1. 插入用户消息
  messages.value.push({
    role: "user",
    content: userText,
  });

  // 2. 插入 AI 占位消息
  const aiMsg = {
    role: "assistant" as const,
    content: "",
  };
  messages.value.push(aiMsg);

  loading.value = true;

  try {
    const res = await fetch("/api/ai/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // ⚠️ 只发送已有对话（不含当前空 AI）
        messages: messages.value.filter(
          (m) => !(m.role === "assistant" && m.content === "")
        ),
      }),
    });

    const reader = res.body?.getReader();
    if (!reader) throw new Error("No stream reader");

    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      chunk.split("\n\n").forEach((line) => {
        if (!line.startsWith("data: ")) return;

        const data = line.replace("data: ", "");

        if (data === "[DONE]") return;
        if (data.startsWith("[ERROR]")) {
          aiMsg.content += "\n⚠️ AI 出错";
          return;
        }

        // 3. 实时追加内容  失败
        aiMsg.content += data;
      });
    }
  } catch (err) {
    aiMsg.content = "AI 服务暂时不可用";
  } finally {
    loading.value = false;
  }
};

// 组件挂载后初始化图表
onMounted(() => {});
</script>

<style scoped>
.draggable-card {
  position: absolute;
  width: 280px;
  background: rgba(23, 50, 88, 0.6);
  border: 1px solid rgba(214, 245, 255, 0.2);
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 191, 255, 0.8);
  padding: 16px 20px;
  font-size: 14px;
  z-index: 999;
  backdrop-filter: blur(6px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  pointer-events: auto;
  user-select: none;
  cursor: grab;
  animation: popupAppear 0.3s ease-out;
}

.draggable-card:hover {
  box-shadow: 0 5px 20px rgba(0, 191, 255, 1);
}

.draggable-card:active {
  cursor: grabbing;
}

@keyframes popupAppear {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  font-family: "SHJGSK";
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(248, 248, 248, 0.5);
}

.close-btn {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(5, 50, 66, 0.5),
    rgba(0, 212, 255, 0.5)
  );
  border: 1px solid rgba(248, 248, 248, 0.8);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
}

.close-btn:hover {
  background: radial-gradient(
    circle at 0% 60%,
    #1a918b 0%,
    #0099c8 60%,
    #00e5ff 100%
  );
  box-shadow: 0 0 10px rgba(0, 255, 255, 1);
  transform: scale(1.1);
}

.card-body {
  font-family: "YRDZST";
  font-weight: 600;
  color: #ffffff;
  animation: contentFadeIn 0.3s ease-out 0.2s both;
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.row {
  margin-bottom: 15px;
}

.chat-messages {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 8px;
}

.chat-msg {
  margin-bottom: 6px;
  line-height: 1.4;
  word-break: break-word;
}

.chat-msg.user {
  color: #aeefff;
}

.chat-msg.assistant {
  color: #ffffff;
}

.chat-input {
  width: 100%;
  resize: none;
  border-radius: 6px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  outline: none;
}

.send-btn {
  margin-top: 6px;
  width: 100%;
  border-radius: 6px;
  border: none;
  padding: 6px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: #fff;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
