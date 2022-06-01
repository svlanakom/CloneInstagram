import { pageContent, phone } from "../config/constants.js";
import { app } from "../index.js";

const homeController = async () => {
    let token = localStorage.getItem("token");
    if (!token) return;
    let user = await app.Users.get(token);
    if (Object.keys(user).length === 0) return;


    let listOfUsersContainer = pageContent.querySelector(".list-container");
    if (!listOfUsersContainer) return;

    let users = await app.Users.getAll();
    console.log(users)
    if (Object.keys(users).length === 0) {
        listOfUsersContainer.innerHTML = "<h2>List is empty</h2>";
        return;
    }

    listOfUsersContainer.innerHTML = "<h2>List of users</h2>";
    for (const email in users) {
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

const addImageController = () => {
    let sendImageForm = document.querySelector("#sendImage");
    let imageContainer = document.querySelector("#imageContainer")
    sendImageForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        // console.log(formData);
        let name = formData.get("image").name;
        // console.log(name)
        await fetch("http://localhost:3000/image", {
            
            method: "post",
            body: formData
        });
        let response = await fetch(`http://localhost:3000/image/${name}`);
        const imageBlob = await response.blob();
        // console.log(imageBlob)
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
            const base64data = reader.result;
            imageContainer.innerHTML =
                `<img src="${base64data}" >`;
            console.log(base64data)
        }

    });



}
export { homeController, aboutController, contactController, addImageController };
