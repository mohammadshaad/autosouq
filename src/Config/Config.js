import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDAiTP56QK78wMBCW361FiZJwa4EpfyF8M",
  authDomain: "autosouq-d2907.firebaseapp.com",
  databaseURL: "https://autosouq-d2907-default-rtdb.firebaseio.com",
  projectId: "autosouq-d2907",
  storageBucket: "autosouq-d2907.appspot.com",
  messagingSenderId: "52394311323",
  appId: "1:52394311323:web:b42f9a929d381febad903e",
  measurementId: "G-5QHTNNT1NZ",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const realtimeDb = firebase.database();

export { auth, db, storage, realtimeDb, firebase };
