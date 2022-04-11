import firebase, {initializeApp} from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgszGfJ46BNFk1KN0Qos-7w-7Or7_SqFY",
    authDomain: "fir-demo-53146.firebaseapp.com",
    projectId: "fir-demo-53146",
    storageBucket: "fir-demo-53146.appspot.com",
    messagingSenderId: "606762970180",
    appId: "1:606762970180:web:f8c9676bdb48f420846011",
    measurementId: "G-TDNN1RR959"
};

const app = initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage().ref();

export {firebase, app, db, storage};