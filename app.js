console.log("TrustCards app.js connected ✅");


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


// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {


    const registerForm = document.getElementById("registerForm");


    if (!registerForm) {
        console.log("Register form not found");
        return;
    }


    console.log("Register form found ✅");


    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        console.log("Register button clicked");


        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;


        try {


            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


            const user = userCredential.user;


            await setDoc(doc(db, "users", user.uid), {

                name: name,
                email: email,
                createdAt: serverTimestamp()

            });


            console.log("User saved successfully ✅");


            alert("Account created successfully!");


            window.location.href = "dashboard.html";


        } catch (error) {


            console.error("Firebase Error:", error);


            alert(error.message);


        }


    });


});
