import { useEffect, useRef } from "react";
import { ChatHistoryChunk } from "src/interfaces/chatHistory";
import { AnswerType } from "src/api/chatAPI";
import { FrameType } from "src/components/atoms/Frame/Frame";
import Gallery from "src/components/molecules/Gallery/Gallery";
import HideScrollBar from "src/components/atoms/HideScrollBar/HideScrollBar";
import MessageBubble from "src/components/atoms/MessageBubble/MessageBubble";
import styles from "./Messages.module.scss";

type Props = {
  answers: Array<AnswerType>;
  chatHistory: Array<ChatHistoryChunk>;
  humanName: string;
  projectFrames: Array<FrameType>;
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
