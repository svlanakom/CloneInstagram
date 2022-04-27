

// document.querySelector("click", (e) => {
//   const { target } = e.target;
//   if (!target.matches("nav a")) {
//     return;
//   }
//   e.preventDefault();
//   urlRoute();
// });

// class Router {

//     constructor(routes) {
//         this.routes = routes;
//         this.loadInitialRoute();
// }

// loadRoute(urlSegment) {
//     const matchedRoute = this.matchUrlRoute(urlSegment);
//     const url =`/${urlSegment.join('/')}`;
//     history.pushState({}, '', url);
// }

export default class Router {
    constructor(routes) {
        this.routes = routes;
        window.addEventListener("hashchange", () => this.locationHandler());
    }
    async locationHandler() {
        let location = window.location.hash.replace("#", "");
        if(location.length == 0) {
            location = "/";

        }
        if (!this.routes[location]) return false;
        const route = this.routes[location];
        const html = await fetch(route.template).then((response) => response.text());
        document.querySelector(".page-content").innerHTML = html;
        document.title = route.title;
    };
}