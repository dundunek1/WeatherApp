import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBR2VWPRSqtPU170bgaeeHIV4JPkVMNYN8",
  authDomain: "weatherapp-ideoproject.firebaseapp.com",
  databaseURL: "https://weatherapp-ideoproject-default-rtdb.firebaseio.com",
  projectId: "weatherapp-ideoproject",
  storageBucket: "weatherapp-ideoproject.appspot.com",
  messagingSenderId: "468831811549",
  appId: "1:468831811549:web:784264a1de7fd63972e834",
  measurementId: "G-2KR23SMK4V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { auth, database, analytics };
