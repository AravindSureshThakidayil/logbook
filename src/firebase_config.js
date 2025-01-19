import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDy0CnpAZiAbraymdN2Jof_xM5K-zAnuCQ",
    authDomain: "logbook-d8af5.firebaseapp.com",
    projectId: "logbook-d8af5",
    storageBucket: "logbook-d8af5.firebasestorage.app",
    messagingSenderId: "112268921365",
    appId: "1:112268921365:web:82dee6a060482430bd5c1c",
    measurementId: "G-WY2S3GDWRW"
 };

  firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()