import { motion } from "framer-motion";
import { IAnswer } from "src/api/chatAPI";
import styles from "./AnswerButton.module.scss";

type Props = {
  answer: IAnswer;
  answerHandler: Function;
};

const AnswerButton = ({ answer, answerHandler }: Props) => (
  <motion.button
    initial={{ translateY: "100%", opacity: 0 }}
    animate={{ translateY: "0%", opacity: 1 }}
    transition={{ delay: 0.5 }}
    className={styles.answerButton}
    onClick={() => answerHandler(answer)}
  >
    {answer.text}
  </motion.button>
);

export default AnswerButton;
