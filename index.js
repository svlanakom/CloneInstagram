import App from "./middleware/App.js";
import Router from "./middleware/Roter.js";
import { homeController, aboutController, contactController } from "./controllers/mainController.js"



const routes = {
    home: {
        template: "/templates/index.html",
        title: "Home",
        controller: homeController,
},
    about: {
        template: "/templates/about.html",
        title: "About Us",
        controller: aboutController,
    },
    contact: {
        template: "/templates/contact.html",
        title: "Contact",
        controller: contactController,
    },
};


const app = new App();


const router = new Router(routes);
router.locationHandler();

export { app };