import Datalayer from "./Datalayer.js";
import UserEditForm from "../forms/UserEditForm.js";
import UserLoginForm from "../forms/UserLoginForm.js";
import UserRegistrationForm from "../forms/UserRegistrationForm.js";
import ModalWindow from "./ModalWindow.js";
import {
   
    modalDelete,
    modalEdite,
    btnSubmitLogin,
    delButton,
    editButton,
    buttonRegistration,
    buttonLogin,
    buttonLogout,
    modalLogin,
    modalRegistration,
    } from "../config/constants.js";


export default class App {
    constructor() {
        this.Users = new Datalayer("users");

        this.registrationForm = new UserRegistrationForm(
            document.querySelector(".registration-form"),
            {
                username: document.querySelector("#username"),
                email: document.querySelector("#email"),
                password: document.querySelector("#password"),
                passwordConfirm: document.querySelector("#password1")
            },
            this.Users
        );

        this.loginForm = new UserLoginForm(
            document.querySelector(".login-form"),
            {
                email: document.querySelector("#email-login"),
                password: document.querySelector("#password-login")
            },
            this.Users
        );

        this.editForm = new UserEditForm(
            document.querySelector("#edit-form"),
            {
                sex: {
                    Male: document.querySelector("#edit-sex-male"),
                    Famele: document.querySelector("#edit-sex-famale")
                },
                hobby: {
                    Sport: document.querySelector("#edit-hobby-sport"),
                    Films: document.querySelector("#edit-hobby-films"),
                    Drowing: document.querySelector("#edit-hobby-drowing")
                },
                country: document.querySelector("#edit-country"),
                birthdate: document.querySelector("#edit-birthdate")
            },
            this.Users
        );

       

        this.modalWindow = new ModalWindow();

        this.userToDelete = undefined;
        this.userToEdit = undefined;

        editButton.addEventListener("click", () => {
            this.modalWindow.close();
           history.back();
        }),

        window.addEventListener("click", (event) => this.handleClose(event));

        delButton.addEventListener("click", () => this.deleteUser());

        btnSubmitLogin.addEventListener("click", () => this.btnSubmitLoginClick());



        buttonRegistration.addEventListener("click", () => this.modalWindow.show(modalRegistration));


        buttonLogin.addEventListener("click", () => this.modalWindow.show(modalLogin));

        buttonLogout.addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location = "/";
        });
    }

    
    handleDelete(event) {
        this.userToDelete = event.target.id.split("-")[1];

        let user = this.Users.get(this.userToDelete);
        if (Object.keys(user).length === 0) return;

        this.modalWindow.show(modalDelete);
    }

    handleEdit(event) {
        this.userToEdit = event.target.id.split("-")[1];

        let user = this.Users.get(this.userToEdit);
        if (Object.keys(user).length === 0) return;

        this.editForm.user = user;
        this.editForm.fill();

        this.modalWindow.show(modalEdite);
    }

    handleClose(event) {
        if (event.target.dataset.modalWindow) {
            this.modalWindow.close();
            history.back();
        }
    }

    deleteUser() {
        if (this.userToDelete) {
            this.Users.delete(this.userToDelete);
             this.userToDelete = undefined;
            this.modalWindow.close();
            history.back();
        }
    }

    btnSubmitLoginClick() {
        if (this.loginForm.submit()) {
            let user = this.loginForm.submit();
            localStorage.setItem("token", user["email"]);
            this.loginForm.clearInput();
            this.modalWindow.close();
            history.back();
        }
    }
}