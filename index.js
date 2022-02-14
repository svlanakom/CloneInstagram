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

}

emailInputElem.addEventListener("input", onEmailChange);
passwordInputElem.addEventListener("input", onPasswordChange);
userNameEl.addEventListener("input", onNameChange)

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
  if (passwordInputElem.value !== passwordInputElemConfirm.value) 
  return false;
  modalWindow.style.display = "block";
  mainForm.style.display = "none";

  const formData = [...new FormData(formElem)];
  
  const newFormData = formData.reduce(
    (acc, [field, value]) => ({ ...acc, [field]: value }),
    {}
  );
 console.log(newFormData)
  const all = getUsersfromLocalStorage()
  localStorage.setItem('users', JSON.stringify(newFormData));
  
 
};
formElem.addEventListener("submit", onSubmit);

function addStorages() {
  let usersAll = []
  const all = getUsersfromLocalStorage()
console.log(all);
 for( let i = 0; i < localStorage.length; i++ ){
  localStorage.key(i)
    console.log(localStorage.key(i));
   usersAll.push();
   
 }
 return usersAll;
 
}

addStorages()


function getUsersfromLocalStorage(){
  return JSON.parse(localStorage.getItem('users'))
 
}
getUsersfromLocalStorage()



// function clearStorage() {
//  localStorage.clear()
// }
// submitEl.addEventListener('click', clearStorage)

//  function changeHandler(){
//       localStorage.setItem(this.name, this.value)
//  }

//  function chekStorage() {
//   for (let i = 0; i < formFileds.length; i++) {
//     if(formFileds[i].type !== 'submit'){
//       formFileds[i].value = localStorage.getItem(formFileds[i].name);
//     }
//   }
//  }
//  function attachEvents();
 
// function attachEvents(){
//   for (let i = 0; i < formFileds.length; i++) {
//   formFileds[i].addEventListener('change', changeHandler)
//     }
 
// }
// chekStorage()
//  function handleChange() {
//     updateUa();
//  } 
 
// submitEl.addEventListener("click", handleChange);



//   const newFormData = formData.reduce(
//     (acc, [field, value]) => ({ ...acc, [field]: value }),
//     {}
//   );

// }

//  const getLocalStorageData = () => {
//    let newUser = []
//    for(let i = 0; i < localStorage.length; i++) {
//      localStorage.key(i)
//      newUser.push()
//    }

//    return newUser
//  }

// function addData (key, value) {
//   let newUser = []
//    newUser.push (value)
//    localStorage.setItem(key, JSON.stringify(newUser))
// }

// function addTodo (key, index, value) {
//   localStorage.setItem(`${key}${index}`, value)
// }

// function addTodo (key, value) {
//   let list = []

//   try {
//     list = JSON.parse(localStorage.getItem(key))
//   } catch (e) {
//     console.error(e)
//   }

//   list.push(value)
//   localStorage.setItem(key, JSON.stringify(list))
// }

// const formField = formElem.elements
// console.log (formField)

// submitEl.addEventListener('click', clearStorage);

// function clearStorage() {
//   localStorage.clear()

// }

// function changeHandler() {
//   localStorage.setItem(this.name, this.value);
// }

// function checkStorage() {
//   for (let i = 0; i < formField.length; i++) {
//     if (formField[i].type !== "submit") {
//       formField[i].value = localStorage.getItem(formField[i].name);
//     }
//   }
// }

// attachEvents ()
// function attachEvents (){
//   for (let i = 0; i < formField.length; i++) {
//     formField[i].addEventListener('change', changeHandler);
//   }
// }
// checkStorage();
