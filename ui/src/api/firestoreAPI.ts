import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GCP_FIRESTORE_API_KEY,
  authDomain: `${process.env.REACT_APP_GCP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_GCP_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_GCP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_GCP_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_GCP_FIRESTORE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_GCP_FIRESTORE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);

export default database;
