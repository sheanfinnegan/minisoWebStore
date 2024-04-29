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

const images = [
  "HomePage/Assets/ban-1.png",
  "HomePage/Assets/ban-2.png",
  "HomePage/Assets/ban-3.png",
];

let currIndex = 0;
function changeImage() {
  const imagePar = document.querySelector(".ban-left");
  setTimeout(() => {
    currIndex = (currIndex + 1) % images.length;
    imagePar.style.background = `url('${images[currIndex]}') no-repeat center`;
    imagePar.style.backgroundSize = "cover";
  }, 900);
}

const images2 = [
  "HomePage/Assets/slide-1.png",
  "HomePage/Assets/slide-2.png",
  "HomePage/Assets/slide-3.png",
];

let currIndex2 = 0;
function changeImage2() {
  const imagePar = document.querySelector(".slider .left");
  setTimeout(() => {
    currIndex2 = (currIndex2 + 1) % images2.length;
    imagePar.style.background = `url('${images2[currIndex2]}') no-repeat center`;
    imagePar.style.backgroundSize = "cover";
  }, 900);
}

setInterval(changeImage, 2000);
setInterval(changeImage2, 2000);

$(document).ready(function () {
  $.ajax({
    url: "data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let featuredProducts = data.filter(function (product) {
        return product.unique === "feature";
      });
      $.each(featuredProducts, function (index, product) {
        $(".featured-sec").append(
          `
        <div class="selectable fP card" data-id=` +
            product.id +
            `>
          <div class="card-img">
            <img src=` +
            product.url2 +
            ` alt="" />
          </div>
          <div class="card-desc">
            <div class="kiri">
              <p class="selectable" data-id=` +
            product.id +
            ` >` +
            product.nama +
            `</p>
              <p> Rp. ` +
            product.price +
            `</p>
            </div>

             <div class="kanan">
              <i class="add bx bx-basket" data-id=` +
            product.id +
            ` data-price=` +
            product.price +
            ` data-name=` +
            product.nama +
            `></i>
            </div>
          </div>
        </div>
        `
        );
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
    },
  });
});

$(document).ready(function () {
  $(document).on("click", ".selectable", function (event) {
    if (!event.target.classList.contains("add")) {
      var selectedId = $(this).data("id");
      localStorage.setItem("storedDataId", selectedId);
      localStorage.setItem("prevPage", "../index.html");
      window.location.href = "DetailProduct/detail.html";
    }
  });
});

$(document).ready(function () {
  $.ajax({
    url: "data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let featuredProducts = data.filter(function (product) {
        return product.unique === "weekly";
      });

      $.each(featuredProducts, function (index, product) {
        $(".week-sec").append(
          `
        <div class="selectable fP card" data-id=` +
            product.id +
            `>
          <div class="card-img">
            <img src=` +
            product.url2 +
            ` alt="" />
          </div>
          <div class="card-desc">
            <div class="kiri">
              <p class="selectable" data-id=` +
            product.id +
            `>` +
            product.nama +
            `</p>
              <p>Rp. ` +
            product.price +
            `</p>
            </div>

            <div class="kanan">
              <i class="add bx bx-basket" data-id=` +
            product.id +
            ` data-price=` +
            product.price +
            ` data-name=` +
            product.nama +
            `></i>
            </div>
          </div>
        </div>
        `
        );
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error:", textStatus, errorThrown);
    },
  });
});

$(document).ready(function () {
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

  $(document).on("click", ".add", function () {
    let isLogin = localStorage.getItem("loggedIn");
    if (isLogin === null) {
      $(".not-log").css("display", "flex");
      return;
    }

    $(".added").css("display", "flex"); // Mengubah display menjadi flex saat tombol diklik

    $("#cart-icon").addClass("pulse-anim");
    var currentQuantity = parseInt($("#cart-icon").attr("data-quantity"));

    var newQuantity = currentQuantity + 1;
    $("#cart-icon").attr("data-quantity", newQuantity);
    localStorage.setItem("cartQuantity", newQuantity);

    var productId = $(this).data("id");
    var productName = $(this).data("name");
    var productPrice = parseFloat($(this).data("price"));

    // Cek apakah produk sudah ada di keranjang
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
      $("#cart-icon").removeClass("pulse-anim");
    }, 300);

    setTimeout(function () {
      $(".added").css("display", "none");
    }, 560);
  });
});

$(document).ready(function () {
  $(".continue").click(function () {
    $(".not-log").css("display", "none");
  });
});
