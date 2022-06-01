import Form from "./Form.js";

export default class UserLoginForm extends Form {
    constructor(elem, fields, users) {
        super(elem, fields);
        this.elem.addEventListener("submit", (event) => this.submit(event));
        this.users = users;
    }

     async submit(event) {
        if (event) event.preventDefault();

        let user = await this.users.get(this.fields.email.value);

        if (Object.keys(user).length === 0 ||
            user["password"] !== this.fields.password.value) {
            this.fields.password.nextElementSibling.textContent = "Incorrect email or password";
            return false;
        }
        return user;
    }
}