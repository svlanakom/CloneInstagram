import Datalayer from "./Datalayer.js";
import UserRegistrationForm from "./UserRegistrationForm.js";

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
const modalWindow = document.querySelector(".list-of-usrs");
const mainForm = document.querySelector(".main-form");
const errorTextt = document.querySelector(".error-text");
const mainLogin = document.querySelector(".main-form-login");
const submitLogin = document.querySelector(".submit-button-login");

const Users = new Datalayer("users");

const registrationForm = new UserRegistrationForm(
  formElem,
  {
    username: userNameEl,
    email: emailInputElem,
    password: passwordInputElem,
    passwordConfirm: passwordInputElemConfirm
  },
  {
    email: emailErrorElem,
    password: passwordErrorEllem,
    passwordConfirm: passwordErrorConfirm
  },
  Users
);

let userToDelete;
let userToEdit;

// const isRequired = (value) => (value ? undefined : "Requared");

// const isEmail = (value) =>
//   value.includes("@") ? undefined : "Should be an email";

// const isEmailUsed = (value) => {
//   return Object.keys(Users.get(value)).length === 0
//     ? undefined
//     : "This email used";
// };

// const isMatch = (value) =>
//   passwordInputElem.value === passwordInputElemConfirm.value
//     ? undefined
//     : "Passwords do not match";

// const isNumberPassword = (value) =>
//   /^\d+$/.test(value) ? undefined : "Should be a number";

// const chekEmail = (value) => {
//   const errorText = [isEmailUsed]
//     .map((validator) => validator(value))
//     .filter((errorText) => errorText)
//     .join(", ");
//   emailErrorElem.textContent = errorText;
//   return !errorText;
// };

// const chekPassword = (value) => {
//   const errorText = []
//     .map((validator) => validator(value))
//     .filter((errorText) => errorText)
//     .join(", ");
//   passwordErrorEllem.textContent = errorText;
//   return !errorText;
// };

// const checkPasswordConfirm = (value) => {
//   const errorText = [isMatch]
//     .map((validator) => validator(value))
//     .filter((errorText) => errorText)
//     .join(", ");

//   passwordErrorConfirm.textContent = errorText;
//   return !errorText;
// };

// const onNameChange = (event) => {
//   const errorText = []
//     .map((validator) => validator(event.target.value))
//     .filter((errorText) => errorText)
//     .join(", ");
//   nameErrorEl.textContent = errorText;
//   return !errorText;
// };

// const onEmailChange = (event) => {
//   chekEmail(event.target.value);
// };

// const onPasswordChange = (event) => {
//   chekPassword(event.target.value);
// };

// const onPasswordSubmitChange = (event) => {
//   checkPasswordConfirm(event.target.value);
// };

// userNameEl.addEventListener("input", onNameChange);
// emailInputElem.addEventListener("input", onEmailChange);
// passwordInputElem.addEventListener("input", onPasswordChange);
// passwordInputElemConfirm.addEventListener("input", onPasswordSubmitChange);

// const onSubmit = (event) => {
//   event.preventDefault();

//   if (
//     !chekEmail(emailInputElem.value) ||
//     !checkPasswordConfirm(passwordInputElemConfirm.value)
//   )
//     return false;

//   modalWindow.style.display = "none";
//   mainForm.style.display = "block";
//   mainLogin.style.display = "none";

//   const formData = [...new FormData(formElem)];

//   const newFormData = formData.reduce(
//     (acc, [field, value]) => ({ ...acc, [field]: value }),
//     {}
//   );

//   Users.add(newFormData["email"], newFormData);

//   clearInput();
//   updateTable();
// };

// formElem.addEventListener("submit", onSubmit);

// function getUsersformLocalStorage() {
//   return JSON.parse(localStorage.getItem("users"));
// }

function updateTable() {
  const list = document.querySelector(".list-container");
  list.innerHTML = "";
  for (const email in Users.getAll()) {
    list.innerHTML += `<div>${email}</div>
<button class="button-delete" id="delete-${email}">delete</button>
<button class="button-edit" id="edit-${email}">edit</button>`;
  }

  const deleteUsersBtns = document.querySelectorAll(".button-delete");
  for (const btn of deleteUsersBtns) {
    btn.addEventListener("click", handleDelete);
  }

  const editeUsers = document.querySelectorAll(".button-edit");
  for (const btn of editeUsers) {
    btn.addEventListener("click", handleEdit);
  }
}

function clearInput() {
  emailInputElem.value = "";
  passwordInputElem.value = "";
  passwordInputElemConfirm.value = "";
  userNameEl.value = "";
  emailErrorElem.textContent = "";
  // passwordErrorEllem.textContent = "";
  passwordErrorConfirm.textContent = "";
  // nameErrorEl.textContent = "";
  document.querySelector(".form-input-login-email").value = "";
  document.querySelector(".form-input-login-password").value = "";
  document.querySelector(".error-text-login-password").textContent = "";
  document.querySelector(".error-text-login-email").textContent = "";
}

