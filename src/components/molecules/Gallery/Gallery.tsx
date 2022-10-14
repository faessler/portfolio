import { useState, useEffect, useRef } from "react";
import { isMobileOrTablet } from "src/helpers";
import Frame, { IFrame } from "src/components/atoms/Frame/Frame";
import HideScrollBar from "src/components/atoms/HideScrollBar/HideScrollBar";
import styles from "./Gallery.module.scss";

type Props = {
  excludeIndex?: number;
  frames: Array<IFrame>;
  scrollRef?: React.RefObject<HTMLDivElement>;
  showHandlerFunc: Function;
};

const Gallery = ({
  excludeIndex,
  frames,
  scrollRef,
  showHandlerFunc,
}: Props) => {
  const fallbackScrollRef = useRef<HTMLDivElement>(null);
  const [hideScrollBarScrollRef] = useState<React.RefObject<HTMLDivElement>>(
    scrollRef || fallbackScrollRef
  );
  const [isMovingSlider, setIsMovingSlider] = useState(false);

  // Enable drag and drop for gallery slider
  useEffect(() => {
    if (!isMobileOrTablet()) {
      const mouseDownHandler = (e1: MouseEvent, ref: HTMLDivElement) => {
        const rect = ref.getBoundingClientRect();
        const clickImpact = e1.pageX - rect.left;
        const currentScrollLeft = ref.scrollLeft;
        const setScrollPosition = (
          e: MouseEvent,
          rect: ClientRect,
          clickImpact: number,
          currentScrollLeft: number
        ) =>
          (ref.scrollLeft =
            -(e.pageX - rect.left - clickImpact) + currentScrollLeft);

        window.onmousemove = (e2: MouseEvent) => {
          setIsMovingSlider(true);
          setScrollPosition(e2, rect, clickImpact, currentScrollLeft);
        };
      };

      const removeOnMouseMoveListener = () => {
        window.onmousemove = null;
        setTimeout(() => {
          setIsMovingSlider(false);
        }, 100);
      };

      const hideScrollBarScrollRefCurrent = hideScrollBarScrollRef?.current;
      if (hideScrollBarScrollRefCurrent) {
        hideScrollBarScrollRefCurrent.addEventListener(
          "mousedown",
          (e) =>
            e.button === 0 && mouseDownHandler(e, hideScrollBarScrollRefCurrent)
        );
        window.addEventListener("mouseup", removeOnMouseMoveListener);
      }
      return () => {
        if (hideScrollBarScrollRefCurrent) {
          hideScrollBarScrollRefCurrent.removeEventListener("mousedown", (e) =>
            mouseDownHandler(e, hideScrollBarScrollRefCurrent)
          );
          window.removeEventListener("mouseup", removeOnMouseMoveListener);
        }
      };
    }
  }, [hideScrollBarScrollRef]);

  return (
    <div
      className={styles.container}
      onClickCapture={(e) => isMovingSlider && e.stopPropagation()}
    >
      <HideScrollBar axis="horizontal" ref={hideScrollBarScrollRef}>
        <div className={styles.gallery}>
          {frames.map(
            (frame, index) =>
              excludeIndex !== index && (
                <Frame
                  key={index}
                  frameIndex={index}
                  frame={frame}
                  showHandlerFunc={showHandlerFunc}
                />
              )
          )}
        </div>
      </HideScrollBar>
    </div>
  );
};

export default Gallery;
