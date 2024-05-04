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

  $(".reg-but").click(function (e) {
    var uNameRegist = localStorage.getItem("username");
    var mailRegist = localStorage.getItem("email");
    var passRegist = localStorage.getItem("password");

    console.log(uNameRegist, mailRegist, passRegist);

    if (uNameRegist !== null && mailRegist !== null && passRegist !== null) {
      if (
        $(".input-uName").val() === uNameRegist &&
        $(".input-mail").val() === mailRegist &&
        $(".input-pass").val() === passRegist
      ) {
        $(".added").css("display", "flex");
        setTimeout(function () {
          $(".added").css("display", "none");
        }, 1000);
        e.preventDefault();
        setTimeout(function () {
          window.location.href = "../Login/login.html";
        }, 1000);
        return;
      }
    }

    localStorage.clear();
    localStorage.setItem("username", $(".input-uName").val());
    localStorage.setItem("email", $(".input-mail").val());
    localStorage.setItem("password", $(".input-pass").val());
  });
});
