export default class Form {
  constructor(elem, fields) {
    this.elem = elem;
    this.fields = fields;
    for (const key in this.fields) {
      const element = this.fields[key];
      element.addEventListener("input", () => {
        element.nextElementSibling.innerText = "";
        if (!element.checkValidity())
          element.nextElementSibling.innerText = element.dataset.errorMessage;
      });
    }
  }

  clearInput() {
    for (const name in this.fields) {
      this.fields[name].value = "";
    }
    for (const name in this.errorElements) {
      console.log(name);
      this.errorElements[name].textContent = "";
    }
  }
}
