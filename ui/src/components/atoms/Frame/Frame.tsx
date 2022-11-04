import styles from "./Frame.module.scss";

export interface IFrame {
  altText: string;
  image: string;
  index: number;
  subtitle: string;
  title: string;
}
type Props = {
  frame: IFrame;
  frameIndex: number;
  showHandlerFunc: Function;
};

const Frame = ({ frame, frameIndex, showHandlerFunc }: Props) => (
  <article className={styles.container}>
    <img className={styles.image} src={frame.image} alt={frame.altText} />
    <h3 className={styles.heading}>
      {frame.subtitle && <small>{frame.subtitle}</small>}
      {frame.title}
    </h3>
    <button
      className={styles.button}
      onClick={() => showHandlerFunc(frameIndex, false)}
    >
      Show more
    </button>
  </article>
);

export default Frame;
