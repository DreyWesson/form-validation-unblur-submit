const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

let usernameValue, emailValue, password1Value, password2Value;
let emailPattern = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
let passwordPattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
password1.addEventListener("blur", validatePassword1);
password2.addEventListener("blur", validatePassword2);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

function submitForm() {
  // validateAllOnSubmit();
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
  usernameValue = username.value.trim();
  if (usernameValue == "")
    setErrorMessage(username, "Username cannot be blank");
  else {
    setSuccessMessage(username);
    return true;
  }
}

function validateEmail() {
  emailValue = email.value.trim();
  if (emailValue === "") setErrorMessage(email, "Email can't be blank");
  else if (!regexValidator(emailPattern, emailValue))
    setErrorMessage(email, "Enter a valid email");
  else {
    setSuccessMessage(email);
    return true;
  }
}

function validatePassword1() {
  password1Value = password1.value.trim();
  if (password1Value == "")
    setErrorMessage(password1, "Password cannot be blank");
  else if (!regexValidator(passwordPattern, password1Value))
    setErrorMessage(password1, "Your password is too weak");
  else {
    setSuccessMessage(password1);
    return true;
  }
}

function validatePassword2() {
  password1Value = password1.value.trim();
  password2Value = password2.value.trim();
  if (password2Value == "")
    setErrorMessage(password2, "Password cannot be blank");
  else if (!regexValidator(passwordPattern, password2Value))
    setErrorMessage(password2, "Your password is too weak");
  else if (password2Value != password1Value)
    setErrorMessage(password2, "Password doesn't match");
  else {
    setSuccessMessage(password2);
    return true;
  }
}

function regexValidator(pattern, input) {
  return pattern.test(input);
}

function setErrorMessage(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  small.innerText = message;
  formControl.className = "form-control error";
}

function setSuccessMessage(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
