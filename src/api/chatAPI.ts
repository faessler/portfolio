import { doc, getDoc } from "firebase/firestore/lite";
import database from "src/api/firestoreAPI";

export interface IAnswer {
  target: string;
  text: string;
}
export interface IChatChunk {
  answers: IAnswer[];
  texts: string[];
}
export interface IChat {
  [key: string]: IChatChunk;
}

const chatAPI = async () => {
  const docRef = doc(
    database,
    "Chat",
    `${process.env.REACT_APP_GCP_FIRESTORE_CHAT_VERSION}`
  );
  const docSnap = await getDoc(docRef);
  const chatDocument = docSnap.data();
  return chatDocument as IChat;
};

export default chatAPI;
