// Firebase connection
import { auth, db } from "./firebase.js";


import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";


import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



const ordersList = document.getElementById("ordersList");



onAuthStateChanged(auth, (user) => {


    if (user) {


        const ordersQuery = query(

            collection(db, "orders"),

            where("userId", "==", user.uid),

            orderBy("createdAt", "desc")

        );



        onSnapshot(ordersQuery, (snapshot) => {


            ordersList.innerHTML = "";



            if (snapshot.empty) {


                ordersList.innerHTML =
                "<p>No orders found yet.</p>";


                return;

            }



            snapshot.forEach((doc) => {


                const order = doc.data();



                ordersList.innerHTML += `

                <div class="feature-card">


                    <h3>${order.giftCard}</h3>


                    <p>
                    Amount: ${order.amount}
                    </p>


                    <p>
                    Status: ${order.status}
                    </p>


                    <p>
                    Submitted by: ${order.userEmail}
                    </p>


                </div>

                `;


            });



        });



    } else {


        window.location.href = "login.html";


    }


});
