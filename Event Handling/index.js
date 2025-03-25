const form = document.getElementById("form");
const loginInput = document.getElementById("login");
const errorLogin = document.getElementById("error-login");
const emailInput = document.getElementById("email");
const errorEmail = document.getElementById("error-email");
const passInput = document.getElementById("password");
const errorPass = document.getElementById("error-password");

// ---------------------

loginInput.addEventListener("input", function () {
  validateLogin(loginInput, errorLogin);
});
// ---------------
emailInput.addEventListener("input", function () {
  validateEmail(emailInput, errorEmail);
});

// -----------------
passInput.addEventListener("input", function () {
  validatePassword(passInput, errorPass);
});
// ------------------
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateLogin(loginInput, errorLogin);
  validateEmail(emailInput, errorEmail);
  validatePassword(passInput, errorPass);
  let invalidInputs = document.querySelectorAll(".invalid");
  if (invalidInputs.length <= 0) {
    alert("submit");
  } else {
    console.log("dont work");
  }
});
// --------------------
function validateLogin(element, errorElement) {
  element.classList.remove("valid", "invalid");
  errorElement.style.display = "none";
  if (element.value.length > 6) {
    element.classList.add("valid");
  } else {
    element.classList.add("invalid");
    errorElement.style.display = "inline";
  }
}
function validateEmail(element, errorElement) {
  element.classList.remove("valid", "invalid");
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  errorElement.style.display = "none";
  if (validEmail.test(element.value)) {
    element.classList.add("valid");
  } else {
    element.classList.add("invalid");
    errorElement.style.display = "inline";
  }
}

function validatePassword(element, errorElement) {
  element.classList.remove("valid", "invalid");
  errorElement.style.display = "none";
  if (element.value.length > 6) {
    element.classList.add("valid");
  } else {
    element.classList.add("invalid");
    errorElement.style.display = "inline";
  }
}
