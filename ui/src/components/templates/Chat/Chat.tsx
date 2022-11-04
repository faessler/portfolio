import { IAnswer } from "src/api/chatAPI";
import { isEmpty } from "src/helpers";
import { IChatHistoryChunk } from "src/hooks/useChatHistory";
import { IFrame } from "src/components/atoms/Frame/Frame";
import Image from "src/components/atoms/Image/Image";
import Answers from "src/components/molecules/Answers/Answers";
import Messages from "src/components/molecules/Messages/Messages";
import Header from "src/components/organisms/Header/Header";
import styles from "./Chat.module.scss";

type Props = {
  answers: Array<IAnswer>;
  answerHandler: Function;
  chatHistory: Array<IChatHistoryChunk>;
  humanName: string;
  projectFrames: Array<IFrame>;
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
    <Header className={styles.header}>
      <button onClick={() => toggleContactVisibility()}>
        <Image
          alt="Profile Picture"
          src="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/small.jpg"
          srcX2="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/small-x2.jpg"
        />
        <h1>Jan Fässler</h1>
      </button>
    </Header>

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
