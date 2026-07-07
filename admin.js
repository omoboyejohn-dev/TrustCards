import { db } from "./firebase.js";


import {
    collection,
    onSnapshot,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";



const adminOrders = document.getElementById("adminOrders");



const ordersQuery = query(

    collection(db, "orders"),

    orderBy("createdAt", "desc")

);



onSnapshot(ordersQuery, (snapshot) => {


    adminOrders.innerHTML = "";



    if(snapshot.empty){

        adminOrders.innerHTML = "<p>No orders found.</p>";

        return;

    }



    snapshot.forEach((doc)=>{


        const order = doc.data();



        adminOrders.innerHTML += `


        <div class="feature-card">


        <h3>
        🎁 ${order.giftCard}
        </h3>


        <p>
        👤 User ID: ${order.userId}
        </p>


        <p>
        🌍 Country: ${order.country}
        </p>


        <p>
        💵 Amount: ${order.currency} ${order.amount}
        </p>


        <p>
        💳 Code: ${order.cardCode}
        </p>


        <p>
        🟡 Status: ${order.status || "Pending"}
        </p>



        <p>
        📸 Images:
        </p>


        <a href="${order.frontImageURL}" target="_blank">
        Front Image
        </a>


        <br>


        <a href="${order.backImageURL}" target="_blank">
        Back Image
        </a>



        </div>


        `;


    });



});
