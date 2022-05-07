export default class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener("hashchange", () => this.locationHandler());
    }

    async locationHandler() {
        let location = window.location.hash.replace("#", "");
        if (location.length == 0) {
            location = "home";
        }
        if (!this.routes[location]) return false;
        const route = this.routes[location];
        const html = await fetch(route.template).then((response) => response.text());
        document.querySelector(".page-content").innerHTML = html;
        document.title = route.title;
        route.controller();
    };
}