import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import styles from "./HideScrollBar.module.scss";

type Props = {
  axis?: "horizontal" | "vertical";
  children: React.ReactNode;
};

const HideScrollBar = (
  { axis = "vertical", children }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => (
  <div className={styles[axis]}>
    <div className={styles.wrapper} ref={ref}>
      {children}
    </div>
  </div>
);

export default forwardRef(HideScrollBar);
