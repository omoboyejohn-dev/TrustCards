// Firebase connection
import { auth, db, storage } from "./firebase.js";


import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";


import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";



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


        const country = document.getElementById("country").value;

        const giftCard = document.getElementById("giftCard").value;

        const currency = document.getElementById("currency").value;

        const amount = document.getElementById("amount").value;

        const cardCode = document.getElementById("cardCode").value;


        const frontImage = document.getElementById("frontImage").files[0];

        const backImage = document.getElementById("backImage").files[0];


        const user = auth.currentUser;



        if (!user) {

            alert("Please login first");

            return;

        }



        try {


            // Upload front image

            const frontRef = ref(
                storage,
                `giftCards/${user.uid}/${Date.now()}-front`
            );


            await uploadBytes(frontRef, frontImage);


            const frontImageURL = await getDownloadURL(frontRef);




            // Upload back image

            const backRef = ref(
                storage,
                `giftCards/${user.uid}/${Date.now()}-back`
            );


            await uploadBytes(backRef, backImage);


            const backImageURL = await getDownloadURL(backRef);





            // Save order to Firestore

            await addDoc(collection(db, "orders"), {


                userId: user.uid,

                userEmail: user.email,


                country: country,

                giftCard: giftCard,

                currency: currency,

                amount: amount,


                cardCode: cardCode,


                frontImageURL: frontImageURL,

                backImageURL: backImageURL,


                status: "Pending",


                createdAt: serverTimestamp()


            });



            alert("Gift card submitted successfully ✅");



            window.location.href = "orders.html";



        } catch (error) {


            console.error(error);

            alert(error.message);


        }


    });


}
