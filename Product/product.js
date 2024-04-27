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

// top product
$(document).ready(function () {
  $.ajax({
    url: "../data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let featuredProducts = data.filter(function (product) {
        return product.top === "top";
      });
      $.each(featuredProducts, function (index, product) {
        $(".top-sec").append(
          `
        <div class="top-card">
        <div class="top-img">
          <img src=` +
            product.url +
            ` alt="" />
        </div>
        <div class="top-desc">
          <h1 class="top-title">MINISO'S ` +
            product.nama +
            `</h1>
          <p class="top-isi">
            ` +
            product.descSingkat +
            `
          </p>
          <button class="add add1" data-id=` +
            product.id +
            ` data-price=` +
            product.price +
            ` data-name=` +
            product.nama +
            `>Add To Cart</button>
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

// search
$(document).ready(function () {
  function searchPro() {
    let inputSc = $("#search-ipt").val();
    let inputReal = inputSc.trim();
    if (inputReal === "") {
      return;
    }
    $(".list").css("color", "black");
    $("#search-ipt").val("");
    $("#search-ipt").attr("placeholder", "Search our product...");

    $(".featured-sec").html("");
    $(".featured-sec").append(
      `
    <h1 class="res">Result for "` +
        inputSc +
        `"</h1>
    `
    );

    $.ajax({
      url: "../data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let featuredProducts = data.filter(function (product) {
          return product.nama.toLowerCase().includes(inputSc.toLowerCase());
        });
        console.log(featuredProducts);

        if (featuredProducts.length == 0) {
          $(".featured-sec").append(
            `<h1 class="pro-pro">Product Not Found</h1>`
          );
        } else {
          $.each(featuredProducts, function (index, product) {
            $(".featured-sec").append(
              `
            <div class="fP card" data-id=` +
                product.id +
                `>
              <div class="card-img">
                <img src=` +
                product.url +
                ` alt="" />
              </div>
              <div class="card-desc">
                <div class="kiri">
                  <p class="selectable" data-id=` +
                product.id +
                `>` +
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
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
      },
    });
  }

  $(document).on("click", ".sc-but", function () {
    searchPro();
  });

  $("#search-ipt").keypress(function (e) {
    if (e.keyCode === 13) {
      searchPro();
    }
  });
});

// card
$(document).ready(function () {
  $(document).on("click", ".selectable", function () {
    var selectedId = $(this).data("id");
    localStorage.setItem("storedDataId", selectedId);
    localStorage.setItem("prevPage", "../Product/product.html");
    window.location.href = "../DetailProduct/detail.html";
  });
});

// product All
$(document).ready(function () {
  $.ajax({
    url: "../data.json",
    type: "GET",
    dataType: "json",
    success: function (data) {
      let featuredProducts = data;
      $.each(featuredProducts, function (index, product) {
        $(".featured-sec").append(
          `
        <div class="fP card" data-id=` +
            product.id +
            `>
          <div class="card-img">
            <img src=` +
            product.url +
            ` alt="" />
          </div>
          <div class="card-desc">
            <div class="kiri">
              <p class="selectable" data-id=` +
            product.id +
            `>` +
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

// filter
$(document).ready(function () {
  $(document).on("click", ".list", function () {
    let cat = $(this).data("cat");
    $(".list").css("color", "black");
    $(this).css("color", "#e22d34");

    $(".featured-sec").html("");
    $.ajax({
      url: "../data.json",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let featuredProducts;
        if (cat !== "all") {
          featuredProducts = data.filter(function (product) {
            return product.category === cat;
          });
        } else {
          featuredProducts = data;
        }

        if (featuredProducts == null) {
          $(".featured-sec").append(
            `h1 class="cat-pro">Product Not Found</h1>`
          );
        } else if (cat === "all") {
          $.each(featuredProducts, function (index, product) {
            $(".featured-sec").append(
              `
        <div class="fP card" data-id=` +
                product.id +
                `>
          <div class="card-img">
            <img src=` +
                product.url +
                ` alt="" />
          </div>
          <div class="card-desc">
            <div class="kiri">
              <p class="selectable" data-id=` +
                product.id +
                `>` +
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
        } else {
          $.each(featuredProducts, function (index, product) {
            $(".featured-sec").append(
              `
        <div class="fP card" data-id=` +
                product.id +
                `>
          <div class="card-img">
            <img src=` +
                product.url +
                ` alt="" />
          </div>
          <div class="card-desc">
            <div class="kiri">
              <p class="selectable" data-id=` +
                product.id +
                `>` +
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
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
      },
    });
  });
});

// add
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
  });
});

$(document).ready(function () {
  $(".continue").click(function () {
    $(".not-log").css("display", "none");
  });
});
