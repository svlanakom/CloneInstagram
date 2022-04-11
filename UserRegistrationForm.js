import Form from "./Form.js";

export default class UserRegistrationForm extends Form {
  constructor(elem, fields, users) {
    super(elem, fields);
    this.elem.addEventListener("submit", (event) => this.submit(event));
    this.users = users;
  }

  isValidEmail() {
    let isValid = true;
    this.fields.email.nextElementSibling.textContent = "";
    if (Object.keys(this.users.get(this.fields.email.value)).length !== 0) {
      this.fields.email.nextElementSibling.textContent = "This email used!";
      isValid = false;
    }
    // if (this.fields.email.value[0] !== this.fields.email.value[0].toUpperCase()) {
    //   this.fields.email.nextElementSibling.textContent += "Email must be start with uppercase!";
    //   isValid = false;
    // }
    return isValid;
  }

 isValidPassword() {
   this.fields.passwordConfirm.nextElementSibling.textContent = "";
   if(this.fields.password.value === this.fields.passwordConfirm.value)
   return true;
   this.fields.passwordConfirm.nextElementSibling.textContent = "Password do not much!"
   return false;
 }
 
  submit(event) {
    event.preventDefault();

    if (!this.isValidEmail() ||  !this.isValidPassword())
      return false;

    const formData = [...new FormData(this.elem)];

    const newFormData = formData.reduce(
      (acc, [field, value]) => ({ ...acc, [field]: value }),
      {}
    );

    this.users.add(newFormData["email"], newFormData);

    this.clearInput();
    // updateTable();
  }
}
