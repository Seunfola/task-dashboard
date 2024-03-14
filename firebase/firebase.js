import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCDg7IdSUj-iFbZM8RLfW5Uqu8s46MZF1o",
  authDomain: "taskdashboard-f51ba.firebaseapp.com",
  projectId: "taskdashboard-f51ba",
  storageBucket: "taskdashboard-f51ba.appspot.com",
  messagingSenderId: "719842361150",
  appId: "1:719842361150:web:e8debaa176148a0bc6f66f",
  measurementId: "G-J1F3RF3SYT"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);
export const googleProvider =  new GoogleAuthProvider();