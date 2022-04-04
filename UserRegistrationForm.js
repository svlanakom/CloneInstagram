import Form from "./Form.js";

export default class UserRegistrationForm extends Form {
    constructor(elem, fields, errorElements, users) {
        super(elem, fields, errorElements);
        this.elem.addEventListener("submit", (event) => this.submit(event));
        this.fields.email.addEventListener("input", () => {

            this.errorElements.email.textContent = "";
            this.isEmailUsed()
        });
        this.fields.password.addEventListener("input", () => {
            this.errorElements.password.textContent = "";
            this.digitsOnlyPassword();
            this.minmaxLengthPassword();
        });
       
        this.fields.passwordConfirm.addEventListener("input", () => {
            this.errorElements.passwordConfirm.textContent = "";
            this.passwordMatching()
        }); 
        this.users = users;
    }

    digitsOnlyPassword() {
       
        if (/^\d+$/.test(this.fields.password.value))
            return true;
        this.errorElements.password.textContent += "Password must be digits only!";
        return false;
    }
    minmaxLengthPassword(){
       
      
        if (this.fields.password.value.length >= 3 && this.fields.password.value.length <= 10)
            return true;
        this.errorElements.password.textContent += "Password must be 3- 10 symbol!";
        return false;
        

    }


    passwordMatching() {
       
        if (this.fields.password.value === this.fields.passwordConfirm.value)
            return true;
        this.errorElements.passwordConfirm.textContent += "Passwords do not match!";
        return false;
    }

    isEmailUsed() {
        
        if (Object.keys(this.users.get(this.fields.email.value)).length === 0)
            return true;
        this.errorElements.email.textContent += "This email used!";
        return false;
    };

    

    submit(event) {
        event.preventDefault();

        console.log("start");

        if (this.fields.password.value !== this.fields.passwordConfirm.value ||
            Object.keys(this.users.get(this.fields.email.value)).length !== 0)
            return false;

        const formData = [...new FormData(this.elem)];

        const newFormData = formData.reduce(
            (acc, [field, value]) => ({ ...acc, [field]: value }),
            {}
        );

        this.users.add(newFormData["email"], newFormData);
        console.log("end");
        this.clearInput();
        // updateTable();
    }
}