const modal = document.querySelector(".modal-delete");
const modalEdite = document.querySelector(".modal-edit");

function handleDelete(event) {
  userToDelete = event.target.id.split("-")[1];
  modal.style.display = "block";
}

const delButton = document.querySelector(".delete-confirmation-btn");
delButton.addEventListener("click", deleteUser);

const editButton = document.querySelector(".edit-confirmation-btn");
editButton.addEventListener("click", editUser);

function handleEdit(event) {
  userToEdit = event.target.id.split("-")[1];
  let user = Users.get(userToEdit);
  if (Object.keys(user).length === 0) return;

  if (user["sex"]) {
    if (user["sex"] === "Male") {
      document.querySelector("#edit-sex-male").checked = true;
      document.querySelector("#edit-sex-famale").checked = false;
    } else if (user["sex"] === "Famale") {
      document.querySelector("#edit-sex-male").checked = false;
      document.querySelector("#edit-sex-famale").checked = true;
    }
  }

  if (user["hobby"]) {
    if (user["hobby"].includes("sport")) document.querySelector("#edit-hobby-sport").checked = true;
    else document.querySelector("#edit-hobby-sport").checked = false;
    if (user["hobby"].includes("films")) document.querySelector("#edit-hobby-films").checked = true;
    else document.querySelector("#edit-hobby-films").checked = false;
    if (user["hobby"].includes("drowing")) document.querySelector("#edit-hobby-drowing").checked = true;
    else document.querySelector("#edit-hobby-drowing").checked = false;
  }

  if (user["country"]) {
    document.querySelector("#edit-country").value = user["country"];
  }

  if (user["birthdate"]) {
    document.querySelector("#edit-birthdate").value = new Date(
      user["birthdate"]
    )
      .toISOString()
      .substring(0, 10);
  }

  modalEdite.style.display = "block";
  modalWindow.style.display = "none";
}

function handleClose(e) {
  if (e.target == modal) {
    userToDelete = undefined;
    modal.style.display = "none";
  }
  if (e.target == modalEdite) {
    userToEdit = undefined;
    modalEdite.style.display = "none";
    modalWindow.style.display = "block";
  }
}

window.addEventListener("click", handleClose);

function deleteUser() {
  if (userToDelete) {
    Users.delete(userToDelete);
    updateTable();
    userToDelete = undefined;
    modal.style.display = "none";
  }
}

function editUser() {
  if (userToEdit) {
    let user = Users.get(userToEdit);
    if (Object.keys(user).length === 0) return;

    if (document.querySelector("#edit-sex-male").checked) user["sex"] = "Male";
    else if (document.querySelector("#edit-sex-famale").checked) user["sex"] = "Famale";

    let hobby = [];
    if (document.querySelector("#edit-hobby-sport").checked)
      hobby.push("sport");
    if (document.querySelector("#edit-hobby-films").checked)
      hobby.push("films");
    if (document.querySelector("#edit-hobby-drowing").checked)
      hobby.push("drowing");
    if (hobby.length !== 0) user["hobby"] = hobby;

    user["country"] = document.querySelector("#edit-country").value;

    let bd = document.querySelector("#edit-birthdate").value;
    if (bd === "") console.log("empty date");
    else user["birthdate"] = new Date(bd);

    Users.add(userToEdit, user);
  }
}

const buttonRegistration = document.querySelector(".button-registration");
const buttonLogin = document.querySelector(".button-login");

function toggbuttonleRegistration() {
  mainForm.style.display = "block";
  mainLogin.style.display = "none";
  modalWindow.style.display = "none";
  clearInput();
}

buttonRegistration.addEventListener("click", toggbuttonleRegistration);

function toggbuttonleLogin() {
  mainForm.style.display = "none";
  mainLogin.style.display = "block";
  modalWindow.style.display = "none";
  clearInput();
}

buttonLogin.addEventListener("click", toggbuttonleLogin);

function onSubmitLogin(e) {
  e.preventDefault();

  let loginEmail = document.querySelector(".form-input-login-email").value;
  let loginPassword = document.querySelector(
    ".form-input-login-password"
  ).value;

  let user = Users.get(loginEmail);

  if (user && user["password"] === loginPassword) {
    updateTable();
    clearInput();
    modalWindow.style.display = "block";
    mainLogin.style.display = "none";
    mainForm.style.display = "none";
  } else {
    document.querySelector(".error-text-login-password").textContent =
      "Incorrect email or password";
  }
}

document
  .querySelector(".login-form-login")
  .addEventListener("submit", onSubmitLogin);