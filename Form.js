export default class Form {
  constructor(elem, fields, errorElements) {
    this.elem = elem;
    this.fields = fields;
    this.errorElements = errorElements;
  }

  clearInput() {
    for (const name in this.fields) {
      console.log(name)
      this.fields[name].value = "";
      
    }
    for (const name in this.errorElements) {
      console.log(name)
      this.errorElements[name].textContent = "";
    }
  }
}
