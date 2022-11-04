import ReactMarkdown from "react-markdown";
import FocusTrap from "focus-trap-react";
import { IContact } from "src/api/contactAPI";
import { IChatHistoryChunk } from "src/hooks/useChatHistory";
import Button from "src/components/atoms/Button/Button";
import { IFrame } from "src/components/atoms/Frame/Frame";
import HideScrollBar from "src/components/atoms/HideScrollBar/HideScrollBar";
import Icon from "src/components/atoms/Icon/Icon";
import Image from "src/components/atoms/Image/Image";
import SectionTitle from "src/components/atoms/SectionTitle/SectionTitle";
import Gallery from "src/components/molecules/Gallery/Gallery";
import Header from "src/components/organisms/Header/Header";
import styles from "./Contact.module.scss";

type Props = {
  chatHistory: Array<IChatHistoryChunk>;
  contact: IContact;
  frames: Array<IFrame>;
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
      <Header className={styles.header}>
        <button onClick={() => toggleContactVisibility()}>
          <Icon name="angleLeft" />
          <span>Back</span>
        </button>
        <h1 id="dialog1Title">Contact Info</h1>
      </Header>

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
            <h2 className={styles.name}>{contact.about?.title}</h2>
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
