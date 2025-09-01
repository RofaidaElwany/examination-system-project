
let login = document.getElementById("log-in");
let Email = document.getElementById("Email");
let Password = document.getElementById("pass");
let repass = document.getElementById("repass");
let firstname = document.getElementById("name");
let lastName = document.getElementById("last-Name");
let form = document.getElementById("form");
let error = document.getElementById("emailError");
let toggleIcon = document.getElementById("togglePassword");
let toggleIconRe = document.getElementById("togglePasswordRe");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});


let specialCharRegex = /[^a-zA-Z0-9]/;

login.addEventListener("click", function () {
  let email = Email.value.trim();
  let password = Password.value.trim();
  let confirmPassword = repass.value.trim();
  let fname = firstname.value.trim();
  let lname = lastName.value.trim();

  if (email === "" || password === "" || confirmPassword === "" || fname === "" || lname === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please fill in all the fields",
      confirmButtonText: "OK",
    });
    return;
  }

  if (password.length < 8 || confirmPassword.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Password must be at least 8 characters long",
      confirmButtonText: "OK",
    });
    return;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Passwords do not match",
      confirmButtonText: "OK",
    });
    return;
  }

  if (specialCharRegex.test(fname) || specialCharRegex.test(lname) || specialCharRegex.test(email.replace(/@|\./g, ""))) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Names and email should not contain special characters",
      confirmButtonText: "OK",
    });
    return;
  }

  if (!email.includes("@")) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter a valid email address",
      confirmButtonText: "OK",
    });
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let newUser = {
    email,
    password,
    repass: confirmPassword,
    firstname: fname,
    lastName: lname,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  Swal.fire({
    icon: "success",
    title: "Success",
    text: "Data saved successfully",
    confirmButtonText: "Great",
  }).then(() => {
    location.href = "../page2/index2.html";
  });
});

toggleIcon.addEventListener("click", () => {
  const show = Password.type === "password";
  Password.type = show ? "text" : "password";
  toggleIcon.className = ` ${show ? 'fa-eye-slash' : 'fa-eye'} toggle-password`;
});
toggleIconRe.addEventListener("click", () => {
  const show = repass.type === "password";
  repass.type = show ? "text" : "password";
  toggleIconRe.className = ` ${show ? 'fa-eye-slash' : 'fa-eye'} toggle-password`;
});