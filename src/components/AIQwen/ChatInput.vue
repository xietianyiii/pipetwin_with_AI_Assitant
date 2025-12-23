<template>
  <div class="editor-container">
    <div class="input-wrap">
      <textarea
        ref="inputRef"
        :value="displayValue"
        class="chat-input"
        rows="2"
        :disabled="isStreaming || isWaitingAction"
        placeholder="向AI提问..."
        @input="onInput"
        @keydown="onKeydown"
      />
    </div>
    <div class="action-wrap">
      <div class="left-action">
        <button class="ghost" @click="$emit('clear')" :disabled="isStreaming">
          <svg
            t="1766027607824"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="23851"
            width="22"
            height="22"
          >
            <path
              d="M825.3 197.9H690.9v-89.6c0-24.7-20.1-44.8-44.8-44.8H377.3c-24.7 0-44.8 20.1-44.8 44.8v89.6H198.1c-74.1 0-134.4 60.3-134.4 134.4v492.8c0 74.1 60.3 134.4 134.4 134.4h627.2c74.1 0 134.4-60.3 134.4-134.4V332.3c0-74.2-60.3-134.4-134.4-134.4z m44.8 627.2c0 24.7-20.1 44.8-44.8 44.8h-44.8V735.5c0-24.7-20.1-44.8-44.8-44.8-24.7 0-44.8 20.1-44.8 44.8v134.4H556.5V735.5c0-24.7-20.1-44.8-44.8-44.8-24.7 0-44.8 20.1-44.8 44.8v134.4H332.5V735.5c0-24.7-20.1-44.8-44.8-44.8-24.7 0-44.8 20.1-44.8 44.8v134.4h-44.8c-24.7 0-44.8-20.1-44.8-44.8V466.7h716.8v358.4z m0-448H153.3v-44.8c0-24.7 20.1-44.8 44.8-44.8h179.2c24.7 0 44.8-20.1 44.8-44.8v-89.6h179.2v89.6c0 24.7 20.1 44.8 44.8 44.8h179.2c24.7 0 44.8 20.1 44.8 44.8v44.8z"
              fill="#cdcdcd"
              p-id="23852"
            ></path>
          </svg>
        </button>
      </div>
      <div class="right-action">
        <button
          class="microphone"
          :class="{ active: isMicrophoneActive }"
          @click="onMicrophoneClick"
        >
          <svg
            t="1766049236323"
            class="microphone-icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="47095"
            width="23"
            height="23"
          >
            <path
              d="M258.773333 507.264a256.085333 256.085333 0 0 0 506.197334 1.493333 42.666667 42.666667 0 1 1 84.352 13.013334 341.461333 341.461333 0 0 1-294.613334 286.250666L554.666667 896a42.666667 42.666667 0 0 1-85.034667 4.992L469.333333 896v-87.978667a341.461333 341.461333 0 0 1-294.954666-288.256 42.666667 42.666667 0 0 1 84.394666-12.501333zM512 85.333333a170.666667 170.666667 0 0 1 170.666667 170.666667v213.333333a170.666667 170.666667 0 1 1-341.333334 0V256a170.666667 170.666667 0 0 1 170.666667-170.666667z"
              fill="#bfbfbf"
              p-id="47096"
            ></path>
          </svg>
        </button>
        <button
          class="send"
          :disabled="isWaitingAction || (!canSend && !isStreaming)"
          @click="onSendClick"
        >
          <svg
            t="1766048279894"
            v-if="isWaitingAction"
            class="icon-loading"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="39852"
            width="28"
            height="28"
          >
            <path
              d="M234.613781 77.013467C426.570511-42.426276 673.981407-21.097751 848.875316 128.201928v-34.125641c0-17.06282 12.797115-29.859936 29.859936-29.859936s29.859936 12.797115 29.859936 29.859936V213.51603c0 17.06282-12.797115 29.859936-29.859936 29.859936h-115.174038c-17.06282 0-29.859936-12.797115-29.859936-29.859936 0-17.06282 12.797115-29.859936 29.859936-29.859936h42.657051C661.184291 42.887826 443.633331 25.825005 273.005127 128.201928S25.594231 439.598401 81.048397 627.289425s230.348076 324.193588 430.836216 319.927883c17.06282 0 29.859936 17.06282 29.859935 34.125641s-12.797115 29.859936-29.859935 29.859936c-226.082371 0-426.570511-149.299679-490.556087-366.850639S42.657051 196.45321 234.613781 77.013467z m413.773395 853.141021c12.797115-4.265705 21.328526-4.265705 29.859936 4.265705 8.53141 4.265705 17.06282 12.797115 17.06282 21.328525 4.265705 12.797115 4.265705 25.594231-8.53141 34.125641-8.53141 8.53141-21.328526 12.797115-34.125641 12.797115s-25.594231-12.797115-29.859936-25.59423c-4.265705-8.53141-4.265705-21.328526 4.265706-29.859936 4.265705-8.53141 12.797115-12.797115 21.328525-17.06282z m149.299679-72.516987h4.265705c12.797115 4.265705 21.328526 8.53141 25.59423 17.06282 8.53141 12.797115 12.797115 25.594231 8.531411 38.391346-4.265705 12.797115-17.06282 21.328526-29.859936 21.328526-17.06282 4.265705-29.859936-4.265705-34.125641-17.062821-8.53141-8.53141-12.797115-17.06282-8.53141-29.859935 4.265705-8.53141 8.53141-17.06282 17.06282-25.594231 8.53141-4.265705 17.06282-8.53141 29.859936-8.53141l-12.797115 4.265705z m98.111217-106.642628c12.797115-4.265705 21.328526-4.265705 29.859936 4.265705 12.797115 8.53141 17.06282 21.328526 17.06282 34.125641-4.265705 12.797115-8.53141 25.594231-21.328525 29.859936-12.797115 8.53141-25.594231 4.265705-38.391346-4.265705-8.53141-8.53141-12.797115-12.797115-17.062821-25.594231-4.265705-12.797115 0-21.328526 8.531411-29.859936 4.265705-4.265705 12.797115-12.797115 21.328525-8.53141z m72.516987-145.033973h4.265705c17.06282 4.265705 25.594231 12.797115 29.859936 21.328525 8.53141 12.797115 4.265705 25.594231-4.265705 38.391346s-21.328526 17.06282-34.125641 12.797115c-12.797115-4.265705-25.594231-8.53141-29.859936-21.328525-8.53141-12.797115-4.265705-29.859936 4.265705-38.391346s21.328526-17.06282 34.125641-12.797115h-4.265705zM490.556087 388.409939c12.797115 0 21.328526 8.53141 21.328526 21.328526v110.908333l81.048397 46.922756c12.797115 8.53141 12.797115 21.328526 8.53141 29.859935-8.53141 8.53141-17.06282 12.797115-29.859936 8.531411l-89.579807-55.454167c-8.53141-4.265705-12.797115-12.797115-12.797115-17.06282V409.738465c0-12.797115 8.53141-21.328526 21.328525-21.328526z m494.821792 68.251282c21.328526 0 38.391346 17.06282 38.391346 38.391346s-17.06282 38.391346-38.391346 38.391346-38.391346-17.06282-38.391346-38.391346 17.06282-38.391346 38.391346-38.391346z m-42.657051-145.033974c12.797115-8.53141 29.859936-4.265705 38.391346 4.265705 12.797115 8.53141 17.06282 21.328526 12.797116 34.125641-4.265705 12.797115-12.797115 25.594231-25.594231 29.859936-8.53141 4.265705-25.594231 4.265705-38.391346-4.265705-12.797115-8.53141-17.06282-21.328526-12.797115-34.125641 0-17.06282 12.797115-25.594231 25.59423-29.859936z"
              fill="#6190E7"
              p-id="39853"
            ></path>
            <path
              d="M511.884613 823.51186c-174.893909 0-311.396473-136.502563-311.396473-311.396473S336.990703 200.718915 511.884613 200.718915s311.396473 136.502563 311.396472 311.396472-136.502563 311.396473-311.396472 311.396473z m0-580.135894c-149.299679 0-268.739422 119.439743-268.739422 268.739421s119.439743 268.739422 268.739422 268.739422 268.739422-119.439743 268.739421-268.739422-119.439743-268.739422-268.739421-268.739421z"
              fill="#6190E7"
              p-id="39854"
            ></path>
          </svg>

          <svg
            t="1766043943887"
            v-else-if="isStreaming"
            class="icon-stop"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="36989"
            width="32"
            height="32"
          >
            <path
              d="M510.91 885.15c-206.08 0-373.15-167.06-373.15-373.15s167.06-373.15 373.15-373.15S884.05 305.92 884.05 512 716.99 885.15 510.91 885.15z"
              fill="#A4D4FF"
              p-id="36990"
            ></path>
            <path
              d="M557.88 669.84c61.94 0 111.94-50 111.94-111.94v-91.8c0-61.94-50-111.94-111.94-111.94h-91.79c-61.94 0-111.94 50-111.94 111.94v91.79c0 61.94 50 111.94 111.94 111.94h91.79z"
              fill="#2B8CF7"
              p-id="36991"
            ></path>
          </svg>

          <svg
            v-else
            class="icon-send"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="26070"
            width="25"
            height="25"
          >
            <path
              d="M865.28 202.5472c-17.1008-15.2576-41.0624-19.6608-62.5664-11.5712L177.7664 427.1104c-23.2448 8.8064-38.5024 29.696-39.6288 54.5792-1.1264 24.8832 11.9808 47.104 34.4064 58.0608l97.5872 47.7184c1.9456 0.9216 3.6864 2.2528 5.2224 3.6864 10.1376 26.112 50.176 128.4096 67.9936 165.376 9.0112 18.8416 25.6 32.0512 40.96 37.7856-1.024-0.1024-2.1504-0.3072-3.3792-0.512 2.9696 1.1264 6.0416 2.048 9.216 2.6624 20.2752 4.096 41.0624-2.1504 55.6032-16.7936l36.352-36.352c6.4512-6.4512 16.5888-7.8848 24.576-3.3792l156.5696 88.8832c9.4208 5.3248 19.8656 8.0896 30.3104 8.0896 8.192 0 16.4864-1.6384 24.2688-5.0176 17.8176-7.68 30.72-22.8352 35.4304-41.6768l130.7648-527.1552c5.632-22.1184-1.6384-45.3632-18.7392-60.5184zM314.2656 578.56l335.0528-191.6928L460.1856 580.608c-3.072 3.1744-5.3248 6.7584-6.8608 10.9568-0.1024 0.2048-0.1024 0.3072-0.2048 0.512-0.4096 1.2288-37.7856 111.5136-59.904 161.3824-4.5056-2.9696-9.9328-7.7824-13.1072-14.4384-16.384-34.4064-54.5792-131.7888-65.8432-160.4608z"
              p-id="26071"
              fill="#ffff"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, nextTick, onMounted ,onBeforeUnmount} from "vue";
