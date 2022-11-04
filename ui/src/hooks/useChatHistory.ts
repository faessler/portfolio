import { useState } from "react";
import { isEmpty, uuid, wait } from "src/helpers";

// INTERFACES
interface ChatHistoryChunkBase {
  user: "bot" | "human";
}
export interface IChatHistoryChunkInput extends ChatHistoryChunkBase {
  texts: string[];
}
export interface IChatHistoryChunk extends ChatHistoryChunkBase {
  texts: { id: string; value: string }[];
}

// HELPER
const addIdsToChatHistoryChunkTexts = (chunks: IChatHistoryChunkInput[]) =>
  chunks.map((chunk) => ({
    ...chunk,
    texts: chunk.texts.map((text) => ({ id: uuid(), value: text })),
  }));

// HOOK
const useChatHistory = (initialValue: Array<IChatHistoryChunkInput>) => {
  const [storedValue, setStoredValue] = useState<Array<IChatHistoryChunk>>(
    addIdsToChatHistoryChunkTexts(initialValue)
  );

  const setValue = async (chunks: Array<IChatHistoryChunkInput>) => {
    if (isEmpty(chunks)) {
      // reset chat
      setStoredValue(addIdsToChatHistoryChunkTexts(chunks));
    } else {
      for (const chunk of addIdsToChatHistoryChunkTexts(chunks)) {
        const texts = chunk.texts;
        const user = chunk.user;
        if (user === "human") {
          setStoredValue((prevChunks) => [...prevChunks, chunk]);
        } else {
          setStoredValue((prevChunks) => {
            const placeHolderChunk = { texts: [], user };
            if (
              prevChunks.slice(-1)?.[0]?.texts?.slice(-1)?.[0]?.value ===
              "[TYPING]"
            ) {
              // if the previous text was [TYPING] don't add a placeHolderChunk, instead let it be overwritten on line 37,
              // this feature allows to set [TYPING] as text and wait for an api request to finish before replacing it with the real text
              return [...prevChunks];
            }
            return [...prevChunks, placeHolderChunk];
          });
          for (const text of texts) {
            await wait(500);
            setStoredValue((prevChunks) => {
              const chunkLength = prevChunks.length - 1;
              const newChunk = { ...prevChunks[chunkLength] };

              if (newChunk.texts.slice(-1)[0]?.value !== "[TYPING]") {
                // if previous text is [TYPING] don't add a new one
                newChunk.texts = [
                  ...newChunk.texts,
                  { id: uuid(), value: "[TYPING]" },
                ];
              }
              const newChunks = [...prevChunks];
              newChunks[chunkLength] = newChunk;
              return newChunks;
            });

            const typingTime = text.value.length * 40;
            await wait(typingTime >= 1500 ? 1500 : typingTime);
            setStoredValue((prevChunks) => {
              const chunksLength = prevChunks.length - 1;
              const newChunk = { ...prevChunks[chunksLength] };
              const textsLength = newChunk.texts.length - 1;
              newChunk.texts[textsLength].value = text.value;
              const newChunks = [...prevChunks];
              newChunks[chunksLength] = newChunk;
              return newChunks;
            });
          }
        }
      }
    }
  };
  return [storedValue, setValue] as const;
};

export default useChatHistory;
