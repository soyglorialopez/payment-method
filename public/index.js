'use strict'
// import key_public from "../config.js"
const stripe = Stripe("pk_test_51IKEXUAaUEwEM54I0syFKiEe03ekoGyXZJv8N5OwuELsRNFDZ6h7iErdegNzczwc46FEVCejw6drZFqQXdmcsLyY00o2u6cVSS");
const checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", function () {
    fetch("/create-checkout-session", {
     method: "POST",
   })
     .then(function (response) {
       return response.json();
     })
     .then(function (session) {
       return stripe.redirectToCheckout({ sessionId: session.id });
     })
     .then(function (result) {
       if (result.error) {
         alert(result.error.message);
       }
     })
     .catch(function (error) {
       console.error("Error:", error);
     });
 });