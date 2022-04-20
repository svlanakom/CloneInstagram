 class ModalWindow {
    constructor() {
     
    }
    setConfig(modal){
        this.modal = modal;
        this.show();
    }
    close() {
        this.modal.style.display = 'none';
    }
    show() {
        this.modal.style.display = 'block';
    }
}

const modalWindow = new ModalWindow();

export default modalWindow;