import { ref, onBeforeUnmount } from "vue";

export function useSpeech() {
  const speakingId = ref<string | null>(null);
  const synth = window.speechSynthesis;
  let utterance: SpeechSynthesisUtterance | null = null;

  function speak(id: string, text: string) {
    stop();

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      speakingId.value = null;
    };

    speakingId.value = id;
    synth.speak(utterance);
  }

  function stop() {
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }
    speakingId.value = null;
  }

  onBeforeUnmount(stop);

  return {
    speakingId,
    speak,
    stop,
  };
}
