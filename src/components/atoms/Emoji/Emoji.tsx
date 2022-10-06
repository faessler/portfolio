import styles from "./Emoji.module.scss";

type Props = {
  name: "date" | "earth" | "fire" | "link" | "smile";
};

const Emoji = ({ name }: Props) => {
  const getAriaLabel = {
    date: "Date",
    earth: "Earth",
    fire: "Fire",
    link: "Link",
    smile: "Smile",
  };
  const getEmoji = {
    date: "📆",
    earth: "🌍",
    fire: "🔥",
    link: "🔗",
    smile: "🙂",
  };
  return (
    <span className={styles.emoji} role="img" aria-label={getAriaLabel[name]}>
      {getEmoji[name]}
    </span>
  );
};

export default Emoji;
