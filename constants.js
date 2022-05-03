const pageContent = document.querySelector(".page-content");

const modalDelete = document.querySelector(".modal-delete");
const modalEdite = document.querySelector(".modal-edit");
const modalLogin = document.querySelector(".modal-login");
const modalRegistration = document.querySelector(".modal-registration");

const btnSubmitLogin = document.querySelector(".login-submit-button");

const delButton = document.querySelector(".delete-confirmation-btn");
const editButton = document.querySelector(".edit-confirmation-btn");

const buttonRegistration = document.querySelector(".button-registration");
const buttonLogin = document.querySelector(".button-login");

const routes = {
	home: {
		template: "/templates/index.html",
		title: "Home",
        // controller: () => {},
	},
	about: {
		template: "/templates/about.html",
		title: "About Us",
        // controller: () => {},
	},
};

export {
    pageContent,
    modalDelete,
    modalEdite,
    btnSubmitLogin,
    delButton,
    editButton,
    buttonRegistration,
    buttonLogin,
    modalLogin,
    modalRegistration,
    routes
}