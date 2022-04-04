import Form from "./Form.js";


export default class UserLoginForm extends Form {
    constructor(elem, fields, errorElements, users) {
        super(elem, fields, errorElements);
        this.elem.addEventListener("submit", (event) => {this.submit(event)})
        this.users = users;
    }
    submit(event){
      if(event) event.preventDefault();
       


  let user = this.users.get(this.fields.email.value);

  if (Object.keys(user).length === 0 || 
     user["password"] !== this.fields.password.value) {
       this.errorElements.emailPassword.textContent = "Incorrect email or password";
       return false;
  
   
  } else {
    this.clearInput();
    return true;
   
    }
  }
}
