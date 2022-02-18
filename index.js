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
  console.log(newFormData);
  newFormData.isLogine = true;
  console.log(newFormData.isLogine);

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
};

formElem.addEventListener("submit", onSubmit);
function getUsersformLocalStorage() {
  return JSON.parse(localStorage.getItem("users"));
}

const userData = getUsersformLocalStorage();
console.log(userData);
const userExist = Object.keys(userData);
console.log(userExist);

const html = userExist
  .map(
    (item) => `<div>${item}</div><button class="button-delete">delete</button><button class="button-edit">edite</button>`
  )
  .join("");

const list = document.querySelector(".list-container");
list.innerHTML = html;


// const deleteUser = document.querySelector(".delete.button");
// const editUser = document.querySelector(".edit.button");

// function handleDelete(e){
//   e.preventDefault();
//   modalWindow()
// }

// deleteUser.addEventListener('click', handleDelete)


//  function modalWindow(){
   
//  }