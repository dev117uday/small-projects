import firebase from "firebase/app";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-tfJNUc2-gCux_pgI4syhJ2JxhkH_j4A",
  authDomain: "homefill.firebaseapp.com",
  databaseURL: "https://homefill.firebaseio.com",
  projectId: "homefill",
  storageBucket: "homefill.appspot.com",
  messagingSenderId: "544125426389",
  appId: "1:544125426389:web:59893988c1b7db7690205c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
