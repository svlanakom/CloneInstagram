export default class Form {
    constructor(elem, fields, errorElements) {
        this.elem = elem;
        this.fields = fields;
        this.errorElements = errorElements;
    }

    clearInput() {
        for (const name in this.fields) {
            if (Object.hasOwnProperty.call(this.fields, name)) {
                this.fields[name].value = "";
            }
        }
        for (const name in this.errorElements) {
            if (Object.hasOwnProperty.call(this.errorElements, name)) {
                this.errorElements[name].textContent = "";
            }
        }
    }
}