import firebase from "firebase/app";
import "firebase/database";

// set up club spot
const firebaseConfig = {
  apiKey: "Replace With Your Credential",
  authDomain: "Replace With Your Credential",
  databaseURL: "Replace With Your Credential",
  projectId: "Replace With Your Credential",
  storageBucket: "Replace With Your Credential",
  messagingSenderId: "Replace With Your Credential",
  appId: "Replace With Your Credential",
  measurementId: "Replace With Your Credential"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
export { firebase };