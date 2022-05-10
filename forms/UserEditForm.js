import Form from "./Form.js";

export default class UserEditForm extends Form {
    constructor(elem, fields, users) {
        super(elem, {});
        this.fields = fields;
        this.elem.addEventListener("submit", (event) => this.submit(event));
        this.users = users;
        this.user = {};
    }

    fill() {
        if (this.user["sex"]) {
            for (const key in this.fields.sex) {
                if (Object.hasOwnProperty.call(this.fields.sex, key)) {
                    const element = this.fields.sex[key];
                    if (element.value === this.user["sex"]) element.checked = true;
                    else element.checked = false;
                }
            }
        }

        if (this.user["hobby"]) {
            for (const key in this.fields.hobby) {
                if (Object.hasOwnProperty.call(this.fields.hobby, key)) {
                    const element = this.fields.hobby[key];
                    if (this.user["hobby"].includes(element.value)) element.checked = true;
                    else element.checked = false;
                }
            }
        }

        if (this.user["country"])
            this.fields.country.value = this.user["country"];
        else
            this.fields.country.value = "";

        if (this.user["birthdate"])
            this.fields.birthdate.value = new Date(this.user["birthdate"])
                .toISOString()
                .substring(0, 10);
        else
            this.fields.birthdate.value = "";
    }

    submit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const formJSON = Object.fromEntries(data.entries());
        formJSON.hobby = data.getAll('hobby');

        this.users.add(this.user["email"], { ...this.user, ...formJSON });

        this.clearInput();
    }

    clearInput() {
        for (const key in this.fields.sex) {
            if (Object.hasOwnProperty.call(this.fields.sex, key)) {
                const element = this.fields.sex[key];
                element.checked = false;
            }
        }

        for (const key in this.fields.hobby) {
            if (Object.hasOwnProperty.call(this.fields.hobby, key)) {
                const element = this.fields.hobby[key];
                element.checked = false;
            }
        }

        this.fields.country.value = "";
        this.fields.birthdate.value = "";

        this.user = {};
    }
}