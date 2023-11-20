import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAn985OSJZM2_6dqh0jdIjMh4otodIo0hw",
  authDomain: "autosouq-4de0c.firebaseapp.com",
  databaseURL: "https://autosouq-4de0c-default-rtdb.firebaseio.com",
  projectId: "autosouq-4de0c",
  storageBucket: "autosouq-4de0c.appspot.com",
  messagingSenderId: "141757253112",
  appId: "1:141757253112:web:c225c34a12afc33434c20d",
  // measurementId: "G-5QHTNNT1NZ",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const realtimeDb = firebase.database();

export { auth, db, storage, realtimeDb, firebase };