import { useVoiceInput } from "@/composables/useVoiceInput";

const model = defineModel<string>({ required: true });

const inputRef = ref<HTMLTextAreaElement | null>(null);

// 中间识别草稿
const voiceDraft = ref("");

// textarea 展示内容：最终文本 + 中间草稿
const displayValue = computed(() => {
  return voiceDraft.value ? `${model.value}${voiceDraft.value}` : model.value;
});

// 用户手动输入时：清空草稿，写入 model
function onInput(e: Event) {
  const v = (e.target as HTMLTextAreaElement).value;
  voiceDraft.value = "";
  model.value = v;
}

function focusInput() {
  nextTick(() => {
    if (!inputRef.value) return;

    inputRef.value.focus();

    // 光标移动到末尾（非常关键）
    const len = inputRef.value.value.length;
    inputRef.value.setSelectionRange(len, len);
  });
}

const props = defineProps<{
  isStreaming: boolean;
  isWaitingAction?: boolean;
}>();

const emit = defineEmits<{
  (e: "send"): void;
  (e: "stop"): void;
  (e: "clear"): void;
}>();

/** 是否可以发送 */
const canSend = computed(
  () =>
    model.value.trim().length > 0 &&
    !props.isStreaming &&
    !props.isWaitingAction
);

const isWaitingAction = computed(() => props.isWaitingAction === true);

