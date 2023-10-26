// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHx8l4Gnf8eMt-LO9c2WZ9NNaVKXpxf_A",
  authDomain: "fireprac-aade2.firebaseapp.com",
  projectId: "fireprac-aade2",
  storageBucket: "fireprac-aade2.appspot.com",
  messagingSenderId: "512031307513",
  appId: "1:512031307513:web:41ed7fc5ec61dd937a1428",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
