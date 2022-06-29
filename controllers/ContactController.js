import { phone } from "../config/constants.js";

export default class ContactController {
    constructor() {
        this.load();
    }

    load() {
        document.querySelector("#phone").innerHTML += phone;
    }
}