// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
//  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1lqtqyqfayA576wwu3ePO8tSWDYJ37z4",
  authDomain: "vue-musicapp.firebaseapp.com",
  projectId: "vue-musicapp",
  storageBucket: "vue-musicapp.appspot.com",
  // messagingSenderId: "945367793844",
  appId: "1:945367793844:web:ba770e315ff4cdf57217e1",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  storage,
  usersCollection,
  songsCollection,
  commentsCollection,
};
