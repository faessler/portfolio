import type { ForwardedRef } from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
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
    <motion.div className={styles.wrapper} layoutScroll ref={ref}>
      {children}
    </motion.div>
  </div>
);

export default forwardRef(HideScrollBar);
