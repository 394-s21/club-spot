import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmlmV1r9_GK3-PpgvZwPM78C4YbFOs4_8",
  authDomain: "club-spot-b3f48.firebaseapp.com",
  databaseURL: "https://club-spot-b3f48-default-rtdb.firebaseio.com",
  projectId: "club-spot-b3f48",
  storageBucket: "club-spot-b3f48.appspot.com",
  messagingSenderId: "824784786014",
  appId: "1:824784786014:web:411772c7a3edd52f839acf"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
export { firebase };