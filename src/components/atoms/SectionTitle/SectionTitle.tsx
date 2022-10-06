import styles from "./SectionTitle.module.scss";

type Props = {
  children: React.ReactNode;
};

const SectionTitle = ({ children }: Props) => (
  <h3 className={styles.sectionTitle}>{children}</h3>
);

export default SectionTitle;
