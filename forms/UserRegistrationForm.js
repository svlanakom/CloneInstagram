import Form from "./Form.js";

export default class UserRegistrationForm extends Form {
    constructor(elem, fields, users) {
        super(elem, fields);
        this.elem.addEventListener("submit", (event) => this.submit(event));
        this.users = users;
    }

   async isValidEmail() {
        let isValid = true;
        this.fields.email.nextElementSibling.textContent = "";
        const user = await this.users.get(this.fields.email.value)
        
        if (Object.keys(user).length !== 0) {
            this.fields.email.nextElementSibling.textContent += "This email used!";
            isValid = false;
        }
        return isValid;
    }

    isValidPassword() {
        this.fields.passwordConfirm.nextElementSibling.textContent = "";
        if (this.fields.password.value === this.fields.passwordConfirm.value)
            return true;
        this.fields.passwordConfirm.nextElementSibling.textContent = "Passwords do not match!";
        return false;
    }

    async submit(event) {
        event.preventDefault();

        if (!(await this.isValidEmail()) || !this.isValidPassword())
            return false;
       const formData = new FormData(this.elem);
        const newFormData = [...formData];
        const objFormData = newFormData.reduce(
            (acc, [field, value]) => ({ ...acc, [field]: value }),
            {}
        );
       

        // this.users.add(newFormData["email"], newFormData);
         this.users.add(objFormData);

        this.clearInput();
    }
}

