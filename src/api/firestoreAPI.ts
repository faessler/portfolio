import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GCP_FIRESTORE_API_KEY,
  authDomain: `${process.env.REACT_APP_GCP_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_GCP_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.REACT_APP_GCP_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_GCP_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_GCP_FIRESTORE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_GCP_FIRESTORE_APP_ID,
};
firebase.initializeApp(firebaseConfig);
const firestoreAPI = firebase.firestore();

export default firestoreAPI;
