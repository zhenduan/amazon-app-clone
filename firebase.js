import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDk8obi-vGgWOV2LZae5HqzP_kmNzFWa9E",
  authDomain: "react--app-cef1d.firebaseapp.com",
  projectId: "react--app-cef1d",
  storageBucket: "react--app-cef1d.appspot.com",
  messagingSenderId: "941068276566",
  appId: "1:941068276566:web:b8317238e8f7b322ff3cf7",
  measurementId: "G-GMF6JQ77LF",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
