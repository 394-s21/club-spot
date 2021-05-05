import firebase from "firebase/app";
import "firebase/database";

// set up club spot
const firebaseConfig = {
  apiKey: "AIzaSyB0YH7-jSrWvmBEaK8xvrnBT8sAYlV86fM",
  authDomain: "club-spot.firebaseapp.com",
  projectId: "club-spot",
  storageBucket: "club-spot.appspot.com",
  messagingSenderId: "466909196535",
  appId: "1:466909196535:web:502ec9fad1e62a48ede3f2",
  measurementId: "G-WGT0C65EJD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
export { firebase };