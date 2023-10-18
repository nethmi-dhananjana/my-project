const formBilling = document.getElementById("form-billing");
const billingOverlay = document.createElement("div");
billingOverlay.id = "billing-overlay";

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else {
    ready();  
}


function ready(){
    loadCart();
    billingOverlay.id = "billing-overlay";
    const formLink = document.getElementById("form-link");
    const form = document.getElementById('form-billing');
    var closeForm = document.getElementById("close-form");
    const formPayment = document.getElementById("form-payment");

    formLink.addEventListener("click", billingLinkClicked);
    billingOverlay.addEventListener("click", overlayClicked);
    form.addEventListener('submit', formSubmitted);
    form.addEventListener("reset", formReseted)
    closeForm.addEventListener("click", formClosed)
    formPayment.addEventListener("submit", formPaymentSubmitted)
  
}


function formClosed(event){
    billingOverlay.classList.remove("show");
    document.body.removeChild(billingOverlay);
    formBilling.style.display = "none";
}

function loadCart(){
    var cartCount = document.getElementById("cart-count");
    var subTotal = document.getElementById("sub-total");
    var deliFee = document.getElementById("deli-fee");
    var total = 0;
    cartCount.innerHTML = localStorage.getItem("itemCount");
    subTotal.innerHTML = localStorage.getItem("totalBill");
    var Fee = parseFloat(deliFee.innerText.replace("$", ""));
    var Sub = parseFloat(subTotal.innerText.replace("$", ""));
    total = Sub + Fee;
    total = Math.round(total * 100)/100;
    console.log(total)
    document.getElementById("bill-amount").innerText = "$"+total;
}   



function billingLinkClicked(event) {
    event.preventDefault();
    
    billingOverlay.classList.add("show");
    document.body.appendChild(billingOverlay);
    billingOverlay.appendChild(formBilling);
    
    formBilling.style.display = "block";
}



function overlayClicked(event) {
    if (event.target === billingOverlay) {
      billingOverlay.classList.remove("show");
      document.body.removeChild(billingOverlay);
      formBilling.style.display = "none";
    }
}

function formPaymentSubmitted(event){
    const formPayment = document.getElementById("form-payment");
    
    const cardNumber = formPayment.querySelector("#cnumber")
    const cardName = formPayment.querySelector("#cname")
    const cvc = formPayment.querySelector("#cvc")
    const expMonth = formPayment.querySelector("#expmonth")
    const expYear = formPayment.querySelector("#expyear")

    const monthValue = parseInt(expMonth.value.trim());
    const yearValue = parseInt(expYear.value.trim());

    event.preventDefault();

    if (cardNumber.value.trim() === '') {
        alert('Please enter your card number.');
        cardNumber.focus();
        return;
    }

    if (cardName.value.trim() === '') {
        alert('Please enter your name on your card.');
        cardName.focus();
        return;
    }

    if (cvc.value.trim() === '') {
        alert('Please enter your cvc.');
        cvc.focus();
        return;
    }

    if (expMonth.value.trim() === '') {
        alert('Please enter your epxiration month.');
        expMonth.focus();
        return;
    }else if (isNaN(monthValue)) {
        alert('Please enter valid numbers for expiration month.');
        return;
    }else if (monthValue < 1 || monthValue > 12 ) {
        alert('Please enter a valid month.');
        return;
    }

    if (expYear.value.trim() === '') {
        alert('Please enter your espiration year.');
        expYear.focus();
        return;
    }else if (isNaN(yearValue)) {
        alert('Please enter valid numbers for expiration year.');
        return;
    }

    var cardDetails = cardName.value + " | " + cardNumber.value + " | " + expMonth.value + "/" + expYear.value;
    document.getElementById("card-details").innerText = cardDetails;
    console.log(cardDetails)
    formPayment.reset();
}

function formSubmitted(event) {
    const form = document.getElementById('form-billing');

    const firstName = form.querySelector('#fname');
    const lastName = form.querySelector('#lname');
    const contactNo = form.querySelector('#contact');
    const email = form.querySelector('#email');
    const address = form.querySelector('#address');
    const city = form.querySelector('#city');
    const province = form.querySelector('#province');
    const day = form.querySelector('#day');
    const month = form.querySelector('#month');
    const year = form.querySelector('#year');

    const contactValue = parseInt(contactNo.value.trim());
    const dayValue = parseInt(day.value.trim());
    const monthValue = parseInt(month.value.trim());
    const yearValue = parseInt(year.value.trim());

    event.preventDefault();

    if (firstName.value.trim() === '') {
        alert('Please enter your first name.');
        firstName.focus();
        return;
    }

    if (lastName.value.trim() === '') {
        alert('Please enter your last name.');
        lastName.focus();
        return;
    }

    if (contactNo.value.trim() === '') {
        alert('Please enter your contact number.');
        contactNo.focus();
        return;
    }else if(isNaN(contactValue)){
        alert('Please enter a valid contact number.');
        return;
    }

    if (email.value.trim() === '') {
        alert('Please enter your email address.');
        email.focus();
        return;
    }

    if (address.value.trim() === '') {
        alert('Please enter your address.');
        address.focus();
        return;
    }

    if (city.value.trim() === '') {
        alert('Please enter your city.');
        city.focus();
        return;
    }

    if (province.value.trim() === '') {
        alert('Please select your province.');
        province.focus();
        return;
    }

    if (day.value.trim() === '' || month.value.trim() === '' || year.value.trim() === '') {
        alert('Please enter your date of birth.');
        day.focus();
        return;
    }else if (isNaN(dayValue) || isNaN(monthValue) || isNaN(yearValue)) {
        alert('Please enter valid numbers for day, month, and year.');
        return;
    }else if (dayValue < 1 || dayValue > 31 || monthValue < 1 || monthValue > 12 || yearValue < 1900 || yearValue > 2023) {
        alert('Please enter a valid date of birth.');
        return;
    }

    

    var userDetails = firstName.value + " " + lastName.value + " | " + address.value + " | " + contactNo.value;
    document.getElementById("user-details").innerText = userDetails;
    console.log(userDetails)
    form.reset();
}

function formReseted(event){
    const form = document.getElementById('form-billing');

    form.reset();
}
