let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let cartClose = document.querySelector('#close-cart');

cartIcon.onclick = () => {
  cart.classList.add('active');
}

cartClose.onclick = () => {
  cart.classList.remove('active');
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var cartRemoveButton = document.getElementsByClassName("cart-remove");
  console.log(cartRemoveButton);
  for (var i = 0; i < cartRemoveButton.length; i++) {
    var button = cartRemoveButton[i];
    button.addEventListener('click', cartRemoveItem);
  }


  var quantityInputs = document.getElementsByClassName("cart-quantity")
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCart = document.getElementsByClassName("add-to-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener('click', addCartClicked);
  }

  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);

  var checkButton = document.getElementsByClassName("btn-buy")[0];
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartCount = cartContent.childElementCount;

  if (cartCount === 0) {
    checkButton.style.display = "none";
  }else{
    checkButton.style.display = "flex";
  }

}

function buyButtonClicked(event) {
  var billAmount = document.getElementsByClassName("total-price")[0].innerText;
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartCount = cartContent.childElementCount;

  localStorage.setItem("totalBill", billAmount);
  localStorage.setItem("itemCount", cartCount);


  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild)
  }
  updateTotal();
  document.location.href = "./Checkout.html";
}

function cartRemoveItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function testing() {
  var billAmount = document.getElementById("txt").value;
  localStorage.setItem("textValue", billAmount);
  return false;
}
function addCartClicked(event) {
  var buttonClicked = event.target;
  var buyProducts = buttonClicked.closest(".product-box");
  var title = buyProducts.querySelector(".product-title").innerText;
  var price = buyProducts.querySelector(".product-price").innerText;
  var productImg = buyProducts.querySelector(".product-img").src;
  addProductToCart(title, price, productImg);
  console.log(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      var quantityElement = cartItemNames[i].parentElement.getElementsByClassName("cart-quantity")[0];
      quantityElement.value = parseInt(quantityElement.value) + 1;
      updateTotal();
      return;
    }
  }
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartBoxContent = `
    <img src="${productImg}" alt="PS5" class="cart-img">
    <div class="product-details">
      <h3 class="cart-product-title">${title}</h3>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash cart-remove' ></i>`
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", cartRemoveItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  updateTotal();
  var checkButton = document.getElementsByClassName("btn-buy")[0];
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartCount = cartContent.childElementCount;

  if (cartCount === 0) {
    checkButton.style.display = "none";
  }else{
    checkButton.style.display = "flex";
  }
}



  
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;

  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    total = Math.round(total * 100) / 100;
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}