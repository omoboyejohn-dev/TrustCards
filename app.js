// Firebase connection
import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


// Register Form
const registerForm = document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener("submit", async function(e) {

        e.preventDefault();


        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        try {

            // Create Firebase account
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


            const user = userCredential.user;


            // Save user information to Firestore
            await setDoc(doc(db, "users", user.uid), {

                name: name,
                email: email,
                uid: user.uid,
                createdAt: serverTimestamp()

            });


            alert("TrustCards account created successfully ✅");


            // Go to dashboard
            window.location.href = "dashboard.html";


        } catch (error) {

            console.log(error);

            alert(error.message);

        }


    });

}
