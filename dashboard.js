import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");


// Check user login
onAuthStateChanged(auth, (user) => {

    if (user) {

        welcomeUser.innerHTML =
        "Welcome back: " + user.email;

    } else {

        window.location.href = "login.html";

    }

});


// Logout
if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        window.location.href = "login.html";

    });

}
