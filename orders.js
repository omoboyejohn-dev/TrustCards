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


                let currencySymbol = "";

                if(order.currency === "USD"){
                    currencySymbol = "$";
                }

                if(order.currency === "NGN"){
                    currencySymbol = "₦";
                }



                let statusClass = "pending";


                if(order.status === "Approved"){
                    statusClass = "approved";
                }


                if(order.status === "Rejected"){
                    statusClass = "rejected";
                }



                ordersList.innerHTML += `


                <div class="feature-card">


                    <h3>
                    🎁 ${order.giftCard}
                    </h3>


                    <p>
                    🌍 Country: ${order.country}
                    </p>


                    <p>
                    💵 Amount: ${currencySymbol}${order.amount}
                    </p>


                    <p>
                    💳 Code: ${order.cardCode}
                    </p>


                    <p class="${statusClass}">
                    Status: ${order.status}
                    </p>



                    <p>
                    📸 Card Images:
                    </p>


                    <a href="${order.frontImageURL}" target="_blank">
                    View Front Image
                    </a>


                    <br>


                    <a href="${order.backImageURL}" target="_blank">
                    View Back Image
                    </a>


                </div>


                `;


            });



        });



    } else {


        window.location.href = "login.html";


    }


});