/** ✅ 语音输入：识别完成写入输入框 */
const {
  isRecording: isMicrophoneActive,
  toggle: toggleMicrophone,
  stop: stopMicrophone,
} = useVoiceInput((text, isFinal) => {
  if (isFinal) {
    // 最终结果：写入 model
    model.value = model.value ? `${model.value}${text}` : text;

    voiceDraft.value = "";
  } else {
    // 中间结果：写入草稿
    voiceDraft.value = text;
  }
  // ⭐⭐ 每次识别都自动聚焦输入框
  focusInput();
});

function onMicrophoneClick() {
  toggleMicrophone();
  focusInput();
}

/** 如果进入 streaming / waiting_action，自动停止麦克风，避免冲突 */
watch(
  () => [props.isStreaming, props.isWaitingAction] as const,
  ([streaming, waiting]) => {
    if (streaming || waiting) {
      stopMicrophone();
      voiceDraft.value = "";
    }
  }
);

function onSendClick() {
  stopMicrophone();
  if (isWaitingAction.value) return;

  if (props.isStreaming) {
    emit("stop");
  } else if (canSend.value) {
    emit("send");
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (canSend.value) emit("send");
  }
}

function onGlobalKeydown(e: KeyboardEvent) {
  const isMac = navigator.platform.toUpperCase().includes("MAC");

  const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

  // Ctrl/Cmd + Shift + Space
  if (ctrlOrCmd && e.shiftKey && e.code === "Space") {
    e.preventDefault();

    toggleMicrophone();
    focusInput(); // ⭐ 顺手聚焦输入框
  }
}

