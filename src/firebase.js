// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLrt7PGBHqMMWPFBjSehG2_VUCTjTpEdA", // **SUBSTITUA!**
  authDomain: "plano-de-leitura-da-bibl-f6ba6.firebaseapp.com", // **SUBSTITUA!**
  projectId: "plano-de-leitura-da-bibl-f6ba6", // **SUBSTITUA!**
  storageBucket: "plano-de-leitura-da-bibl-f6ba6.firebasestorage.app", // **SUBSTITUA!**
  messagingSenderId: "135345882775", // **SUBSTITUA!**
  appId: "1:135345882775:web:c92debce8bf124d8854bd2", // **SUBSTITUA!**
  measurementId: "G-QN4HV3NFFX" // **SUBSTITUA!**
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
