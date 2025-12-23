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

    <div class="card-body" @mousedown.stop>
      <div class="introduce-container">
        <img
          src="@/assets/pngs/AICard/51icon.png"
          alt="AI 助手"
          class="avatar"
        />
        <span class="introduce-text">你好，有什么可以帮你</span>
      </div>

      <ChatView
        :messages="messages"
        :is-streaming="status === 'streaming'"
        :is-waiting-action="status === 'waiting_action'"
        @regenerate="onRegenerate"
        @feedback="onFeedback"
      />

      <ChatInput
        v-model="input"
        :is-streaming="status === 'streaming'"
        :is-waiting-action="status === 'waiting_action'"
        @send="send"
        @stop="stop"
        @clear="clear"
      />

      <div v-if="status === 'error'" class="error">⚠️ {{ errorMsg }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from "vue";
import ChatView from "./ChatList.vue";
import ChatInput from "./ChatInput.vue";
import { useChat } from "@/composables/useChat";

const props = defineProps<{
  chat: ReturnType<typeof useChat>;
}>();

const { messages, input, status, errorMsg, isStreaming, send, stop, clear } =
  props.chat;

function onRegenerate(index: number) {
  props.chat.regenerateFrom(index);
}

function onFeedback(payload: { index: number; type: "up" | "down" }) {
  console.log("用户点赞/点踩：", payload);

  const { index, type } = payload;
  props.chat.toggleFeedback(index, type);
}

const emit = defineEmits(["close"]);

const position = ref({ x: 1400, y: 200 });
const isDragging = ref(false);
const offset = ref({ x: 0, y: 0 });
const cardRef = ref<HTMLElement | null>(null);
const velocity = ref({ x: 0, y: 0 }); // 用于跟踪拖动速度
const lastPosition = ref({ x: 0, y: 0 }); // 用于计算速度
const lastTime = ref(0); // 用于计算时间差

// 允许自定义边界
const BOUND = {
  minX: 14,
  maxX: 1450,
  minY: 90,
  maxY: 600,
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

onMounted(() => {});
</script>

<style scoped>
.draggable-card {
  position: absolute;
  width: 400px;
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
  max-height: 700px;
  scrollbar-width: none;
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

.error {
  margin-top: 8px;
  font-size: 12px;
  opacity: 0.9;
}

.introduce-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
.avatar {
  width: 60px;
  margin-right: 10px;
}

.introduce-text {
  color: #ffffff;
  font-size: 18px;
}
</style>
