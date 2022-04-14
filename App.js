import Datalayer from "./Datalayer.js";
import UserEditForm from "./UserEditForm.js";
import UserLoginForm from "./UserLoginForm.js";
import UserRegistrationForm from "./UserRegistrationForm.js";
import {
    listOfUsersElem,
    listOfUsersContainer,
    modalDelete,
    modalEdite,
    btnSubmitLogin,
    delButton,
    editButton,
    buttonRegistration,
    buttonLogin
} from "./constants.js";

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

        this.userToDelete = undefined;
        this.userToEdit = undefined;

        window.addEventListener("click", (event) => this.handleClose(event));
        
        delButton.addEventListener("click", () => this.deleteUser());
        editButton.addEventListener("click", () => { modalEdite.style.display = "none"; });
        
        btnSubmitLogin.addEventListener("click", () => this.btnSubmitLoginClick());

        buttonRegistration.addEventListener("click", () => this.toggleButtonRegistration());
        buttonLogin.addEventListener("click", () => this.toggleButtonLogin());
    }

    updateTable() {
        listOfUsersContainer.innerHTML = "";
        for (const email in this.Users.getAll()) {
            listOfUsersContainer.innerHTML += `<div>${email}</div>
                <button class="button-delete" id="delete-${email}">delete</button>
                <button class="button-edit" id="edit-${email}">edit</button>`;
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
        modalDelete.style.display = "block";
    }

    handleEdit(event) {
        this.userToEdit = event.target.id.split("-")[1];
        let user = this.Users.get(this.userToEdit);

        if (Object.keys(user).length === 0) return;

        this.editForm.user = user;
        this.editForm.fill();

        modalEdite.style.display = "block";
    }

    handleClose(event) {
        if (event.target == modalDelete) {
            this.userToDelete = undefined;
            modalDelete.style.display = "none";
            listOfUsersElem.style.display = "block";
        }
        if (event.target == modalEdite) {
            this.userToEdit = undefined;
            modalEdite.style.display = "none";
            listOfUsersElem.style.display = "block";
        }
    }

    deleteUser() {
        if (this.userToDelete) {
            this.Users.delete(this.userToDelete);
            this.updateTable();
            this.userToDelete = undefined;
            modalDelete.style.display = "none";
        }
    }

    btnSubmitLoginClick() {
        if (this.loginForm.submit()) {
            this.updateTable();
            this.loginForm.clearInput();
            this.registrationForm.elem.parentElement.style.display = "none";
            this.loginForm.elem.parentElement.style.display = "none";
            listOfUsersElem.style.display = "block";
        }
    }

    toggleButtonRegistration() {
        this.registrationForm.elem.parentElement.style.display = "block";
        this.loginForm.elem.parentElement.style.display = "none";
        listOfUsersElem.style.display = "none";
    }

    toggleButtonLogin() {
        this.registrationForm.elem.parentElement.style.display = "none";
        this.loginForm.elem.parentElement.style.display = "block";
        listOfUsersElem.style.display = "none";
    }
}