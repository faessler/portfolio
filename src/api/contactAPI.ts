import firebase from "firebase/app";
import firestoreAPI from "src/api/firestoreAPI";

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

const contactAPI = () =>
  firestoreAPI
    .collection("Contact")
    .get()
    .then((querySnapshot) => {
      const contactDocuments: firebase.firestore.DocumentData = {};
      querySnapshot.forEach((doc) => {
        const contactDocument = doc.data();
        contactDocuments[doc.id] = contactDocument;
      });
      return contactDocuments as ContactType;
    });

export default contactAPI;
