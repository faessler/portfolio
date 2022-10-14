interface ChatHistoryChunkBase {
  user: "bot" | "human";
}

export interface ChatHistoryChunkInput extends ChatHistoryChunkBase {
  texts: string[];
}
export interface ChatHistoryChunk extends ChatHistoryChunkBase {
  texts: { id: string; value: string }[];
}
