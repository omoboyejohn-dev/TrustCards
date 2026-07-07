// Firebase connection
import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


// Get login form
const loginForm = document.getElementById("loginForm");


if (loginForm) {


    loginForm.addEventListener("submit", async (e) => {


        e.preventDefault();


        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        try {


            // Login user
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            alert("Login successful ✅");


            // Send to dashboard
            window.location.href = "dashboard.html";


        } catch (error) {


            alert(error.message);


        }


    });


}
