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

const visIcon = document.querySelector(".visible");
const input = document.querySelector(".passw");

let isVis = false;

visIcon.addEventListener("click", () => {
  isVis = !isVis;
  if (isVis) {
    input.type = "text";
    visIcon.style.color = "black";
  } else {
    input.type = "password";
    visIcon.style.color = "gray";
  }
});
