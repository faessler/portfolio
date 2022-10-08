import { useState } from "react";
import { motion } from "framer-motion";
import { isIOS } from "src/helpers";
import { AnswerType } from "src/api/chatAPI";
import Icon from "src/components/atoms/Icon/Icon";
import styles from "./AnswerInput.module.scss";

type Props = {
  answer: AnswerType;
  answerHandler: Function;
};

const AnswerInput = ({ answer, answerHandler }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    answerHandler({ target: answer.target, text: inputValue }, answer.text);
  };

  return (
    <motion.form
      initial={{ translateY: "100%", opacity: 0 }}
      animate={{ translateY: "0%", opacity: 1 }}
      transition={{ delay: 0.5 }}
      action=""
      className={`${styles.answerInput} ${isIOS() ? styles.IOS : ""}`}
      onSubmit={onSubmit}
    >
      <input
        placeholder="Type and hit ENTER"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">
        <Icon name="submit" />
      </button>
    </motion.form>
  );
};

export default AnswerInput;
