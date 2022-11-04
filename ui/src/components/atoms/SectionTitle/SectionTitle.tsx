import styles from "./SectionTitle.module.scss";

type Props = {
  children: React.ReactNode;
};

const SectionTitle = ({ children }: Props) => (
  <h2 className={styles.sectionTitle}>{children}</h2>
);

export default SectionTitle;
