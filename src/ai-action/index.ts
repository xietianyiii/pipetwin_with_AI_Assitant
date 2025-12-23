export type AIAction =
  | { type: "action"; name: "AI_ANALYSIS" }
  | { type: "action"; name: "AI_REPAIR" }
  | {
      type: "action";
      name: "PIPE_LIFT";
      args: { type: string; height: number };
    };

export function dispatchAIAction(action: AIAction) {
  window.dispatchEvent(
    new CustomEvent<AIAction>("ai-action", {
      detail: action,
    })
  );
}
