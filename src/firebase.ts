import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCNFQk2NMzepmhJosqDG1ezR_6ZeIu0n3U",
  authDomain: "lic-proyect.firebaseapp.com",
  databaseURL: "https://lic-proyect.firebaseio.com",
  projectId: "lic-proyect",
  storageBucket: "lic-proyect.appspot.com",
  messagingSenderId: "201082303375",
  appId: "1:201082303375:web:db559d6ee527d14145d1fa",
  measurementId: "G-ZS34G7QT1P"
});

export const store = firebaseApp.storage();
export const db = firebaseApp.firestore();
