// Import Firebase
import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


// Get register form
const registerForm = document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        // Get user input
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        try {

            // Create account in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


            const user = userCredential.user;


            // Save user details in Firestore
            await setDoc(doc(db, "users", user.uid), {

                name: name,
                email: email,
                createdAt: serverTimestamp()

            });


            alert("Account created successfully!");


            // Send user to dashboard
            window.location.href = "dashboard.html";


        } catch (error) {

            alert(error.message);

        }

    });

}
