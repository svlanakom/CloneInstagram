import Datalayer from "./Datalayer.js";
import UserEditForm from "./UserEditForm.js";
import UserLoginForm from "./UserLoginForm.js";
import UserRegistrationForm from "./UserRegistrationForm.js";
import ModalWindow from "./ModalWindow.js";
import {
    pageContent,
    modalDelete,
    modalEdite,
    btnSubmitLogin,
    delButton,
    editButton,
    buttonRegistration,
    buttonLogin,
    modalLogin,
    modalRegistration,
    // routes
} from "./constants.js";
// import Router from "./Roter.js";

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

        // this.router = new Router(routes);
        // this.router.locationHandler();

        this.modalWindow = new ModalWindow();

        this.userToDelete = undefined;
        this.userToEdit = undefined;

        editButton.addEventListener("click", () => this.modalWindow.close());

        window.addEventListener("click", (event) => this.handleClose(event));

        delButton.addEventListener("click", () => this.deleteUser());

        btnSubmitLogin.addEventListener("click", () => this.btnSubmitLoginClick());

        buttonRegistration.addEventListener("click", () => this.modalWindow.show(modalRegistration));
        buttonLogin.addEventListener("click", () => this.modalWindow.show(modalLogin));
    }

    updateTable() {
        let listOfUsersContainer = pageContent.querySelector(".list-container");
        if (!listOfUsersContainer || !sessionStorage.getItem("lognedUser")) return;

        let users = this.Users.getAll();
        if (Object.keys(users).length === 0) {
            listOfUsersContainer.innerHTML = "<h2>List is empty</h2>";
            return;
        }

        listOfUsersContainer.innerHTML = "<h2>List of users</h2>";
        for (const email in this.Users.getAll()) {
            listOfUsersContainer.innerHTML += `<div class="m-2"><div class="m-3">${email}</div>
                <button class="button-delete" id="delete-${email}">delete</button>
                <button class="button-edit" id="edit-${email}">edit</button></div>`;
        }

        const deleteUsersBtns = document.querySelectorAll(".button-delete");
        for (const btn of deleteUsersBtns) {
            btn.addEventListener("click", (event) => this.handleDelete(event));
        }

        const editeUsers = document.querySelectorAll(".button-edit");
        for (const btn of editeUsers) {
            btn.addEventListener("click", (event) => this.handleEdit(event));
        }
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
        }
    }

    deleteUser() {
        if (this.userToDelete) {
            this.Users.delete(this.userToDelete);
            this.updateTable();
            this.userToDelete = undefined;
            this.modalWindow.close();
        }
    }

    btnSubmitLoginClick() {
        if (this.loginForm.submit()) {
            let user = this.loginForm.submit();
            sessionStorage.setItem("lognedUser", user["email"]);
            this.updateTable();
            this.loginForm.clearInput();
            this.modalWindow.close();
        }
    }
}