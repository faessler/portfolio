import { AnswerType } from "src/api/chatAPI";
import AnswerButton from "./AnswerButton/AnswerButton";
import AnswerInput from "./AnswerInput/AnswerInput";
import styles from "./Answers.module.scss";

type Props = {
  answers: Array<AnswerType>;
  answerHandler: Function;
};

const Answers = ({ answers, answerHandler }: Props) => (
  <div className={styles.answers}>
    {answers.map((answer, index) =>
      answer.text.includes("[INPUT_") ? (
        <AnswerInput
          key={index}
          answer={answer}
          answerHandler={answerHandler}
        />
      ) : (
        <AnswerButton
          key={index}
          answer={answer}
          answerHandler={answerHandler}
        />
      )
    )}
  </div>
);

export default Answers;
