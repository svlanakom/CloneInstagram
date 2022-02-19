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
const mainLogin = document.querySelector(".main-form-login");
const submitLogin = document.querySelector(".submit-button-login");

const buttonRegistration = document.querySelector(".button-registration")
const buttonLogin = document.querySelector(".button-login")

function toggbuttonleRegistration(){
  mainForm.style.display = "block";
  mainLogin.style.display = "none";
}

buttonRegistration.addEventListener("click", toggbuttonleRegistration)


function toggbuttonlogin(){
  mainForm.style.display = "none";
  mainLogin.style.display = "block";
 }

 buttonLogin.addEventListener("click", toggbuttonlogin)

function onSubmitLogin(e){
  
  if (emailInputElem.value !== document.querySelector(".form-input-login-email")
   && passwordInputElem.value !== document.querySelector(".form-input-login-password")) {
     modalWindow.style.display = "block"
   mainLogin.style.display = "none"
   mainForm.style.display = "none"
   }
   return false
   
   
  
}

submitLogin.addEventListener('submit', onSubmitLogin)

const isRequired = (value) => (value ? undefined : "Requared");

const isEmail = (value) =>
  value.includes("@") ? undefined : "Should be an email";

const isEmailUsed = (value) => {
  const users = JSON.parse(localStorage.getItem("users"));
  return !users || !Object.keys(users).includes(value)
    ? undefined
    : "This email used";
};

const isMatch = (value) =>
  passwordInputElem.value === passwordInputElemConfirm.value
    ? undefined
    : "Passwords do not match";

const isNumberPassword = (value) =>
  /^\d+$/.test(value) ? undefined : "Should be a number";

const chekEmail = (value) => {
  const errorText = [isRequired, isEmail, isEmailUsed]
    .map((validator) => validator(value))
    .filter((errorText) => errorText)
    .join(", ");
  emailErrorElem.textContent = errorText;
  return !errorText;
};

const chekPassword = (value) => {
  const errorText = [isRequired, isNumberPassword]
    .map((validator) => validator(value))
    .filter((errorText) => errorText)
    .join(", ");
  passwordErrorEllem.textContent = errorText;
  return !errorText;
};

const checkPasswordConfirm = (value) => {
  const errorText = [isRequired, isMatch, isNumberPassword]
    .map((validator) => validator(value))
    .filter((errorText) => errorText)
    .join(", ");

  passwordErrorConfirm.textContent = errorText;
  return !errorText;
};

const onNameChange = (event) => {
  const errorText = [isRequired]
    .map((validator) => validator(event.target.value))
    .filter((errorText) => errorText)
    .join(", ");
  nameErrorEl.textContent = errorText;
  return !errorText;
};

const onEmailChange = (event) => {
  chekEmail(event.target.value);
};

const onPasswordChange = (event) => {
  chekPassword(event.target.value);
};

const onPasswordSubmitChange = (event) => {
  checkPasswordConfirm(event.target.value);
};

userNameEl.addEventListener("input", onNameChange);
emailInputElem.addEventListener("input", onEmailChange);
passwordInputElem.addEventListener("input", onPasswordChange);
passwordInputElemConfirm.addEventListener("input", onPasswordSubmitChange);



const onSubmit = (event) => {
  event.preventDefault();

  if (
    !chekEmail(emailInputElem.value) ||
    !chekPassword(passwordInputElem.value) ||
    !checkPasswordConfirm(passwordInputElemConfirm.value)
  )
    return false;

  modalWindow.style.display = "block";
  mainForm.style.display = "none";

  const formData = [...new FormData(formElem)];
  console.log(formData);
  const newFormData = formData.reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );
  // console.log(newFormData);
  // newFormData.isLogine = true;
  // console.log(newFormData.isLogine);

  const users = JSON.parse(localStorage.getItem("users"));
  console.log(users);
  if (!users) {
    localStorage.setItem(
      "users",
      JSON.stringify({ [newFormData.email]: newFormData })
    );
  } else {
    users[newFormData.email] = newFormData;
    localStorage.setItem("users", JSON.stringify(users));
  }
  updateTable();
};

formElem.addEventListener("submit", onSubmit);

function getUsersformLocalStorage() {
  return JSON.parse(localStorage.getItem("users"));
}

function updateTable() {
  const userData = getUsersformLocalStorage();
  console.log(userData);
  const userExist = Object.keys(userData);
  console.log(userExist);
  const list = document.querySelector(".list-container");

  for (let item of userExist) {
    list.innerHTML += `<div>${item}</div>
       <button class="button-delete">delete</button>
       <button class="button-edit">edit</button>`;
  }

const deleteUsersBtns = document.querySelectorAll(".button-delete");
for (const btn of deleteUsersBtns) {
  btn.addEventListener("click", handleDelete);
  }
}
const modal = document.querySelector(".modal-delete");

function handleDelete(event) {
  event.preventDefault();
  modal.style.display = "block";
}

function handleClose(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

window.addEventListener("click", handleClose);


