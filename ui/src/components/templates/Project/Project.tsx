import { useEffect, useRef } from "react";
import FocusTrap from "focus-trap-react";
import { IProject } from "src/api/projectsAPI";
import { isMobileOrTablet, getDateTime } from "src/helpers";
import Emoji from "src/components/atoms/Emoji/Emoji";
import { IFrame } from "src/components/atoms/Frame/Frame";
import HideScrollBar from "src/components/atoms/HideScrollBar/HideScrollBar";
import Icon from "src/components/atoms/Icon/Icon";
import Image from "src/components/atoms/Image/Image";
import SectionTitle from "src/components/atoms/SectionTitle/SectionTitle";
import Gallery from "src/components/molecules/Gallery/Gallery";
import Header from "src/components/organisms/Header/Header";
import styles from "./Project.module.scss";

type Props = {
  galleryExcludeFrame?: number;
  galleryFrames: Array<IFrame>;
  galleryShowHandlerFunc: Function;
  project: IProject;
  projectFocusTrap: boolean;
};

const Project = ({
  galleryExcludeFrame,
  galleryFrames,
  galleryShowHandlerFunc,
  project,
  projectFocusTrap,
}: Props) => {
  const mainScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mainScrollRef?.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [mainScrollRef, project]);

  const galleryScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (galleryScrollRef?.current) {
      galleryScrollRef.current.scrollLeft = 0;
    }
  }, [galleryScrollRef, project]);

  const render = () => (
    <div className={styles.container}>
      <Header className={styles.header}>
        <button
          onClick={() => galleryShowHandlerFunc(galleryExcludeFrame, true)}
        >
          <span>Close</span>
          <Icon name="close" />
        </button>
      </Header>

      <main className={styles.main}>
        <HideScrollBar ref={mainScrollRef}>
          <div className={styles.introImage}>
            <Image src={project.previewImage || ""} alt={project.name || ""} />
            <h1 id="dialog2Title">
              <small>{project.technology}</small>
              {project.client}
            </h1>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.resume}>
              <h2 className={styles.resumeTitle}>{project.name}</h2>
              <p className={styles.resumeDescription} id="dialog2Desc">
                {project.text}
              </p>
              <p className={styles.resumeInfos}>
                {!!project.date && (
                  <span className={styles.resumeDate}>
                    <Emoji name="date" />{" "}
                    <time dateTime={getDateTime(project.date, "Y-MM-DD")}>
                      {getDateTime(project.date, "DD.MM.Y")}
                    </time>
                  </span>
                )}
                <a
                  href={`https://${project.url}`}
                  target={isMobileOrTablet() ? "_self" : "_blank"}
                  className={styles.resumeLink}
                  rel="noreferrer noopener"
                >
                  <Emoji name="link" /> {project.url}
                </a>
              </p>
            </div>

            <div className={styles.preview}>
              <h2 className={styles.previewTitle}>Overview</h2>
              <img
                src={project.mockup}
                alt={`Mockup ${project.client} Website`}
              />
            </div>

            <div className={styles.furtherProjects}>
              <SectionTitle>Further projects</SectionTitle>
              <Gallery
                frames={galleryFrames}
                excludeIndex={galleryExcludeFrame}
                showHandlerFunc={galleryShowHandlerFunc}
                scrollRef={galleryScrollRef}
              />
            </div>
          </div>
        </HideScrollBar>
      </main>
    </div>
  );

  if (projectFocusTrap) {
    return <FocusTrap>{render()}</FocusTrap>;
  }

  return render();
};

export default Project;
