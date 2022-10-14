import ReactMarkdown from "react-markdown";
import FocusTrap from "focus-trap-react";
import { ContactType } from "src/api/contactAPI";
import { ChatHistoryChunk } from "src/interfaces/chatHistory";
import Header from "src/components/organisms/Header/Header";
import Gallery from "src/components/molecules/Gallery/Gallery";
import Button from "src/components/atoms/Button/Button";
import { FrameType } from "src/components/atoms/Frame/Frame";
import HideScrollBar from "src/components/atoms/HideScrollBar/HideScrollBar";
import Image from "src/components/atoms/Image/Image";
import SectionTitle from "src/components/atoms/SectionTitle/SectionTitle";
import styles from "./Contact.module.scss";

type Props = {
  chatHistory: Array<ChatHistoryChunk>;
  contact: ContactType;
  frames: Array<FrameType>;
  projectShowHandlerFunc: Function;
  resetChatHistoryFunc: Function;
  toggleContactVisibility: Function;
};

const Contact = ({
  chatHistory,
  contact,
  frames,
  projectShowHandlerFunc,
  resetChatHistoryFunc,
  toggleContactVisibility,
}: Props) => (
  <FocusTrap>
    <div className={styles.container}>
      <Header
        type="contact"
        toggleContactVisibility={toggleContactVisibility}
      />
      <HideScrollBar>
        <div className={styles.profilePicture}>
          <Image
            alt="Profile Picture"
            src="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/big.jpg"
            srcX2="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/big-x2.jpg"
          />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.section}>
            <h3 className={styles.name}>{contact.about?.title}</h3>
            <div id="dialog1Desc">
              <ReactMarkdown
                source={contact.about?.text.replace(/\\n/g, "\n") || ""}
              />
            </div>
          </div>

          <div className={`${styles.section} ${styles.workAndProjects}`}>
            <SectionTitle>Work and projects</SectionTitle>
            <Gallery frames={frames} showHandlerFunc={projectShowHandlerFunc} />
          </div>

          <div className={styles.section}>
            <SectionTitle>{contact.info?.title}</SectionTitle>
            <ReactMarkdown
              source={contact.info?.text.replace(/\\n/g, "\n") || ""}
            />
          </div>

          <div className={styles.section}>
            <SectionTitle>{contact.reset?.title}</SectionTitle>
            {chatHistory.length > 1 ? (
              <>
                <ReactMarkdown
                  source={
                    contact.reset?.deleteHistory.replace(/\\n/g, "\n") || ""
                  }
                />
                <Button onClick={resetChatHistoryFunc}>Reset</Button>
              </>
            ) : (
              <ReactMarkdown
                source={contact.reset?.noHistory.replace(/\\n/g, "\n") || ""}
              />
            )}
          </div>
        </div>
      </HideScrollBar>
    </div>
  </FocusTrap>
);

export default Contact;
