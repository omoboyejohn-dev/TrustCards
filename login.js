// Firebase connection
import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


console.log("Login JS connected ✅");


const loginForm = document.getElementById("loginForm");


if (loginForm) {

    console.log("Login form found ✅");


    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        console.log("Login button clicked");


        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;


        try {


            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


            alert("Login successful ✅");


            window.location.href = "dashboard.html";


        } catch (error) {


            console.log(error);

            alert(error.message);


        }

    });


} else {

    console.log("Login form not found ❌");

}
