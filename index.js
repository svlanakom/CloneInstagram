import App from "./App.js";
import Router from "./Roter.js";
import { phone } from "./constants.js";

const app = new App();

const routes = {
    home: {
        template: "/templates/index.html",
        title: "Home",
        controller: () => {
            app.updateTable();
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

new Router(routes);