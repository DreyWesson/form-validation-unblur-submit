const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

// const usernameValue = username.value.trim();
// const emailValue = email.value.trim();
// const password1Value = password1.value.trim();
// const password2Value = password2.value.trim();

username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
password1.addEventListener("blur", validatePassword1);
password2.addEventListener("blur", validatePassword2);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  isValid();
});

function isValid() {
  validateAllOnSubmit();
  if (!validateAllOnSubmit()) return;
  else return form.submit();
}

function validateAllOnSubmit() {
  if (
    validateUsername() &&
    validateEmail() &&
    validatePassword1() &&
    validatePassword2()
  )
    return true;
  else {
    validateUsername();
    validateEmail();
    validatePassword1();
    validatePassword2();
    return false;
  }
}

function validateUsername() {
  if (username.value.trim() == "")
    setErrorFor(username, "Username cannot be blank");
  else {
    setSuccessFor(username);
    return true;
  }
}

function validateEmail() {
  if (email.value.trim() === "") setErrorFor(email, "Email can't be blank");
  else if (!isEmail(email.value.trim()))
    setErrorFor(email, "Enter a valid email");
  else {
    setSuccessFor(email);
    return true;
  }
}

function validatePassword1() {
  if (password1.value.trim() == "")
    setErrorFor(password1, "Password cannot be blank");
  else if (!isPassword(password1.value.trim()))
    setErrorFor(password1, "Your password is too weak");
  else {
    setSuccessFor(password1);
    return true;
  }
}

function validatePassword2() {
  if (password2.value.trim() == "")
    setErrorFor(password2, "Password cannot be blank");
  else if (!isPassword(password2.value.trim()))
    setErrorFor(password2, "Your password is too weak");
  else if (password2.value.trim() != password1.value.trim())
    setErrorFor(password2, "Password doesn't match");
  else {
    setSuccessFor(password2);
    return true;
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement; //.form-control
  const small = formControl.querySelector("small");
  // Add error message inside small tag
  small.innerText = message;
  // add error class
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement; //.form-control
  // add success class
  formControl.className = "form-control success";
}

function isEmail(email) {
  let regex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return regex.test(email);
}
function isPassword(password1) {
  let regex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
  return regex.test(password1);
}
