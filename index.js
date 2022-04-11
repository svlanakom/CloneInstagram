import Datalayer from "./Datalayer.js";
import UserLoginForm from "./UserLoginForm.js";
import UserRegistrationForm from "./UserRegistrationForm.js";

// --- variables ---

const listOfUsersElem = document.querySelector(".list-of-users");

const modalDelete = document.querySelector(".modal-delete");
const modalEdite = document.querySelector(".modal-edit");

const btnSubmitLogin = document.querySelector(".login-submit-button");

const delButton = document.querySelector(".delete-confirmation-btn");
const editButton = document.querySelector(".edit-confirmation-btn");

const buttonRegistration = document.querySelector(".button-registration");
const buttonLogin = document.querySelector(".button-login");

const Users = new Datalayer("users");

const registrationForm = new UserRegistrationForm(
  document.querySelector(".registration-form"),
  {
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    passwordConfirm: document.querySelector("#password1")
  },
   Users
);

const loginForm = new UserLoginForm(
  document.querySelector(".login-form"),
  {
    email: document.querySelector("#email-login"),
    password: document.querySelector("#password-login")
  },
   Users
);

let userToDelete;
let userToEdit;

// --- /variables ---

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

function handleDelete(event) {
  userToDelete = event.target.id.split("-")[1];
  modalDelete.style.display = "block";
}

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
  } else {
    document.querySelector("#edit-sex-male").checked = false;
    document.querySelector("#edit-sex-famale").checked = false;
  }

  if (user["hobby"]) {
    if (user["hobby"].includes("sport")) document.querySelector("#edit-hobby-sport").checked = true;
    else document.querySelector("#edit-hobby-sport").checked = false;
    if (user["hobby"].includes("films")) document.querySelector("#edit-hobby-films").checked = true;
    else document.querySelector("#edit-hobby-films").checked = false;
    if (user["hobby"].includes("drowing")) document.querySelector("#edit-hobby-drowing").checked = true;
    else document.querySelector("#edit-hobby-drowing").checked = false;
  } else {
    document.querySelector("#edit-hobby-sport").checked = false;
    document.querySelector("#edit-hobby-films").checked = false;
    document.querySelector("#edit-hobby-drowing").checked = false;
  }

  if (user["country"]) {
    document.querySelector("#edit-country").value = user["country"];
  } else {
    document.querySelector("#edit-country").value = "";
  }

  if (user["birthdate"]) {
    document.querySelector("#edit-birthdate").value = new Date(
      user["birthdate"]
    )
      .toISOString()
      .substring(0, 10);
  } else {
    document.querySelector("#edit-birthdate").value = "";
  }

  modalEdite.style.display = "block";
}

function handleClose(event) {
  if (event.target == modalDelete) {
    userToDelete = undefined;
    modalDelete.style.display = "none";
    listOfUsersElem.style.display = "block";
  }
  if (event.target == modalEdite) {
    userToEdit = undefined;
    modalEdite.style.display = "none";
    listOfUsersElem.style.display = "block";
  }
}

function deleteUser(event) {
  if (userToDelete) {
    Users.delete(userToDelete);
    updateTable();
    userToDelete = undefined;
    modalDelete.style.display = "none";
  }
}

function editUser(event) {
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

    modalEdite.style.display = "none";
  }
}

window.addEventListener("click", handleClose);

delButton.addEventListener("click", deleteUser);
editButton.addEventListener("click", editUser);

// --- submit button login

function btnSubmitLoginClick(event) {
  if (loginForm.submit()) {
    updateTable();
    loginForm.clearInput();
    registrationForm.elem.parentElement.style.display = "none";
    loginForm.elem.parentElement.style.display = "none";
    listOfUsersElem.style.display = "block";
  }
}

btnSubmitLogin.addEventListener("click", btnSubmitLoginClick);

// --- /submit button login

// --- hedder ---

function toggleButtonRegistration(event) {
  registrationForm.elem.parentElement.style.display = "block";
  loginForm.elem.parentElement.style.display = "none";
  listOfUsersElem.style.display = "none";
}

function toggleButtonLogin(event) {
  registrationForm.elem.parentElement.style.display = "none";
  loginForm.elem.parentElement.style.display = "block";
  listOfUsersElem.style.display = "none";
}

buttonRegistration.addEventListener("click", toggleButtonRegistration);
buttonLogin.addEventListener("click", toggleButtonLogin);

// --- /hedder ---