onMounted(() => {
  window.addEventListener("keydown", onGlobalKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onGlobalKeydown);
});


</script>

<script lang="ts">
export default {
  name: "ChatInput",
};
</script>

<style scoped>
.editor-container {
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: transparent;
}

.action-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
}

.left-action,
.right-action {
  display: flex;
  background: transparent;
  padding: 0 8px;
  gap: 6px; /* 增大按钮间距 */
}
.chat-input {
  width: 100%;
  resize: none;
  border-radius: 8px;
  padding: 8px;
  border: none;
  background: transparent;
  color: #fff;
  outline: none;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 13px;
}

button {
  border-radius: 8px;
  border: none;
  padding: 8px 10px;
  cursor: pointer;
  color: #fff;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ghost {
  flex: 1;
  background-color: transparent;
}

.ghost:hover {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  transition: background 0.3s ease;
}

.microphone {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.3s ease;
}

.microphone:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.microphone:hover .microphone-icon path {
  fill: #ffffff;
}

.microphone.active {
  animation: pulse 1.5s ease-in-out infinite;
  transform: scale(1.1);
}

.microphone.active .microphone-icon path {
  fill: #ffffff;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 3px rgba(0, 198, 255, 0.7);
    transform: scale(1.1);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 198, 255, 0);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 0 0 3px rgba(0, 198, 255, 0);
    transform: scale(1.1);
  }
}

.send {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background-color: transparent;
}

.send:hover {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  transition: background 0.3s ease;
}

.icon-loading,
.icon-stop,
.icon-send {
  vertical-align: middle;
}

.icon-loading {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
