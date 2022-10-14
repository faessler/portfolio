import {
  query,
  collection,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore/lite";
import database from "src/api/firestoreAPI";

export interface IProject {
  client?: string;
  date?: Timestamp;
  hide?: Boolean;
  mockup?: string;
  name?: string;
  previewImage?: string;
  technology?: string;
  text?: string;
  url?: string;
}

const projectsAPI = async () => {
  const q = query(collection(database, "Projects"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const projectDocuments = [] as IProject[];
  querySnapshot.forEach((doc) => {
    const projectDocument = doc.data();
    projectDocuments.push(projectDocument);
  });
  return projectDocuments;
};

export default projectsAPI;
