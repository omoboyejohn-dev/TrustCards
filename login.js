import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


console.log("login.js loaded ✅");


const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("Login button pressed ✅");


    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        console.log("User logged in:", userCredential.user.email);


        alert("Login successful ✅");


        window.location.href = "dashboard.html";


    } catch (error) {

        console.error("Login error:", error);

        alert(error.message);

    }

});
