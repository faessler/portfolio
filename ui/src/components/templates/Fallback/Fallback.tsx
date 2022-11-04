import styles from "./Fallback.module.scss";

const Fallback = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.spinner}>
        <circle cx="20" cy="20" r="18" />
      </svg>
    </div>
  );
};

export default Fallback;
