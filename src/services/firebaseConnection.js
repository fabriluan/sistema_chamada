import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHdUD1X7LSFCE7FMeZopB_HMTPCHKzNys",
  authDomain: "reteste-528e5.firebaseapp.com",
  projectId: "reteste-528e5",
  storageBucket: "reteste-528e5.appspot.com",
  messagingSenderId: "96859239305",
  appId: "1:96859239305:web:fc815e12536a781506a758",
  measurementId: "G-4TV12818JY"
};
// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { db , auth, storage };
