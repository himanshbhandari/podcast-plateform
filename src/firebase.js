// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDag43m8hMLVxNaspr3Xo24piX8NNIsQaU",
  authDomain: "podcast-app-react-ea054.firebaseapp.com",
  projectId: "podcast-app-react-ea054",
  storageBucket: "podcast-app-react-ea054.appspot.com",
  messagingSenderId: "660651919081",
  appId: "1:660651919081:web:5f5782aa04be420c0cd278",
  measurementId: "G-CGWKV70Y8T"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);  
const storage=getStorage(app);
const auth=getAuth(app);

export {auth,db,storage};
