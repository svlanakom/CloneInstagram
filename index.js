const emailInputElem = document.querySelector("#email");
const passwordInputElem = document.querySelector("#password");
const passwordInputElemConfirm = document.querySelector("#password1");
const userNameEl = document.querySelector("#userName");
const emailErrorElem = document.querySelector(".error-text_email");
const passwordErrorEllem = document.querySelector(".error-text_password");
const passwordErrorConfirm = document.querySelector(".error-text_password1");
const nameErrorEl = document.querySelector(".error-text_name");
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

const onNameChange = (event) => {
  const errorText = [isRequired]
    .map((validator) => validator(event.target.value))
    .filter((errorText) => errorText)
    .join(", ");
  nameErrorEl.textContent = errorText;
};

emailInputElem.addEventListener("input", onEmailChange);
passwordInputElem.addEventListener("input", onPasswordChange);
userNameEl.addEventListener("input", onNameChange);

const isMatch = (value) =>
  passwordInputElem.value === passwordInputElemConfirm.value
    ? undefined
    : "Passwords do not match";

const chekPassword = (event) => {
  const errorText = [isRequired, isMatch, isNumberPassword]
    .map((validator) => validator(event.target.value))
    .filter((errorText) => errorText)
    .join(", ");
  passwordErrorConfirm.textContent = errorText;
};
passwordInputElemConfirm.addEventListener("input", chekPassword);

const onSubmit = (event) => {
  event.preventDefault();

  if (passwordInputElem.value !== passwordInputElemConfirm.value) return false;

  modalWindow.style.display = "block";
  mainForm.style.display = "none";

  const formData = [...new FormData(formElem)];
  console.log(formData);
  const newFormData = formData.reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );
  newFormData.isLogine = true;

  console.log(newFormData.email);

  const users = JSON.parse(localStorage.getItem("users"));

  if (!users) {
    localStorage.setItem(
      "users",
      JSON.stringify({ [newFormData.email]: newFormData })
    );
  } else {
    users[newFormData.email] = newFormData;
    localStorage.setItem("users", JSON.stringify(users));
  }
};
formElem.addEventListener("submit", onSubmit);

function getUsersfromLocalStorage() {
  return JSON.parse(localStorage.getItem("users"));
}


// class form {
//     constructor(email, password){
//         this.email = email;
//         this.password = password;
//         this.userData ={
//             [this.email]:{
//                 password: this.password,
//                 isLogin: this.isLogin

//             }}
//           this.isUser = this.chekUser();

//     }
//     chekUser(){
//         let userData = user.getUsersfromLocalStorage();
//         let userExist = Object.keys(userData).includes(this.email)
//         return userExist;
//     }
//     IsEmptyInputData(inputValue) {
//         return inputValue.length === 0;
//     }
// }
