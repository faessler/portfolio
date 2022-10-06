import styles from "./Button.module.scss";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: Function;
};

const Button = ({ children, href = "", onClick = () => {} }: Props) => {
  if (href) {
    return (
      <a className={styles.button} href={href} onClick={() => onClick()}>
        {children}
      </a>
    );
  }
  return (
    <button className={styles.button} type="button" onClick={() => onClick()}>
      {children}
    </button>
  );
};

export default Button;
