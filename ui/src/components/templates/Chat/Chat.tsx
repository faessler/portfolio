import { IAnswer } from "src/api/chatAPI";
import { isEmpty } from "src/helpers";
import { IChatHistoryChunk } from "src/hooks/useChatHistory";
import { IFrame } from "src/components/atoms/Frame/Frame";
import Image from "src/components/atoms/Image/Image";
import Answers from "src/components/molecules/Answers/Answers";
import Messages from "src/components/molecules/Messages/Messages";
import Header from "src/components/organisms/Header/Header";
import styles from "./Chat.module.scss";

type Props = {
  answers: Array<IAnswer>;
  answerHandler: Function;
  chatHistory: Array<IChatHistoryChunk>;
  humanName: string;
  projectFrames: Array<IFrame>;
  projectShowHandlerFunc: Function;
  toggleContactVisibility: Function;
};

const Chat = ({
  answers,
  answerHandler,
  chatHistory,
  humanName,
  projectFrames,
  projectShowHandlerFunc,
  toggleContactVisibility,
}: Props) => (
  <div className={styles.chat}>
    <Header className={styles.header}>
      <button onClick={() => toggleContactVisibility()}>
        <Image
          alt="Profile Picture"
          src="https://ffdba6a4425a2ce4355678f4a94312c9ea0936d11146b66504b96fd-apidata.googleusercontent.com/download/storage/v1/b/portfolio-252220/o/profile%2Fsmall.jpg?jk=ATxpoHcG5LgcPmg4ynOmYhsA-KhpMDYiAsa5xoxhYedotQDjFbf9ReZyWAn1-7PPz6bVtFS1zRl54igrqnSnRQm8SiQejV9EM03GMafwVVaeP5UL_u5ME1eZHm_vSTTrmGoxp9eN1eui9oagJoc91uyEpBO9kpAJv3e4Cn2szAcsO4_Z6ZRITyYr-wNgyqA3KlZVby8hqlIqU67dDrs2ELprk01pBqWMpqHJNK8BpP3rN1TD6g97Gx9Jh6ZxOcaVyPJPEYIwg1qaSelZ9d_3ZLwkq_n0CkjJBDfusQkGBde36JYGm6Bcx7LwJI2l9R7lS9urjfuqdIRx1ByRb8vcOeEpXPQ6O3fLymd2ybmloLmQEMnC0C5o1ERFNr0pPohasryAcmc38vRTcSN9CKEsIw0MbrN-UbulcVrauzZEk8_d3-F3BIlgCpm6V35NJdX9ledoX7ajX9HwD2A35coj48TeINvwxT9Jxign_hQ3H12SMxYgMUOiUkoxa59Yu6FWaklgUzGjjF24eTXH-WXYiq85VMWUii2ztJBmDK770WQupEmcg1BNAcep1AsEPBjR1OS4QHvV3mxHY5rkd5RghwzVAemELVltQxOYEbYl4583MzJb5KjGc7T0xYHsOJjjNjcJZp8TxqJF18H7OfGCbmHYiZmwhEeDw0Nwm6WItnf8hJ5xV7brJqK3MHyUA_7AffwgWYRRSwUjldHHNLq2IOJx1q-c8DI8vLWUC4-KCZm3S-1tX_yBotCU1YM-M-xPBEojfAzoUEryJkdpOJwza8L0MVH5El-3jk381gGNAwhHZHBA8YSh9KWhAgIDYSotkxTaKva_mN1ai5gAHl-Kg8Ae4zBq6YW-bKBH5UDDsTXl8PtJWeSXcfBUi5KnbSc_G1IHLNuJDtNtHf1YfHdRZ5GqMu6XfhCN3ihLqDaM35cZCFMqid86S9XOvA_SqFxIfjYJlOKxoFQ-yYppFPZCQSpjuUclwFmrn0V7L-oQKLOtr-HavI0dEH4yodvz0jhHY9MzQu5XkrmZ0L-xGQW16VfqoSWvPhxeRhpK1Ok61ZhOQ7hey6_JSQkQEEjNLG26KPHuOampvEQhWwtuIMsgGqGU1nwTKDOFQ0jAuHlnmkSw&isca=1"
          srcX2="https://ff4315059a72ce25efcd00c907b526d18ceb17bb7d71391b29817f8-apidata.googleusercontent.com/download/storage/v1/b/portfolio-252220/o/profile%2Fsmall-x2.jpg?jk=ATxpoHcxR7a2PSl0Creev-DHQIyH4Bd1Hw5kddsC3rfLDwPuY-Ls1YApSsmC69ifgyuDTs3Lm2vqQpz-YR91EN9-Ll6ty1p7YUCklkfcl1BNEMK5huQ1Hhzjkmf2fcUacaRDPRV92jXKBY9fJ7Bzh5wOWtUHffUYfrftFBEA7Ida8lEvMxOQeKeYjU8gUv0XPT8x16HiAvzVGReMObyHXuQqKQpGZewMFfJKnjRstsN0tB1SRj2gAVdIGCUgptJ9q6LtrL3Yz-XhUgWvAJWjXD1upwNEXtAi5agW_cJ2lLbSZtT-hHEY_jI8wU21bGmRADL3gLeYYH3SG-q6lyXHqVOWg5fA469qx5it-WLO-Kq8Xb9QjVN1pWXmd2fRIu9le7Df-3E0kC4X3JvY6z0mJXIOUIQls18GwKPr1-3QklaMWB_E-2hQRvDQrY3EtcaXtWUWxW1CTaZcNqtFcmJXwcqzSicPBksFuNb4lJM7G31RqNOQNGGp2hnTtG8U7cuNFjsZ7fJWIhP2UV0U88FyI4ncs3zozt4_XQkfynjavjEv-Fywi7xveOegvzdfaf8gYMBuzhbZHytFsxHHolzJeBk9ePj5TONETez4-aDrIp-8xKok_L5s8RWRNCA84wQBwSCe_5gU9751gm1TQKitQvkLZh6lh2kvdKVAqwKuGvp5DlVf6qZ2wSQaJUZiU8uKc-H0WScPBtp92CmMHGmMeLQO4xdk2jxs1YGa_jCuwFYMVk_ljnnHMmusLEJnl4ttVd4eS84kGBVn1uQ5h3X0BC65x1-fDqp49IynJK14CCsagW5LniWVQW54yoMKzwALUdzdGKpDPHQ8u2r1-fWVzwfpEXdOpm0OBICP52MA7hsZ-2nTQiT5S1d3mOWdPAMgJMk0QaNVosRf2qmpjzrttk7fCndxzgYDLdxbXnFG0c-v3hhmRw5qhNlIfHe7HSxZDaeny3QJ71ZhGxF7mYXmjPcwBilb3VhqS6phL4i7IXTN9YiGhbOQVmde_ViVPlChZgmsiTRqPRnoezLxInAZO_OCB2kVAY8ky_aP4yMO1y3PYq1pWPiaA9OeMDYJr1ZrH_rRhpxyaw4xA-NiTWHoVU3p6FznRcLBJ3T65UJzMOx8G1WC&isca=1"
        />
        <h1>Jan Fässler</h1>
      </button>
    </Header>

    <Messages
      answers={answers}
      chatHistory={chatHistory}
      humanName={humanName}
      projectFrames={projectFrames}
      projectShowHandlerFunc={projectShowHandlerFunc}
    />

    {!isEmpty(answers) && (
      <Answers answers={answers} answerHandler={answerHandler} />
    )}
  </div>
);

export default Chat;
