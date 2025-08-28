import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// استبدلي هذه القيم بمعلومات مشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-bucket.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);