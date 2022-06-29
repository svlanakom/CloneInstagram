import App from "./middleware/App.js";
import Router from "./middleware/Roter.js";
import HomeController from "./controllers/HomeController.js";
import AboutController from "./controllers/AboutController.js";
import ContactController from "./controllers/ContactController.js";
import PostController from "./controllers/PostController.js";

const routes = {
    home: {
        template: "/templates/index.html",
        title: "Home",
        controller: HomeController,
    },
    about: {
        template: "/templates/about.html",
        title: "About Us",
        controller: AboutController,
    },
    contact: {
        template: "/templates/contact.html",
        title: "Contact",
        controller: ContactController,
    },
    addPosts: {
        template: "/templates/add-post.html",
        title: "Add posts",
        controller: PostController,
    }
};

const app = new App();

const router = new Router(routes);
router.locationHandler();

export { app };