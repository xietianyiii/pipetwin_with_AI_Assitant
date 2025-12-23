<template>
  <div :class="['msg', role]">
    <div class="meta">
      <span class="tag">{{ role === "user" ? "我" : "AI" }}</span>
      <span v-if="typing" class="typing">●●●</span>
    </div>
    <div class="bubble">
      <div class="text" v-html="renderedContent"></div>
    </div>
    <MessageActions
      v-if="role === 'assistant' && !typing"
      :content="content"
      :can-regenerate="true"
      :is-speaking="speakingId === id"
      :feedback="feedback"
      @speak="onSpeak"
      @feedback="(payload) => $emit('feedback', { index, type: payload.type })"
      @regenerate="$emit('regenerate', index)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";
import MessageActions from "./MessageActions.vue";
import { useSpeech } from "@/composables/useSpeech";

const props = defineProps<{
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
  index: number;
  id: string;
  feedback?: "up" | "down" | null;
}>();

const emit = defineEmits<{
  (e: "feedback", index: number, type: "up" | "down"): void;
  (e: "regenerate", index: number): void;
}>();

const renderedContent = computed(() => {
  if (!props.content) return "";
  return marked(props.content);
});

const { speakingId, speak, stop } = useSpeech();

function onSpeak() {
  if (speakingId.value === props.id) {
    stop();
  } else {
    speak(props.id, props.content);
  }
}
</script>

<script lang="ts">
// 为 TypeScript 和某些构建工具提供显式的默认导出
export default {
  name: "MessageBubble",
};
</script>

<style scoped>
.msg {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.msg.user {
  align-items: flex-end;
}
.msg.assistant {
  align-items: flex-start;
}

.meta {
  font-size: 12px;
  opacity: 0.9;
  display: flex;
  gap: 8px;
  align-items: center;
}
.tag {
  padding: 2px 6px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
}
.typing {
  letter-spacing: 2px;
  opacity: 0.8;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

.bubble {
  max-width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid rgba(214, 245, 255, 0.18);
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.35);
  word-break: break-word;
}
.msg.user .bubble {
  background: rgba(0, 198, 255, 0.12);
}

.text :deep(p) {
  margin: 0 0 0 0;
}

.text :deep(pre) {
  background: rgba(0, 0, 0, 0.4);
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.text :deep(code) {
  background: rgba(0, 0, 0, 0.4);
  padding: 2px 4px;
  border-radius: 3px;
}

.text :deep(ul),
.text :deep(ol) {
  padding-left: 20px;
  margin: 10px 0;
}

.text :deep(li) {
  margin-bottom: 5px;
}

.text :deep(blockquote) {
  border-left: 3px solid #00bfff;
  padding-left: 10px;
  margin: 10px 0;
  color: rgba(255, 255, 255, 0.8);
}

.text :deep(h1),
.text :deep(h2),
.text :deep(h3) {
  margin: 15px 0 10px 0;
}

.text :deep(img) {
  max-width: 100%;
  border-radius: 5px;
}
</style>