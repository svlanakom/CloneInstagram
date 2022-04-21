class ModalWindow {
  constructor() {}
  setConfig(modal) {
    this.modal = modal;
    this.show();
  }
  close() {
    this.modal.style.display = "none";
  }
  show() {
    this.modal.style.display = "block";
  }
}

const modalWindow = new ModalWindow();

export default modalWindow;



//  export default class Modal {
//     constructor() {

//     }
//   static instance = null;
//   static getInstance() {
//     if (!Modal.instance) {
//       Modal.instance = new Modal();
//     }
//     return Modal.instance;
//   }
// }



//   class Singleton {
//     constructor() {
//       if (!Singleton.instance) {
//         Singleton.instance = this;
//       }
//       return Singleton.instance;
//     }
//   }