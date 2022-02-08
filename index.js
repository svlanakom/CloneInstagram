const emailInputElem = document.querySelector("#email");
const passwordInputElem = document.querySelector("#password");
const passwordInputElemConfirm = document.querySelector("#password1");

const emailErrorElem = document.querySelector(".error-text_email");
const passwordErrorEllem = document.querySelector(".error-text_password");
const passwordErrorConfirm = document.querySelector(".error-text_password1");
const formElem = document.querySelector(".login-form");
const submitEl = document.querySelector(".submit-button");
const modalWindow = document.querySelector(".modal");
const mainForm = document.querySelector(".main-form");
const errorTextt = document.querySelector(".error-text");

const isRequired = (value) => (value ? undefined : "Requared");

const isEmail = (value) =>
  value.includes("@") ? undefined : "Should be an email";

const onEmailChange = (event) => {
  const errorText = [isRequired, isEmail]
    .map((validator) => validator(event.target.value))
    .filter((errorText) => errorText)
    .join(", ");

  emailErrorElem.textContent = errorText;
};

const isNumberPassword = (value) =>
  /^\d+$/.test(value) ? undefined : "Should be a number";

const onPasswordChange = (event) => {
  const errorText = [isRequired, isNumberPassword]
    .map((validator) => validator(event.target.value))
    .filter((errorText) => errorText)
    .join(", ");
  passwordErrorEllem.textContent = errorText;
};
emailInputElem.addEventListener("input", onEmailChange);
passwordInputElem.addEventListener("input", onPasswordChange);

const isMatch = (value) =>
  passwordInputElem.value === passwordInputElemConfirm.value
    ? undefined
    : "Passwords do not match";

const chekPassword = (event) => {
  const errorText = [isRequired, isMatch]
    .map((validator) => validator(event.target.value))
    .filter((errorText) => errorText)
    .join(", ");
  passwordErrorConfirm.textContent = errorText;
};
passwordInputElemConfirm.addEventListener("input", chekPassword);

const onSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem("email", emailInputElem.value);
  localStorage.setItem("password", passwordInputElem.value);

  // modalWindow.style.display = "block";
  // mainForm.style.display = "none";
};
formElem.addEventListener("submit", onSubmit);
