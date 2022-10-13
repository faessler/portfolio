import { memo } from "react";
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
}: Props) => {
  return (
    <header className={`${styles.header} ${styles[type]}`}>
      {type === "chat" && (
        <button onClick={() => toggleContactVisibility()}>
          <Image
            alt="Profile Picture"
            src="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/small.jpg"
            srcX2="https://storage.googleapis.com/portfolio-252220.appspot.com/profile-picture/small-x2.jpg"
          />
          <h1>Jan Fässler</h1>
        </button>
      )}
      {type === "contact" && (
        <>
          <button onClick={() => toggleContactVisibility()}>
            <Icon name="angleLeft" />
            <span>Back</span>
          </button>
          <h2 id="dialog1Title">Contact Info</h2>
        </>
      )}
      {type === "project" && (
        <button onClick={() => galleryShowHandlerFunc()}>
          <span>Close</span>
          <Icon name="close" />
        </button>
      )}
    </header>
  );
};

function areEqual(prevProps: Props, nextProps: Props) {
  return prevProps.type === nextProps.type;
}

export default memo(Header, areEqual);
