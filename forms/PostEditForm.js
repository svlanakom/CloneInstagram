import { host } from "../config/constants.js";
import Form from "./Form.js";

export default class PostEditForm extends Form {
    constructor(elem, fields) {
        super(elem, {});
        this.fields = fields;
        this.elem.addEventListener("submit", (event) => this.submit(event));
        this.post = {};
    }

    fill() {
        this.fields.title.value = this.post.title;
        this.fields.description.value = this.post.description;
        this.fields.image.nextElementSibling.src = `${host}/${this.post.imagePath}`;
    }

    async submit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const formJSON = Object.fromEntries(data.entries());
        const token = localStorage.getItem('token');

        console.log(data);

        await fetch(`${host}/editpost/${this.post._id}`, {
            method: "post",
            body: data,
            headers: {
                "Authorization": token
            }
        });

        this.clearInput();
        history.back();
    }

    clearInput() {
        super.clearInput();
        this.post = {};
    }
}