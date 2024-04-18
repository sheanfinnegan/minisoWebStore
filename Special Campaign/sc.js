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

const img = ["Assets/sc-1.png", "Assets/sc-2.png", "Assets/sc-3.png"];

let cnt = 0;
let cnt2 = 0;
let clicked = 1;
let cntClick = 0;

const button1 = document.querySelector(".next");
const button2 = document.querySelector(".prev");
const divSc = document.querySelector(".sc");

button1.addEventListener("click", () => {
  console.log(cnt);
  cnt = (cnt + 1) % img.length;

  divSc.style.background = `url('${img[cnt]}') no-repeat center`;
  divSc.style.backgroundSize = "cover";
});

button2.addEventListener("click", () => {
  if (cnt == 0) {
    cntClick++;
    if (cntClick == 4) {
      clicked++;
      cntClick = 1;
    }
    cnt2 = cnt2 - 1;
    let cntMurni = cnt2 + img.length * clicked;
    divSc.style.background = `url('${img[cntMurni]}') no-repeat center`;
    divSc.style.backgroundSize = "cover";
  } else {
    cnt--;
    divSc.style.background = `url('${img[cnt]}') no-repeat center`;
    divSc.style.backgroundSize = "cover";
  }
});

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
