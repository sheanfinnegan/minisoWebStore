$(window).on("load", function () {
  setTimeout(function () {
    $(".preloader").fadeOut(700);
  }, 800);
});

$(document).ready(function () {
  let isLogin = localStorage.getItem("loggedIn");
  if (isLogin !== null) {
    var userDataJSON = localStorage.getItem("userData");
    var userData = JSON.parse(userDataJSON);
    $(".user").attr("id", "u-icon");
    $(".log-sec").html("");
    $(".log-sec").append(
      `
    <div class="card-hasLog">
        <i class="bx bx-user-circle"></i>
        <h2>User Information</h2>
        <h3>Username: ` +
        userData.username +
        `</h3>
        <h3>Email: ` +
        userData.email +
        `</h3>
        <button class="log-out">Log Out</button>
      </div>
    `
    );
    return;
  } else {
    $(".log-sec").html("");
    $(".log-sec").append(`
    <div class="login-card">
        <div class="log-title">
          <p>Welcome Back!</p>
          <p>Log in to Account</p>
        </div>
        <div class="reg">
          <p>Not A Member</p>
          <a href="../Register/register.html">Register</a>
        </div>
        <div class="form">
          <form action="../index.html" class="form-log">
            <div class="input uName">
              <p>Username :</p>
              <input
                type="text"
                placeholder="Enter your username..."
                required
              />
            </div>
            <div class="input mail">
              <p>Email :</p>
              <input type="email" placeholder="Enter your email..." required />
            </div>
            <div class="input pass">
              <p>Password :</p>
              <input
                class="passw"
                type="password"
                placeholder="Enter your password.."
                required
              />
              <i class="visible bx bx-low-vision"></i>
            </div>
            <div class="butt">
              <button type="submit" class="log-but">Log in</button>
            </div>
          </form>
        </div>
        <div class="alt-log">
          <div class="atas">
            <div class="garis-1"></div>
            <p>Or</p>
            <div class="garis-1"></div>
          </div>
          <div>
            <div class="gmb">
              <i class="bx bxl-google"></i>
              <i class="bx bxl-facebook-circle"></i>
              <i class="bx bxl-twitter"></i>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  const visIcon = document.querySelector(".visible");
  const input = document.querySelector(".passw");
  let isVis = false;

  $(".visible").click(function () {
    isVis = !isVis;
    if (isVis) {
      input.type = "text";
      visIcon.style.color = "black";
    } else {
      input.type = "password";
      visIcon.style.color = "gray";
    }
  });
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

  $(".log-but").click(function (e) {
    // e.preventDefault();
    var allFieldsFilled = true;
    $(".form-log input[required]").each(function () {
      if ($(this).val().trim() === "") {
        allFieldsFilled = false;
        return false; // Exit the loop early if any field is empty
      }
    });

    var uNameRegist = localStorage.getItem("username");
    var mailRegist = localStorage.getItem("email");
    var passRegist = localStorage.getItem("password");

    var username = $(".form-log .uName input").val();
    var email = $(".form-log .mail input").val();
    var password = $(".form-log .pass input").val();

    if (
      username !== uNameRegist ||
      email !== mailRegist ||
      password !== passRegist
    ) {
      $(".added").css("display", "flex");
      setTimeout(function () {
        $(".added").css("display", "none");
      }, 1300);
      e.preventDefault();
      return;
    } else {
      allFieldsFilled = true;
    }

    // If all required fields are filled out, set "loggedIn" flag
    if (allFieldsFilled) {
      localStorage.setItem("loggedIn", "true");
      $(".success-log").css("display", "flex");
      setTimeout(function () {
        $(".success-log").css("display", "none");
      }, 1300);
      e.preventDefault();
      setTimeout(function () {
        window.location.href = "../index.html";
      }, 1000);

      // Store the user data in local storage
      var userData = {
        username: username,
        email: email,
        password: password,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  });

  $(".log-out").click(function () {
    // localStorage.clear();
    localStorage.removeItem("loggedIn");
    $(".success-logout").css("display", "flex");
    setTimeout(function () {
      $(".success-logout").css("display", "none");
    }, 1300);
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 1000);
  });
});
