import { useEffect, useRef } from "react";
import { IAnswer } from "src/api/chatAPI";
import { IChatHistoryChunk } from "src/hooks/useChatHistory";
import { IFrame } from "src/components/atoms/Frame/Frame";
import HideScrollBar from "src/components/atoms/HideScrollBar/HideScrollBar";
import MessageBubble from "src/components/atoms/MessageBubble/MessageBubble";
import Gallery from "src/components/molecules/Gallery/Gallery";
import styles from "./Messages.module.scss";

type Props = {
  answers: Array<IAnswer>;
  chatHistory: Array<IChatHistoryChunk>;
  humanName: string;
  projectFrames: Array<IFrame>;
  projectShowHandlerFunc: Function;
};

const Messages = ({
  answers,
  chatHistory,
  humanName,
  projectFrames,
  projectShowHandlerFunc,
}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [chatHistory, answers]);

  const messageProcessor = (text: string, author: "bot" | "human") => {
    if (author !== "human") {
      switch (text) {
        case "[TYPING]":
          return text.replace("[TYPING]", "💬");
        case "[PROJECTS]":
          return (
            <Gallery
              frames={projectFrames}
              showHandlerFunc={projectShowHandlerFunc}
            />
          );
        default:
          return text.replace("[NAME]", humanName);
      }
    }
    return text;
  };

  return (
    <div className={styles.container}>
      <HideScrollBar ref={scrollRef}>
        <div className={styles.wrapper}>
          {chatHistory.map((chatHistoryChunk) =>
            chatHistoryChunk.texts.map(({ id, value }) => (
              <MessageBubble
                key={id}
                isHuman={chatHistoryChunk.user === "human"}
                isGallery={value === "[PROJECTS]"}
              >
                {messageProcessor(value, chatHistoryChunk.user)}
              </MessageBubble>
            ))
          )}
        </div>
      </HideScrollBar>
    </div>
  );
};

export default Messages;
