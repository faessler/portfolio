import { ChatHistoryChunk } from "src/interfaces/chatHistory";
import { isEmpty } from "src/helpers";
import { AnswerType } from "src/api/chatAPI";
import Header from "src/components/organisms/Header/Header";
import Answers from "src/components/molecules/Answers/Answers";
import Messages from "src/components/molecules/Messages/Messages";
import { FrameType } from "src/components/atoms/Frame/Frame";
import styles from "./Chat.module.scss";

type Props = {
  answers: Array<AnswerType>;
  answerHandler: Function;
  chatHistory: Array<ChatHistoryChunk>;
  humanName: string;
  projectFrames: Array<FrameType>;
  projectShowHandlerFunc: Function;
  toggleContactVisibility: Function;
};

const Chat = ({
  answers,
  answerHandler,
  chatHistory,
  humanName,
  projectFrames,
  projectShowHandlerFunc,
  toggleContactVisibility,
}: Props) => (
  <div className={styles.chat}>
    <Header type="chat" toggleContactVisibility={toggleContactVisibility} />
    <Messages
      answers={answers}
      chatHistory={chatHistory}
      humanName={humanName}
      projectFrames={projectFrames}
      projectShowHandlerFunc={projectShowHandlerFunc}
    />
    {!isEmpty(answers) && (
      <Answers answers={answers} answerHandler={answerHandler} />
    )}
  </div>
);

export default Chat;
