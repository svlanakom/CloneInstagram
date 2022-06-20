import Form from "./Form.js";
import { host } from "../config/constants.js";

export default class UserLoginForm extends Form {
    constructor(elem, fields, users) {
        super(elem, fields);
        this.elem.addEventListener("submit", (event) => this.submit(event));
        this.users = users;
    }

    async submit(event) {
        if (event) event.preventDefault();

        const formData = new FormData(this.elem);
        const newFormData = [...formData];
        const objFormData = newFormData.reduce(
            (acc, [field, value]) => ({ ...acc, [field]: value }),
            {}
        );

        let response = await fetch(`${host}/users/login`, {
            method: "post",
            body: JSON.stringify(objFormData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        let token = await response.text();

        if (!token)
            this.fields.password.nextElementSibling.textContent = "Incorrect email or password";
        return token;
    }
}