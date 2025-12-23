export type Role = "user" | "assistant";

export type ChatStatus = "idle" | "streaming" | "error" | "waiting_action";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  feedback?: "up" | "down" | null;
}
