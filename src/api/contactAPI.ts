import {
  query,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore/lite";
import database from "src/api/firestoreAPI";

type About = {
  text: string;
  title: string;
};
type Info = {
  text: string;
  title: string;
};
type Reset = {
  deleteHistory: string;
  noHistory: string;
  title: string;
};
export interface IContact {
  about?: About;
  info?: Info;
  reset?: Reset;
}

const contactAPI = async () => {
  const q = query(collection(database, "Contact"));
  const querySnapshot = await getDocs(q);
  const contactDocuments: DocumentData = {};
  querySnapshot.forEach((doc) => {
    const contactDocument = doc.data();
    contactDocuments[doc.id] = contactDocument;
  });
  return contactDocuments as IContact;
};

export default contactAPI;
