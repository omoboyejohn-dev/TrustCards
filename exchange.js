// Firebase connection
import { auth, db } from "./firebase.js";


import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



// Get form
const exchangeForm = document.getElementById("exchangeForm");



onAuthStateChanged(auth, (user) => {


    if (!user) {

        window.location.href = "login.html";

    }


});



if (exchangeForm) {


    exchangeForm.addEventListener("submit", async (e) => {


        e.preventDefault();



        const giftCard = document.getElementById("giftCard").value;

        const amount = document.getElementById("amount").value;

        const cardCode = document.getElementById("cardCode").value;



        const user = auth.currentUser;



        if (!user) {

            alert("Please login first");

            return;

        }



        try {


            await addDoc(collection(db, "orders"), {


                userId: user.uid,

                userEmail: user.email,

                giftCard: giftCard,

                amount: amount,

                cardCode: cardCode,

                status: "Pending",

                createdAt: serverTimestamp()


            });



            alert("Gift card submitted successfully ✅");



            window.location.href = "dashboard.html";



        } catch (error) {


            console.error(error);

            alert(error.message);


        }



    });


}
