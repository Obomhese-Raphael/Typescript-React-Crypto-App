import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe0p1KVnSCogWyKdJOPUZWat9LNsgxrbA",
  authDomain: "crypto-app-fbc1c.firebaseapp.com",
  projectId: "crypto-app-fbc1c",
  storageBucket: "crypto-app-fbc1c.firebasestorage.app",
  messagingSenderId: "819845403997",
  appId: "1:819845403997:web:a412e1cd1e79a17e8944b4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, passowrd) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, passowrd);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    alert("Couldn't create user", error);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(email, password);
    console.log("Logged in successfully", res.user);
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Couldn't log in", error);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
