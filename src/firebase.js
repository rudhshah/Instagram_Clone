import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAWYTGSzmI34acV1dBRjaEqvUSmWpzztZk",
    authDomain: "instagram-clone-shah.firebaseapp.com",
    databaseURL: "https://instagram-clone-shah-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-shah",
    storageBucket: "instagram-clone-shah.appspot.com",
    messagingSenderId: "38069778583",
    appId: "1:38069778583:web:f2cc1430ee6d8244fb51d2",
    measurementId: "G-BZ4NTQD69B"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
