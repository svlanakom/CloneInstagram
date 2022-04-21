 class ModalWindow {
  constructor() {
    if (!ModalWindow.instance) {
      this.modal = null;
      ModalWindow.instance = this;
    }
    return ModalWindow.instance;
  }
  close() {
    this.modal.style.display = "none";
  }

  show(modal) {
    this.modal = modal;
    let btnClose = this.modal.querySelector(".close");
    btnClose.addEventListener("click", () => this.close());

    this.modal.style.display = "block";
  }
}
export default ModalWindow;
