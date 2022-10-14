import styles from "./Header.module.scss";

type Props = {
  children: React.ReactNode;
  className: string;
};

const Header = ({ children, className }: Props) => {
  return (
    <header className={`${styles.header} ${className || ""}`}>
      {children}
    </header>
  );
};

export default Header;
