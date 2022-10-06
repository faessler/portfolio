import Icon from "src/components/atoms/Icon/Icon";
import Image from "src/components/atoms/Image/Image";
import styles from "./Header.module.scss";

type Props = {
  type: "chat" | "contact" | "project";
  toggleContactVisibility?: Function;
  galleryShowHandlerFunc?: Function;
};

const Header = ({
  type,
  toggleContactVisibility = () => {},
  galleryShowHandlerFunc = () => {},
}: Props) => (
  <header className={`${styles.header} ${styles[type]}`}>
    {type === "chat" && (
      <div onClick={() => toggleContactVisibility()}>
        <Image
          alt="Profile Picture"
          src="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/small.jpg"
          srcX2="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/small-x2.jpg"
        />
        <h1>Jan Fässler</h1>
      </div>
    )}
    {type === "contact" && (
      <>
        <div onClick={() => toggleContactVisibility()}>
          <Icon name="angleLeft" />
          <span>Back</span>
        </div>
        <h2>Contact Info</h2>
      </>
    )}
    {type === "project" && (
      <div onClick={() => galleryShowHandlerFunc()}>
        <span>Close</span>
        <Icon name="close" />
      </div>
    )}
  </header>
);

export default Header;
