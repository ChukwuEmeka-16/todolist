import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider , FacebookAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDMw6c91l9w6JJ7DeVn8gHnry9uOhZ9aMA",
  authDomain: "fir-tutorial-c96a0.firebaseapp.com",
  projectId: "fir-tutorial-c96a0",
  storageBucket: "fir-tutorial-c96a0.appspot.com",
  messagingSenderId: "890517083402",
  appId: "1:890517083402:web:b3df36013e2a9f38f9d6f3",
  measurementId: "G-9CH221R70T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const faceBookProvider = new FacebookAuthProvider()
export const db = getFirestore(app)
