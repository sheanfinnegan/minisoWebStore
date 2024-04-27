$(window).on("load", function () {
  setTimeout(function () {
    $(".preloader").fadeOut(700);
  }, 800);
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
});
