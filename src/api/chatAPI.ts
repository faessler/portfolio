import { doc, getDoc } from "firebase/firestore/lite";
import database from "src/api/firestoreAPI";

export type AnswerType = {
  target: string;
  text: string;
};
export type ChatChunkType = {
  answers: AnswerType[];
  texts: string[];
};
export type ChatType = {
  [key: string]: ChatChunkType;
};

const chatAPI = async () => {
  const docRef = doc(database, "Chat", "v1");
  const docSnap = await getDoc(docRef);
  const chatDocument = docSnap.data();
  return chatDocument as ChatType;
};

export default chatAPI;
