$(window).on("load", function () {
  setTimeout(function () {
    $(".preloader").fadeOut(700);
  }, 800);
});

$(document).ready(function () {
  let isLogin = localStorage.getItem("loggedIn");
  if (isLogin !== null) {
    $(".user").attr("id", "u-icon");
    return;
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

$(document).ready(function () {
  // Mengambil data keranjang belanja dari localStorage
  let isLogin = localStorage.getItem("loggedIn");
  if (isLogin !== null) {
    if (typeof Storage !== "undefined") {
      var currentQuantity = localStorage.getItem("cartQuantity");

      if (currentQuantity !== null) {
        $("#cart-icon").attr("data-quantity", currentQuantity);
      }
    } else {
      console.log("Browser tidak mendukung penyimpanan lokal (localStorage).");
    }
  }

  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  var totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;

  // Menangani klik pada tombol "Add to Cart"
  $(document).on("click", ".add", function () {
    let isLogin = localStorage.getItem("loggedIn");
    if (isLogin === null) {
      $(".not-log").css("display", "flex");
      return;
    }

    $(".added").css("display", "flex");
    $("#cart-icon").addClass("pulse-anim");
    var currentQuantity = parseInt($("#cart-icon").attr("data-quantity"));

    var newQuantity = currentQuantity + 1;
    $("#cart-icon").attr("data-quantity", newQuantity);
    localStorage.setItem("cartQuantity", newQuantity);

    var productId = $(this).data("id");
    var productName = $(this).data("name");
    var productPrice = parseFloat($(this).data("price"));

    var existingProduct = cartItems.find(function (item) {
      return item.id === productId;
    });

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cartItems.push({
        id: productId,
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }

    totalPrice += productPrice;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);

    setTimeout(function () {
      // console.log("Hello");
      $(".added").css("display", "none");
    }, 560);

    setTimeout(function () {
      $("#cart-icon").removeClass("pulse-anim");
    }, 300);
  });

  $(".back-text").click(function () {
    let prevPage = localStorage.getItem("prevPage");
    window.location.href = prevPage;
  });
});

$(document).ready(function () {
  var storedDataId = localStorage.getItem("storedDataId");

  if (storedDataId !== null) {
    $.getJSON("../data.json", function (data) {
      var selectedData = data.find(function (item) {
        return item.id == storedDataId;
      });

      // Memeriksa apakah data ditemukan
      if (selectedData !== undefined) {
        // Menampilkan data yang ditemukan
        $(".detail-pro").append(
          `<div class="det-img">
                <img src="` +
            selectedData.url +
            `" alt="" />
             </div>
            <div class="det-desc">
            <h1 class="det-title">` +
            selectedData.nama +
            `</h1>
            <div class="det-garis"></div>
            <h1 class="det-price">` +
            selectedData.price +
            `</h1>
                <p class="det-text">` +
            selectedData.deskripsi +
            `
         
            </p>
            <button class="add" data-id=` +
            selectedData.id +
            ` data-price=` +
            selectedData.price +
            ` data-name=` +
            selectedData.nama +
            `>Add to cart</button>
         </div>`
        );
      } else {
        // Menampilkan pesan jika data tidak ditemukan
        $(".detail-pro").html(
          "<p>Data dengan ID tersebut tidak ditemukan.</p>"
        );
      }
    });
  } else {
    // Menampilkan pesan jika tidak ada ID data yang tersimpan
    $(".detail-pro").html("<p>Tidak ada data yang tersimpan.</p>");
  }
});

$(document).ready(function () {
  $(".continue").click(function () {
    $(".not-log").css("display", "none");
  });
});
