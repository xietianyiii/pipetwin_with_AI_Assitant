<template>
  <div class="chat-messages" ref="containerRef" @scroll="onScroll">
    <MessageBubble
      v-for="(m, index) in messages"
      :key="m.id"
      :id="m.id"
      :index="index"
      :role="m.role"
      :content="m.content"
      :feedback="m.feedback"
      :typing="m.role === 'assistant' && isStreaming && m.content.length === 0"
      @feedback="$emit('feedback', $event)"
      @regenerate="emit('regenerate', index)"
    />

    <div v-if="isWaitingAction" class="system-tip">
      <svg
        t="1765353626494"
        class="system-tip-icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="91657"
        width="36"
        height="36"
      >
        <path
          d="M512 89.6a38.4 38.4 0 0 1 0 76.8A345.6 345.6 0 1 0 857.6 512a38.4 38.4 0 0 1 76.8 0 420.928 420.928 0 0 1-112.768 287.296l67.904 67.968a38.4 38.4 0 1 1-54.272 54.272l-70.848-70.784A422.4 422.4 0 1 1 512 89.6z"
          fill="#0090d3"
          p-id="91658"
        ></path>
        <path
          d="M799.488 82.688l30.016 54.784c13.12 24.064 32.96 43.904 57.088 57.088l54.784 29.952a35.904 35.904 0 0 1 0 62.976l-54.784 30.016a143.616 143.616 0 0 0-57.088 57.024l-30.016 54.848a35.904 35.904 0 0 1-62.976 0l-29.952-54.848a143.616 143.616 0 0 0-57.088-57.024l-54.784-30.016a35.904 35.904 0 0 1 0-62.976l54.784-29.952c24.064-13.184 43.904-33.024 57.088-57.088l29.952-54.784a35.904 35.904 0 0 1 62.976 0zM559.872 393.408l14.848 27.136c6.592 12.16 16.64 22.144 28.736 28.8l27.136 14.784a18.112 18.112 0 0 1 0 31.744l-27.136 14.848a72.32 72.32 0 0 0-28.8 28.8l-14.784 27.072a18.112 18.112 0 0 1-31.744 0L513.28 539.52a72.32 72.32 0 0 0-28.736-28.8l-27.136-14.72a18.112 18.112 0 0 1 0-31.808l27.136-14.848c12.16-6.592 22.144-16.64 28.8-28.8l14.784-27.072a18.112 18.112 0 0 1 31.744 0z"
          fill="#0090d3"
          p-id="91659"
        ></path>
      </svg>
      <span class="system-tip-text"> 正在对当前场景进行智能分析… </span>
    </div>

    <button
      v-if="!stickToBottom"
      class="to-bottom"
      @click="scrollToBottom(true)"
      title="回到底部"
    >
      ↓
    </button>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import type { ChatMessage } from "@/types/chat";
import MessageBubble from "./MessageBubble.vue";
import { useAutoScroll } from "@/composables/useAutoScroll";

const props = defineProps<{
  messages: ChatMessage[];
  isStreaming: boolean;
  isWaitingAction?: boolean;
}>();

const emit = defineEmits<{
  (e: "feedback", index: number, type: "up" | "down"): void;
  (e: "regenerate", index: number): void;
}>();

const { containerRef, stickToBottom, onScroll, scrollToBottom } =
  useAutoScroll();

// 消息变化时尝试滚到底
watch(
  () => props.messages.map((m) => m.content).join("|"),
  () => scrollToBottom(false)
);

watch(
  () => props.isWaitingAction,
  (v) => {
    console.log("ChatList isWaitingAction:", v);
  },
  { immediate: true }
);
</script>

<script lang="ts">
export default {
  name: "ChatList",
};
</script>


<style scoped>
.chat-messages {
  position: relative;
  max-height: 390px;
  overflow-y: auto;
  padding-right: 6px;
  margin-bottom: 10px;
  scrollbar-width: none;
  scrollbar-color: rgba(0, 191, 255, 0.15) transparent;
}
.to-bottom {
  position: sticky;
  bottom: 6px;
  left: 100%;
  transform: translateX(-100%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  border-radius: 10px;
  padding: 4px 8px;
  cursor: pointer;
}

.system-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
}

.system-tip-icon {
  width: 35px;
  height: 32px;
  margin-right: 8px;
  animation: searchAnimation 1.5s linear infinite;
}

@keyframes searchAnimation {
  0% {
    transform: translate(0, -3px);
  }
  25% {
    transform: translate(3px, 0px);
  }
  50% {
    transform: translate(0, 3px);
  }
  75% {
    transform: translate(-3px, 0px);
  }
  100% {
    transform: translate(0, -3px);
  }
}

.system-tip-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  animation: textGlow 2s ease-in-out infinite alternate;
}

@keyframes textGlow {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
