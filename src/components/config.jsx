// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzMYdK_CtduXAhovb5UGHczQbrdjLhW34",
  authDomain: "pkfiverr-750f3.firebaseapp.com",
  projectId: "pkfiverr-750f3",
  storageBucket: "pkfiverr-750f3.appspot.com",
  messagingSenderId: "942835851882",
  appId: "1:942835851882:web:660ae841c5c1f11e9fe013",
  measurementId: "G-G7KMT9BGRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);