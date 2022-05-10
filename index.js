import App from "./middleware/App.js";
import Router from "./middleware/Roter.js";
import { phone } from "./config/constants.js";
import { pageContent } from "./config/constants.js"

const app = new App();

const routes = {
    home: {
        template: "/templates/index.html",
        title: "Home",
        controller: () => {
         let listOfUsersContainer = pageContent.querySelector(".list-container");
        if (!listOfUsersContainer || !localStorage.getItem("lognedUser")) return;

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
    },
},
    about: {
        template: "/templates/about.html",
        title: "About Us",
        controller: () => {
            
        },
    },
    contact: {
        template: "/templates/contact.html",
        title: "Contact",
        controller: () => {
            document.querySelector("#phone").innerHTML += phone;
        },
    },
};

const router = new Router(routes);
router.locationHandler();