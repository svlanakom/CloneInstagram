//  const pageTitle = "JS SPA Routing"

// document.addEventListener("click",(e)=>{
//     const{target} = e;
//     if(target.matches("nav a")){
//         return;
//     }
//     e.preventDefault();
//     urlRoute();
// })


// const routes = {
//     404: {
//         template: "/templates/404.html",
//         title: "404 | " + pageTitle,
//         description: "Page not found",

//     },
//     "/": {
//         template: "/templates/index.html",
//         title: "Home | " + pageTitle,
//         description: "This is homepage",

//     },
//     about: {
//         template: "/templates/about.html",
//         title: "About us | " + pageTitle,
//         description: "This is about us page",

//     }
// }

// const urlRoute = (event) => {
//     event = event || event.window;
//     event.preventDefault();
//     window.history.pushState({}, "", event.target.href);
//     urlLocationHandler();
// }

// const locationHandler = async () => {
//     let location = window.location.hash.replace("#", "");
//     if(location.length === 0) {
//         location = "/";
//     }
    

//     const  route = routes[location] || routes[404];
//     const html = await fetch(route.template).then((response) => 
//      response.text());
//      document.getElementById("content").innerHTML = html;
//      document.title = route.title;
//      document
//      .querySelector('meta[name="description"]')
//      .setAttribute("content", routes.description);
// };

// // window.onpopstate = urlLocationHandler;
// // window.route = urlRoute;
// // urlLocationHandler()

// window.addEventListener("hashchange", locationHandler)
// locationHandler();