import Datalayer from "./Datalayer.js";
import UserRegistrationForm from "./UserRegistrationForm.js";
import UserLoginForm from "./UserLoginForm.js";

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
    passwordConfirm: passwordInputElemConfirm,
  },
  {
    username: nameErrorEl,
    email: emailErrorElem,
    password: passwordErrorEllem,
    passwordConfirm: passwordErrorConfirm,
  },
  Users
);

const loginForm = new UserLoginForm(
  document.querySelector(".login-form-login"),
  {
    email: document.querySelector(".form-input-login-email"),
    password: document.querySelector(".form-input-login-password"),
  },
  {
    emailPassword: document.querySelector(".error-text-login-password"),
  },
  Users
);
let userToDelete;
let userToEdit;

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
    if (user["hobby"].includes("sport"))
      document.querySelector("#edit-hobby-sport").checked = true;
    else document.querySelector("#edit-hobby-sport").checked = false;
    if (user["hobby"].includes("films"))
      document.querySelector("#edit-hobby-films").checked = true;
    else document.querySelector("#edit-hobby-films").checked = false;
    if (user["hobby"].includes("drowing"))
      document.querySelector("#edit-hobby-drowing").checked = true;
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
    else if (document.querySelector("#edit-sex-famale").checked)
      user["sex"] = "Famale";

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
}

buttonRegistration.addEventListener("click", toggbuttonleRegistration);

function toggbuttonleLogin() {
  mainForm.style.display = "none";
  mainLogin.style.display = "block";
  modalWindow.style.display = "none";
}

buttonLogin.addEventListener("click", toggbuttonleLogin);

const btnSubmitLogin = document.querySelector(".submit-button-login");
buttonLogin.addEventListener("click", () => {
  if (loginForm.submit()) {
    updateTable();
    mainForm.style.display = "none";
    mainLogin.style.style = "none";
    modalWindow.style.display = "block";
  }
});
