import { motion } from "framer-motion";
import styles from "./MessageBubble.module.scss";

type Props = {
  children: React.ReactNode;
  isGallery?: Boolean;
  isHuman?: Boolean;
};

const MessageBubble = ({
  children,
  isGallery = false,
  isHuman = false,
}: Props) => (
  <motion.div
    initial={{ translateX: isHuman ? "100%" : "-100%", opacity: 0 }}
    animate={{ translateX: "0%", opacity: 1 }}
    transition={{ type: "tween", duration: 0.2 }}
    layout
    className={`${styles.message} ${isHuman ? styles.human : styles.bot} ${
      isGallery ? styles.gallery : ""
    }`}
  >
    {children}
  </motion.div>
);

export default MessageBubble;
