export function dispatchAIAction(action: any) {
  if (!action || action.type !== "action") return;

  window.dispatchEvent(
    new CustomEvent("ai-action", {
      detail: action,
    })
  );
}
