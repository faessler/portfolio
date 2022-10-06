export interface ChatHistoryChunkInterface {
  texts: string[];
  user: "bot" | "human";
}
