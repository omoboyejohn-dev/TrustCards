// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

// Firebase Authentication
import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// Firestore Database
import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCux6cUBidBf17LDiKkzIiYM9ldPzM7jWw",
  authDomain: "trustcards.firebaseapp.com",
  projectId: "trustcards",
  storageBucket: "trustcards.firebasestorage.app",
  messagingSenderId: "43982879858",
  appId: "1:43982879858:web:1cfd343cde7494c80dd6eb",
  measurementId: "G-7EV1W7Z1B7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);


// Export so other files can use them
export { auth, db };
