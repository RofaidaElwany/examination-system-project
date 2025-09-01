
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("pass");
let signInBtn = document.querySelector(".signIn");
let form = document.getElementById("form");
let toggleIcon = document.getElementById("togglePassword");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

signInBtn.addEventListener("click", function () {
  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();

  if (email === "" || password === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please fill in all fields",
      confirmButtonText: "OK",
    });
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let matchedUser = users.find(user => user.email === email && user.password === password);

  if (matchedUser) {
    Swal.fire({
      icon: "success",
      title: "Welcome " + matchedUser.firstname,
      text: "Login successful",
      confirmButtonText: "Continue",
    }).then(() => {

      location.href = "../page3/form.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password",
      confirmButtonText: "Try Again",
    });
  }
});

 toggleIcon.addEventListener("click", () => {
  const show = passwordInput.type === "password";
  passwordInput.type = show ? "text" : "password";
  toggleIcon.className = ` ${show ? 'fa-eye-slash' : 'fa-eye'} toggle-password`;
});