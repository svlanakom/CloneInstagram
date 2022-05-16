import { pageContent, phone } from "../config/constants.js";
import { app } from "../index.js";

const homeController = () => {
    let token = localStorage.getItem("token");
    if (!token) return;
    let user = app.Users.get(token);
    if (Object.keys(user).length === 0) return;
    

    let listOfUsersContainer = pageContent.querySelector(".list-container");
    if (!listOfUsersContainer) return;

    let users = app.Users.getAll();
    if (Object.keys(users).length === 0) {
        listOfUsersContainer.innerHTML = "<h2>List is empty</h2>";
        return;
    }

    listOfUsersContainer.innerHTML = "<h2>List of users</h2>";
    for (const email in app.Users.getAll()) {
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

const aboutController = () => {

}

const contactController = () => {
    document.querySelector("#phone").innerHTML += phone;
}
 export { homeController, aboutController, contactController };