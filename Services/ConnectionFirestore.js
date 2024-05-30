// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIInK1qGaxn_4Ww3m_rQY0ZNr-EIQJRY0",
  authDomain: "dbdrawer-68cd4.firebaseapp.com",
  projectId: "dbdrawer-68cd4",
  storageBucket: "dbdrawer-68cd4.appspot.com",
  messagingSenderId: "964421395177",
  appId: "1:964421395177:web:098d60de117dbbda008678"
};
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export{firestore};