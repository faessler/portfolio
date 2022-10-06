import firestoreAPI from "src/api/firestoreAPI";

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

const chatAPI = () =>
  firestoreAPI
    .doc(`Chat/v1`)
    .get()
    .then((doc) => {
      const chatDocument = doc.data();
      return chatDocument as ChatType;
    });

export default chatAPI;
