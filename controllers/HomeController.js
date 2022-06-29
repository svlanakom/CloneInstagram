import { pageContent } from "../config/constants.js";
import { app } from "../index.js";

export default class HomeController {
    constructor() {
        this.load();
    }

    async load() {
        let token = localStorage.getItem("token");
        if (!token) return;

        let listOfUsersContainer = pageContent.querySelector(".list-container");
        if (!listOfUsersContainer) return;

        let users;
        try {
            users = await app.Users.getAll();
        } catch (error) {
            localStorage.removeItem('token');
            console.log(error.message);
            app.userButtons();
            return;
        }

        if (Object.keys(users).length === 0) {
            listOfUsersContainer.innerHTML = "<h2>List is empty</h2>";
            return;
        }

        listOfUsersContainer.innerHTML = "<h2>List of users</h2>";
        for (const email in users) {
            listOfUsersContainer.innerHTML += `<div class="m-2"><div class="m-3">${email}</div>
            <a href="#delete"><button class="button-delete" id="delete-${email}">delete</button></a>
            <a href="#edit"><button class="button-edit" id="edit-${email}">edit</button></div></a>`;
        }

        const deleteUsersBtns = document.querySelectorAll(".button-delete");
        for (const btn of deleteUsersBtns) {
            btn.addEventListener("click", (event) => app.handleDelete(event));
        }

        const editeUsers = document.querySelectorAll(".button-edit");
        for (const btn of editeUsers) {
            btn.addEventListener("click", (event) => app.handleEdit(event));
        }
    }
}
