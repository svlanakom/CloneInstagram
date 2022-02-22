import  Datalayer  from "./Datalayer.js";

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

console.log(Users)

let userToDelete;
let userToEdit;

const isRequired = (value) => (value ? undefined : "Requared");

const isEmail = (value) =>
  value.includes("@") ? undefined : "Should be an email";

const isEmailUsed = (value) => {
  return Object.keys(Users.get(value)).length === 0
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

  modalWindow.style.display = "none";
  mainForm.style.display = "block";
  mainLogin.style.display = "none";

  const formData = [...new FormData(formElem)];
  console.log(formData);
  const newFormData = formData.reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );

  Users.add(newFormData["email"], newFormData);

  // const users = getUsersformLocalStorage();
  // console.log(users);
  // if (!users) {
  //   localStorage.setItem(
  //     "users",
  //     JSON.stringify({ [newFormData.email]: newFormData })
  //   );
  // } else {
  //   users[newFormData.email] = newFormData;
  //   localStorage.setItem("users", JSON.stringify(users));
  // }
  clearInput();
  updateTable();
};

formElem.addEventListener("submit", onSubmit);

// function getUsersformLocalStorage() {
//   return JSON.parse(localStorage.getItem("users"));
// }

function updateTable() {
  // const userData = getUsersformLocalStorage();
  // const userExist = Object.keys(userData);
  // console.log(userExist);
  const list = document.querySelector(".list-container");
  list.innerHTML = "";
  for (const email in Users.getAll()) {
    list.innerHTML += `<div>${email}</div>
<button class="button-delete" id="${email}">delete</button>
<button class="button-edit" id="edit${email}">edit</button>`;
  }

  const deleteUsersBtns = document.querySelectorAll(".button-delete");
  for (const btn of deleteUsersBtns) {
    btn.addEventListener("click", handleDelete);
  }
}

function clearInput() {
  emailInputElem.value = "";
  passwordInputElem.value = "";
  passwordInputElemConfirm.value = "";
  userNameEl.value = "";
  emailErrorElem.textContent = "";
  passwordErrorEllem.textContent = "";
  passwordErrorConfirm.textContent = "";
  nameErrorEl.textContent = "";
  document.querySelector(".form-input-login-email").value = "";
  document.querySelector(".form-input-login-password").value = "";
  document.querySelector(".error-text-login-password").textContent = "";
  document.querySelector(".error-text-login-email").textContent = "";
}

const modalEdite = document.querySelector(".modal-edit")

function handleEdit(event) {
  userToEdit = event.target.id;
  modalEdite.style.display = "block";
}

function handleClose(e) {
  if (e.target == modalEdite) {
    userToEdit = undefined;
    modalEdite.style.display = "none";
  }

}
const editeUsers = document.querySelectorAll(".button-edit")
for (const btn of editeUsers) {
  btn.addEventListener("click", handleEdit);
}


const modal = document.querySelector(".modal-delete");

function handleDelete(event) {
  userToDelete = event.target.id;
  modal.style.display = "block";
}



function deleteUser() {
  if (userToDelete) {
    // let users = getUsersformLocalStorage();
    // if (users && Object.keys(users).includes(userToDelete)) {
    //   console.log(userToDelete)
    //   let newUsers = {};
    //   for (const key in users) {
    //     console.log(key)
    //     if (key !== userToDelete) {

    //       newUsers[key] = users[key];
    //       console.log(newUsers[key])
    //       console.log(users[key])
    //     }
    //   }
    //   localStorage.setItem("users", JSON.stringify(newUsers));
    //   console.log(newUsers)
      Users.delete(userToDelete);
      updateTable();
      userToDelete = undefined;
      modal.style.display = "none";
    // }
  }
}

const delButton = document.querySelector(".delete-confirmation-btn");

delButton.addEventListener("click", deleteUser);

window.addEventListener("click", handleClose);

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
  let loginPassword = document.querySelector(".form-input-login-password").value;

  let user = Users.get(loginEmail);

  if (user && user["password"] === loginPassword) {
    updateTable();
    clearInput();
    modalWindow.style.display = "block";
    mainLogin.style.display = "none";
    mainForm.style.display = "none"
  } else {
    document.querySelector(".error-text-login-password").textContent = "Incorrect email or password";
  }
}

document.querySelector(".login-form-login").addEventListener("submit", onSubmitLogin);
