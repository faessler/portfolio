import firebase from "firebase/app";
import firestoreAPI from "src/api/firestoreAPI";

export type ProjectType = {
  client?: string;
  date?: firebase.firestore.Timestamp;
  hide?: Boolean;
  mockup?: string;
  name?: string;
  previewImage?: string;
  technology?: string;
  text?: string;
  url?: string;
};

const projectsAPI = () =>
  firestoreAPI
    .collection("Projects")
    .orderBy("date", "desc")
    .get()
    .then((querySnapshot) => {
      let projectDocuments = [] as ProjectType[];
      querySnapshot.forEach((doc) => {
        const projectDocument = doc.data();
        projectDocuments.push(projectDocument);
      });
      return projectDocuments;
    });

export default projectsAPI;
