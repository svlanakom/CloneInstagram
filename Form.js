export default class Form {
  constructor(elem, fields) {
    this.elem = elem;
    this.fields = fields;
    for (const key in this.fields) {
      if (Object.hasOwnProperty.call(this.fields, key)) {
        const element = this.fields[key];
        element.addEventListener("input", () => {
          element.nextElementSibling.innerText = "";
          if (!element.checkValidity())
            element.nextElementSibling.innerText = element.dataset.errorMessage;
        });
      }
    }
  }
  clearInput() {
    for (const name in this.fields) {
      if (Object.hasOwnProperty.call(this.fields, name)) {
        this.fields[name].value = "";
      }
    }
  }
}
