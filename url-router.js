 const urlPageTitle = "JS SPA Routing"

document.addEventListener("click",(e)=>{
    const{target} = e;
    if(target.matches("nav a")){
        return;
    }
    e.preventDefault();
    urlRoute();
})


const urlRoutes = {
    404: {
        template: "/templates/404.html",
        title: "404 | " + urlPageTitle,
        description: "Page not found",

    },
    "/": {
        template: "/templates/index.html",
        title: "Home | " + urlPageTitle,
        description: "This is homepage",

    },
    "/about": {
        template: "/templates/about.html",
        title: "About us | " + urlPageTitle,
        description: "This is about us page",

    }
}

const urlRoute = (event) => {
    event = event || event.window;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    urlLocationHandler();
}

const urlLocationHandler = async () => {
    const location = window.location.pathname;
    if(location.length === 0) {
        location = "/";
    }
    

    const  route = urlRoutes[location] || urlRoutes[404];
    const html = await fetch(route.template).then((response) => 
     response.text());
     document.getElementById("content").innerHTML = html;
     document.title = route.title;
     document
     .querySelector('meta[name="description"]')
     .setAttribute("content", route.description);
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;
urlLocationHandler()