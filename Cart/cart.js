$(window).on("load", function () {
  setTimeout(function () {
    $(".preloader").fadeOut(700);
  }, 800);
});

$(document).ready(function () {
  let isLogin = localStorage.getItem("loggedIn");
  if (isLogin !== null) {
    $(".user").attr("id", "u-icon");
    $(".content").css("display", "none");
    return;
  } else {
    $(".shop-title").css("display", "none");
    $(".con-2").css("display", "none");
    $(".content").append(`<div class="not-log">
      <div class="card-log">
        <h1>Sorry You Need to Login</h1>
        <a class="goLog" href="../Login/login.html">Go to Login Page</a>
        <a href="../HomePage/index.html" class="continue">
          <i class="bx bxs-chevrons-left"></i>
          Return to Home Page
        </a>
      </div>
    </div>`);
  }
});

const other = document.querySelector(".other-link");
const dropMenu = document.querySelector(".drop-menu");
other.addEventListener("mouseenter", () => {
  dropMenu.style.display = "flex";
});

dropMenu.addEventListener("mouseleave", () => {
  dropMenu.style.display = "none";
});

// add
$(document).ready(function () {
  if (typeof Storage !== "undefined") {
    var currentQuantity = localStorage.getItem("cartQuantity");

    if (currentQuantity !== null) {
      $("#cart-icon").attr("data-quantity", currentQuantity);
    }
  } else {
    console.log("Browser tidak mendukung penyimpanan lokal (localStorage).");
  }
});

// tampilkan semua cart item
$(document).ready(function () {
  var currentQuantity = localStorage.getItem("cartQuantity");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  function displayCartItems() {
    $(".ord-con").html("");
    currentQuantity = localStorage.getItem("cartQuantity");
    if (currentQuantity === "0" || currentQuantity === null) {
      $(".ord-con").append(`<h1 class="empty-title">Cart Still Empty</h1>`);
      return;
    }

    cartItems.forEach(function (item, index) {
      let totalPrice = item.price * item.quantity;
      $.getJSON("../data.json", function (data) {
        var selectedData = data.find(function (item2) {
          return item2.id == item.id;
        });

        if (selectedData !== undefined) {
          let cartItemHTML =
            `<div class="ord-card" data-index=` +
            index +
            `>
                    <div class="img-ord">
                        <img src="${selectedData.url}" alt="${selectedData.nama}" />
                        <p>${selectedData.nama}</p>
                    </div>
                    <p class="price-ord">Rp. ${item.price}.000</p>
                    <div class="qty-card">
                        <i class="kurang bx bx-minus"></i>
                        <p class="qty-ord">${item.quantity}</p>
                        <i class="nambah bx bx-plus"></i>
                    </div>
                    <p class="priceT-ord">Rp. ${totalPrice}.000</p>
                </div>`;

          $(".ord-con").append(cartItemHTML);
        } else {
          // Menampilkan pesan jika data tidak ditemukan
          $(".detail-pro").html(
            "<p>Data dengan ID tersebut tidak ditemukan.</p>"
          );
        }
      });
    });
  }

  displayCartItems();

  function displayOrderSum() {
    let totalPrice = localStorage.getItem("totalPrice");
    if (totalPrice === null) {
      totalPrice = "0";
    }
    $(".sum-ord").html("");
    let ordHtml =
      `
  <div class="order-sum">
    <h1 class="ord-title-sum">Order Summary</h1>
    <div class="subtotal">
      <p>Subtotal</p>
      <p>Rp. ` +
      totalPrice +
      `.000</p>
    </div>
    <div class="shipping">
      <p>Shipping</p>
      <p>Free</p>
    </div>

    <div class="total">
      <h1>Total</h1>
      <p>Rp. ` +
      totalPrice +
      `.000</p>
    </div>
    <p class="cek-ot">Check Out</p>
  </div>
  `;
    $(".sum-ord").append(ordHtml);
  }
  displayOrderSum();

  $(document).on("click", ".nambah", function () {
    var currentQuantity = parseInt($("#cart-icon").attr("data-quantity"));
    var newQuantity = currentQuantity + 1;
    $("#cart-icon").attr("data-quantity", newQuantity);
    localStorage.setItem("cartQuantity", newQuantity);
    var totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
    var index = $(this).closest(".ord-card").data("index");
    cartItems[index].quantity++;
    totalPrice += cartItems[index].price;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);
    displayCartItems();
    displayOrderSum();
  });

  // Handle click on minus button
  $(document).on("click", ".kurang", function () {
    var currentQuantity = parseInt($("#cart-icon").attr("data-quantity"));
    var newQuantity = currentQuantity - 1;
    var totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
    $("#cart-icon").attr("data-quantity", newQuantity);
    localStorage.setItem("cartQuantity", newQuantity);
    var index = $(this).closest(".ord-card").data("index");
    cartItems[index].quantity--;
    totalPrice -= cartItems[index].price;
    console.log(cartItems[index].price);
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1); // Remove item from array if quantity is zero or negative
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);
    displayCartItems();
    displayOrderSum();
  });
});
