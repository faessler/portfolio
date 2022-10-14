import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isEmpty } from "src/helpers";
import { useChatHistory, useSessionStorage } from "src/hooks";
import chatAPI, { ChatType, AnswerType } from "src/api/chatAPI";
import contactAPI, { ContactType } from "src/api/contactAPI";
import projectsAPI, { ProjectType } from "src/api/projectsAPI";
import sendMailAPI from "src/api/sendMailAPI";
import Chat from "src/components/templates/Chat/Chat";
import Fallback from "src/components/templates/Fallback/Fallback";
import { FrameType } from "src/components/atoms/Frame/Frame";
import styles from "./App.module.scss";

const Contact = lazy(() => import("src/components/templates/Contact/Contact"));
const Project = lazy(() => import("src/components/templates/Project/Project"));

const App = () => {
  const [humanName, setHumanName] = useState("");
  const [humanContact, setHumanContact] = useState("");

  /**
   * CHAT
   */
  const [chat, setChat] = useSessionStorage<ChatType>("chat", {});
  const [chatHistory, setChatHistory] = useChatHistory([]);
  const [answers, setAnswers] = useState<Array<AnswerType>>([]);
  useEffect(() => {
    if (isEmpty(chat)) {
      chatAPI().then(async (chatDocuments) => {
        setChat(chatDocuments);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    (async () => {
      const texts = chat?.start?.texts || [];
      const answers = chat?.start?.answers || [];
      await setChatHistory([{ texts, user: "bot" }]);
      setAnswers(answers);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat]);

  /**
   * PROJECTS
   */
  const [projectFocusTrap, setProjectFocusTrap] = useState(false);
  const [projects, setProjects] = useSessionStorage<ProjectType[]>(
    "projects",
    []
  );
  const [projectFrames, setProjectFrames] = useState<FrameType[]>([]);
  useEffect(() => {
    if (isEmpty(projects)) {
      projectsAPI().then((projectsDocument) => {
        setProjects(projectsDocument);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setProjectFrames(
      projects.map((project: ProjectType) => ({
        altText: project.name,
        image: project.previewImage,
        subtitle: project.technology,
        title: project.client,
      })) as FrameType[]
    );
  }, [projects]);

  const [isProjectVisible, setIsProjectVisible] = useState<Boolean>(false);
  const [showProject, setShowProject] = useState<number>(0);
  const showProjectHandler = (key: number, hasToClose: Boolean) => {
    setIsProjectVisible(!hasToClose);
    setShowProject(key);
  };

  /**
   * CONTACT
   */
  const [contact, setContact] = useSessionStorage<ContactType>("contact", {});
  useEffect(() => {
    if (isEmpty(contact)) {
      contactAPI().then((contactDocuments) => {
        setContact(contactDocuments);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isContactVisible, setIsContactVisible] = useState(false);
  const toggleContactVisibility = () => {
    setIsContactVisible((prevIsContactVisible) => !prevIsContactVisible);
  };

  const resetChatHistory = async () => {
    setChatHistory([]);
    setAnswers([]);
    const texts = chat?.start?.texts || [];
    const answers = chat?.start?.answers || [];
    await setChatHistory([{ texts, user: "bot" }]);
    setAnswers(answers);
  };

  /**
   * ANSWER
   */
  const answerHandler = async (
    { target, text }: AnswerType,
    inputPurpose?: "[INPUT_NAME]" | "[INPUT_CONTACT]"
  ) => {
    switch (inputPurpose) {
      case "[INPUT_NAME]":
        setHumanName(text);
        break;
      case "[INPUT_CONTACT]":
        setHumanContact(text);
        break;
      default:
        break;
    }

    setAnswers([]);

    const texts = chat?.[target]?.texts || [];
    const answers = chat?.[target]?.answers || [];

    if (target === "end") {
      await setChatHistory([
        { texts: [text], user: "human" },
        { texts: ["[TYPING]"], user: "bot" },
      ]);

      const history = chatHistory.flatMap((chunk) =>
        chunk.texts.map(({ value }) => value)
      );
      const isSentSuccessfully = await sendMailAPI({
        contact: humanContact || text,
        history,
        name: humanName || text,
      });
      if (isSentSuccessfully) {
        await setChatHistory([{ texts, user: "bot" }]);
      } else {
        await setChatHistory([{ texts: chat.error.texts, user: "bot" }]);
      }
    } else {
      await setChatHistory([
        { texts: [text], user: "human" },
        { texts, user: "bot" },
      ]);
    }

    await setAnswers(answers);
  };

  return (
    <div className={styles.app}>
      <div
        className={styles.layer}
        {...((isContactVisible || isProjectVisible) && { "aria-hidden": true })}
      >
        <Chat
          answers={answers}
          answerHandler={answerHandler}
          chatHistory={chatHistory}
          humanName={humanName}
          projectFrames={projectFrames}
          projectShowHandlerFunc={showProjectHandler}
          toggleContactVisibility={toggleContactVisibility}
        />
      </div>

      <AnimatePresence>
        {isContactVisible && (
          <motion.div
            className={styles.layer}
            initial={{ translateX: "-100%" }}
            animate={{ translateX: "0%" }}
            exit={{ translateX: "-100%" }}
            transition={{ type: "spring", damping: 18, stiffness: 100 }}
            role="dialog"
            aria-modal
            aria-labelledby="dialog1Title"
            aria-describedby="dialog1Desc"
            {...(isProjectVisible && { "aria-hidden": true })}
          >
            <Suspense fallback={<Fallback />}>
              <Contact
                chatHistory={chatHistory}
                contact={contact}
                toggleContactVisibility={toggleContactVisibility}
                frames={projectFrames}
                projectShowHandlerFunc={showProjectHandler}
                resetChatHistoryFunc={resetChatHistory}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProjectVisible && (
          <motion.div
            className={styles.layer}
            initial={{ translateY: "100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "100%" }}
            transition={{ type: "spring", damping: 18, stiffness: 100 }}
            role="dialog"
            aria-modal
            aria-labelledby="dialog2Title"
            aria-describedby="dialog2Desc"
            onAnimationComplete={() => {
              setProjectFocusTrap(!projectFocusTrap);
            }}
          >
            <Suspense fallback={<Fallback />}>
              <Project
                project={projects[showProject]}
                galleryFrames={projectFrames}
                galleryExcludeFrame={showProject}
                galleryShowHandlerFunc={showProjectHandler}
                projectFocusTrap={projectFocusTrap}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
