import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASGDDn8RznBQqg3WryO8ZSNi9Ok6AKeY4",
  authDomain: "react-ecommerce-7a4a8.firebaseapp.com",
  projectId: "react-ecommerce-7a4a8",
  storageBucket: "react-ecommerce-7a4a8.appspot.com",
  messagingSenderId: "516187336888",
  appId: "1:516187336888:web:083ec592c106cd0171044d",
  measurementId: "G-9VXWWQH5XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const realdb = getDatabase(app);

export { auth, db, realdb };
export default app;