export default class Form {
    constructor(elem, field, errorElements) {
        this.elem = elem;
        this.field = field;
        this.errorElements = errorElements;
    }
    clearInput() {
        for (const name in this.field) {
            if (Object.hasOwnProperty.call(this.field, name)) {
                this.field[name].value = '';
            }
        }

    }
    
}








