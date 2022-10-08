import {
  query,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore/lite";
import database from "src/api/firestoreAPI";

type AboutType = {
  text: string;
  title: string;
};
type InfoType = {
  text: string;
  title: string;
};
type ResetType = {
  deleteHistory: string;
  noHistory: string;
  title: string;
};
export type ContactType = {
  about?: AboutType;
  info?: InfoType;
  reset?: ResetType;
};

const contactAPI = async () => {
  const q = query(collection(database, "Contact"));
  const querySnapshot = await getDocs(q);
  const contactDocuments: DocumentData = {};
  querySnapshot.forEach((doc) => {
    const contactDocument = doc.data();
    contactDocuments[doc.id] = contactDocument;
  });
  return contactDocuments as ContactType;
};

export default contactAPI;
