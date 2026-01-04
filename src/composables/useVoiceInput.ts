import { ref, onBeforeUnmount } from "vue";

export function useVoiceInput(onResult: (text: string, isFinal: boolean) => void, onTimeout: () => void) {
  const isRecording = ref(false);
  let recognition: SpeechRecognition | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null; // 用于存储定时器 ID

  function initRecognition() {
    if (recognition) return recognition;

    // 1️⃣ 创建识别实例
    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      throw new Error("当前浏览器不支持语音识别");
    }

    recognition = new SpeechRecognitionCtor();
    recognition.lang = "zh-CN";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // 2️⃣ 识别成功
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimText = "";
      let finalText = "";

      // 从本次变化开始累计（更准确）
      const start = (event as any).resultIndex ?? 0;

      for (let i = start; i < event.results.length; i++) {
        const result = event.results[i];
        // 添加类型检查以防止访问未定义的对象
        if (!result) continue;
        const transcript = result[0]?.transcript ?? "";

        if (result.isFinal) finalText += transcript;
        else interimText += transcript;
      }

      // ⏳ 中间结果
      if (interimText) {
        onResult(interimText, false);
      }

      // ✅ 最终结果
      if (finalText) {
        onResult(finalText, true);
        // stop(); // 只在最终结果时停止
      }

      // 每次识别到新内容，重置定时器
      resetInactivityTimer();
    };

    // 3️⃣ 识别错误
    recognition.onerror = (event) => {
      console.error("语音识别错误:", event);
      stop();
    };

    // 4️⃣ 自动结束
    recognition.onend = () => {
      isRecording.value = false;
    };

    return recognition;
  }

  // ▶️ 开始录音
  function start() {
    const recog = initRecognition();
    recog.start();
    isRecording.value = true;

    // 开始计时，检测两秒无输入后自动停止
    resetInactivityTimer();
  }

  // ⏹ 停止录音
  function stop() {
    if (recognition && isRecording.value) {
      recognition.stop();
    }
    isRecording.value = false;
  }

  // 🔁 切换状态
  function toggle() {
    isRecording.value ? stop() : start();
  }

  // 🧹 清理计时器
  function resetInactivityTimer() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    console.log('重置定时器...');
    // 3秒内没有识别到新内容就自动停止
    timeoutId = setTimeout(() => {
      console.log("3秒内没有识别到新内容，自动停止语音识别");
      stop();
      onTimeout();  // 超时后通知父组件
    }, 3000); // 3000ms = 3秒
  }

  // 🧹 组件卸载时清理
  onBeforeUnmount(() => {
    recognition?.stop();
    recognition = null;
    if (timeoutId) {
      clearTimeout(timeoutId); // 清理定时器
    }
  });

  return {
    isRecording,
    start,
    stop,
    toggle,
  };
}
