import { ref, nextTick } from "vue";

export function useAutoScroll() {
  const containerRef = ref<HTMLElement | null>(null);
  const stickToBottom = ref(true);

  function onScroll() {
    const el = containerRef.value;
    if (!el) return;

    const threshold = 40; // 离底部 40px 以内认为在底部
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottom.value = distanceToBottom < threshold;
  }

  async function scrollToBottom(force = false) {
    const el = containerRef.value;
    if (!el) return;
    if (!force && !stickToBottom.value) return;

    await nextTick();
    el.scrollTop = el.scrollHeight;
  }

  return { containerRef, stickToBottom, onScroll, scrollToBottom };
}
