import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCZr8hHMiLbaKAwb1vbFxxohUqPfviiihU",
  authDomain: "chatapp-92747.firebaseapp.com",
  projectId: "chatapp-92747",
  storageBucket: "chatapp-92747.appspot.com",
  messagingSenderId: "37490990638",
  appId: "1:37490990638:web:ec062fbfa50d44238f89bf",
};

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const db = app.firestore();
// const auth = firebase.auth();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  db,
};
