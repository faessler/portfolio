import ReactMarkdown from "react-markdown";
import FocusTrap from "focus-trap-react";
import { IContact } from "src/api/contactAPI";
import { IChatHistoryChunk } from "src/hooks/useChatHistory";
import Button from "src/components/atoms/Button/Button";
import { IFrame } from "src/components/atoms/Frame/Frame";
import HideScrollBar from "src/components/atoms/HideScrollBar/HideScrollBar";
import Icon from "src/components/atoms/Icon/Icon";
import Image from "src/components/atoms/Image/Image";
import SectionTitle from "src/components/atoms/SectionTitle/SectionTitle";
import Gallery from "src/components/molecules/Gallery/Gallery";
import Header from "src/components/organisms/Header/Header";
import styles from "./Contact.module.scss";

type Props = {
  chatHistory: Array<IChatHistoryChunk>;
  contact: IContact;
  frames: Array<IFrame>;
  projectShowHandlerFunc: Function;
  resetChatHistoryFunc: Function;
  toggleContactVisibility: Function;
};

const Contact = ({
  chatHistory,
  contact,
  frames,
  projectShowHandlerFunc,
  resetChatHistoryFunc,
  toggleContactVisibility,
}: Props) => (
  <FocusTrap>
    <div className={styles.container}>
      <Header className={styles.header}>
        <button onClick={() => toggleContactVisibility()}>
          <Icon name="angleLeft" />
          <span>Back</span>
        </button>
        <h1 id="dialog1Title">Contact Info</h1>
      </Header>

      <HideScrollBar>
        <div className={styles.profilePicture}>
          <Image
            alt="Profile Picture"
            src="https://ffcea282157d6d5d322dcde104c7cbb33201f72c73eb304cf8c2f8d-apidata.googleusercontent.com/download/storage/v1/b/portfolio-252220/o/profile%2Fbig.jpg?jk=ATxpoHf44IfYNs0Zfm9v20t89L7Tlw7H_FFbxoHi8H6k8tBJ76elm8rtliQUz8CY1JL3GMnTs6jyUczSJbjLIArLKLDXPg6BvHpoo9LrQm-FDZPH7xdfYnxf4U1BG229JTVbS3PP3juhYSxA9t_fgjWyNh0j6ah52wBw5XS8vfJzJql3DzpGllKw2GSqqmDeYcQR4cBp-9mdTMSrDRm2n5nm4f41pS_xa5DKjbMJqxAFz-6vcWwwjfqU0oez_g-S8mYj2i2tSRhz6bEynMtII4_gTf6iU7FT2q22pnrXjwkFhDcc-JC_UXLm6XO8124Koob2p15YKEFvCrdrFuShwYRH3IsYSi-xBa9HTZA43EqgXW-56ieneXBY-8Sy9b9nXEXfYCslaJVojLsTIQLV-qDkYc-3Yp-lJZy4hg9Vn07ezWOziRM3-G1QXoeOc-DL-l_3sdHxLnz4vBQ0DlLZkK95bvC3mcPkN797OhmpyCjGlBmhVAVOy2uH_GusgRXmGIWdeMqIbyNxi5KBkHlIXMSlaFWOYbY8YNBKCH1RM8ngKr1fJN7ShlUBcxIVjVXA2b77k7c4T4ImWProWUz5rz1T0sJqchRzzp3edKHD_dB4J9UYmF7tfscPexvZTVgKALicbUTXNuGApGFmduagchiMZ8Y7tev0CmFDk6W2SMwEKoqdfP-CvDwWuWhnvsYGT4zGdrWQUQmBbmH02JU96SvuAI2gbe9BQE-iVWDhoMSsNZnOHLepViC-iA1qjOpyiROPMPgFJeiqjO7wCAvjTUdmYyAsreNlBlVvVN_ib_gLIyoYw0rjv6AYSm4HlwooNHjkMPZUuDbhT08XtN4--hCl20B6VZ0YXTbaxDm3eG_9u-HiJ0UH3LR2huuZaT4h3rxX-aRc3G0aHbxYEt0LIyo7rp1GEalo-atUlz2ulAMO4bo6NcjbI9mvRMrS4xUfRayzJCOhn8XNK5pHUaFCmp48jV-2q2nqqK5TNOetp6xyugYjl6zWpKXzX6xQzdwv221HVIwDbOq1Z7VhhdZMgvE023nTG5Abm8MZFPcjhs-MbkKtda_UUnGHOlcWTEOYeHQgR3dc6tw-VrkceM6BTxQAmPUa4RD3Uy359jcY&isca=1"
            srcX2="https://ff4cd494ac79bc12362fc8c6e3b673d87645da05d9fa5abb6e62048-apidata.googleusercontent.com/download/storage/v1/b/portfolio-252220/o/profile%2Fbig-x2.jpg?jk=ATxpoHduOYGfqxp9Geb5M8XfbMnskOHbueZAS88L_e5wsCbaWeg3sG-myZ_SRqBokd4GO1Iyvsmx8MAzJfqL7oRsagcniDGqwMuUgv_gucyhorBKfP5_xklCL-k3tI6hW1-66Zby_Sne9D-M3Ke_gQpKG7tClX6B0_ZIOvyMDvmaq3NzOX9sFiWTBgn7ywmQJ-4mX9QeiceUrV7N0BpFBoRRIwBBkCMZNiLgQx-Apj7tXhfYmMI7CzrC6JCqprexdi32K8wOL7_lW-UnLWLXtJKGdVtcY0323t39A9NSQzJrMHGaqeKHHPFPZs0haCstDNt7DkORik9NCpkcV-xJI2ONQ5cfIHfvYKEI7rM9ru7wivVJw4ZHwgsEv-3aBS1UxDpqU-lkdp-1_6l4BzImu9YhgRZc-4IpFB0CnX4MuVNfhxKLVYJcXwg0FRbLa1VVV6nRGdw0_TFvFGJiXw0sw1M-5PmAa4jv3UY3c6zdvfA3YtLas51hhD7XD2NqjNsdhiOEsK4goebWkG8znaW8KHsBcO9DndTBjgFn9QC89l6nVRvIOLEP6R8RUbh_3rh0aqMqD8_J-Z7lrNCpcBZjU7wXvBc8u3hg0P9ZUcUl7oZRMun0STGenvgo2kqUTVRlOlhELM29xE3H5FTz7WnUV2PwhVnSBZhVaGqUdbh5jNs-YfsaBsYFnb4Wu90wuCipjSUB2oDXZ0fs5br1KcH0gofRmVv01DhHzSzKYh_yA5HaP7UESVe1KcFJB5NsAgyFz2ykoDxtlL3bz8jUlbzJTBPDNZtEgWc4VaGb0shsbDmgVc_z3SkUH9k4p2ifL2ULXMp41yBcWrrP2tmfjLeqr7Ge_tvy4CKjOb65_0A3YKVa6vdWyOTuAtVyX3wIwI7MsMFTxGn1NdBk_ckzmHGV3u0l6koLMsXcmLVBKLRHqs99zvGKnA_lrnIDcYat77V-CSlhlIFpDq5DfIt173BslyMqNfNb7VQ9nhRQjLD-XnFUYq4qfPaJ1PNiI0RvPENpmUwNs-ZosOio66cnv9Zuo85ExSHfm9yK3mR4SLFK-nhzQmMt3l0-NP978M7w8OKmsmbNYz82trp8Iew75vcSs_LwbYoXJ4Ro9Tr3ZZKPNvj-&isca=1"
          />
        </div>

        <div className={styles.wrapper}>
          <div className={styles.section}>
            <h2 className={styles.name}>{contact.about?.title}</h2>
            <div id="dialog1Desc">
              <ReactMarkdown
                source={contact.about?.text.replace(/\\n/g, "\n") || ""}
              />
            </div>
          </div>

          <div className={`${styles.section} ${styles.workAndProjects}`}>
            <SectionTitle>Work and projects</SectionTitle>
            <Gallery frames={frames} showHandlerFunc={projectShowHandlerFunc} />
          </div>

          <div className={styles.section}>
            <SectionTitle>{contact.info?.title}</SectionTitle>
            <ReactMarkdown
              source={contact.info?.text.replace(/\\n/g, "\n") || ""}
            />
          </div>

          <div className={styles.section}>
            <SectionTitle>{contact.reset?.title}</SectionTitle>
            {chatHistory.length > 1 ? (
              <>
                <ReactMarkdown
                  source={
                    contact.reset?.deleteHistory.replace(/\\n/g, "\n") || ""
                  }
                />
                <Button onClick={resetChatHistoryFunc}>Reset</Button>
              </>
            ) : (
              <ReactMarkdown
                source={contact.reset?.noHistory.replace(/\\n/g, "\n") || ""}
              />
            )}
          </div>
        </div>
      </HideScrollBar>
    </div>
  </FocusTrap>
);

export default Contact;
