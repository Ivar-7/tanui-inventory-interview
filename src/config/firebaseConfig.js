// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqiIZf7nywlq43-xCUdYI0c-aQE1EUyBo",
  authDomain: "tanui-inventory-df11c.firebaseapp.com",
  projectId: "tanui-inventory-df11c",
  storageBucket: "tanui-inventory-df11c.appspot.com",
  messagingSenderId: "752049904206",
  appId: "1:752049904206:web:d5bb9faa6fc454b099411f",
  measurementId: "G-B9TLWNGG7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export { db };