import { pageContent, phone } from "../config/constants.js";
import { app } from "../index.js";
import PostEditForm from "../forms/PostEditForm.js";

const homeController = async () => {
    let token = localStorage.getItem("token");
    if (!token) return;

    let listOfUsersContainer = pageContent.querySelector(".list-container");
    if (!listOfUsersContainer) return;

    let users;
    try {
        users = await app.Users.getAll();
    } catch (error) {
        localStorage.removeItem('token');
        console.log(error.message);
        app.userButtons();
        return;
    }

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

const addPostController = async () => {
    const postsContainer = document.getElementById("postContainer");
    const sendPostForm = document.getElementById("sendPost");
    // const btnSubmitEditForm = document.getElementById("btnSubmitEditForm");
    const modalEditPost = document.getElementById("modalEditPost");
    const token = localStorage.getItem('token');

    const postEditForm = new PostEditForm(
        modalEditPost,
        {
            title: document.getElementById("edit-title"),
            description: document.getElementById("edit-description"),
            image: document.getElementById("edit-image")
        }
    );

    sendPostForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const response = await fetch("http://localhost:3000/createpost", {
            method: "post",
            body: formData,
            headers: {
                "Authorization": token
            }
        });

        let post;
        try {
            if (response.status === 401)
                throw new Error('User unauthorized!');
            post = await response.json();
        }
        catch (error) {
            localStorage.removeItem('token');
            console.log(error.message);
            app.userButtons();
            postsContainer.innerHTML = '';
        }

        if (post) postsContainer.innerHTML +=
            `<div style="box-shadow: 10px -15px 10px 5px rgba(0, 0, 0, .1); width: 300px; height: 310px; ">
                <h4 style="margin-left: 15px">${post.title}</h4>
                <img src="http://localhost:3000/${post.imagePath}" style = "height: 160px; width: 250px; margin-left: 15px"></br>
                <p style="margin-left: 15px">${post.description}</p>
                <button class="postDelete" data-post-id="${post._id}">del</button>
                <a href="#editepost"><button class="postEdite" data-post-id="${post._id}">edit</button></a>
            </div>`;

        bindDelButtons();
        bindEditButtons();
    });

    try {
        await loadPosts();
    } catch (error) {
        localStorage.removeItem('token');
        alert(error.message);
        alert(error.name);
        alert(error.stack);
        app.userButtons();
    }

    async function loadPosts() {
        let response = await fetch('http://localhost:3000/posts', {
            headers: {
                "Authorization": token
            }
        });
        postsContainer.innerHTML = '';
        if (response.status === 401)
            throw new Error('User unauthorized!');
        const posts = await response.json();
        posts.forEach(post => {
            postsContainer.innerHTML +=
                `<div style="box-shadow: 10px -15px 10px 5px rgba(0, 0, 0, .1); width: 300px; height: 310px;">
                    <h4 style="margin-left: 15px">${post.title}</h4>
                    <img src="http://localhost:3000/${post.imagePath}" style = "height: 160px; width: 250px; margin-left: 15px"></br>
                    <p style="margin-left: 15px">${post.description}</p>
                   <button class="postDelete" data-post-id="${post._id}">del</button>
                   <a href="#editepost"><button class="postEdite" data-post-id="${post._id}">edit</button></a>
                </div>`;
        });
        bindDelButtons();
        bindEditButtons();
    }

    function bindDelButtons() {
        const btns = document.getElementsByClassName("postDelete");
        Array.from(btns).forEach(btn => {
            btn.addEventListener('click', (event) => {
                const id = event.target.dataset.postId;
                fetch(`http://localhost:3000/deletepost/${id}`, {
                    method: "delete",
                    headers: {
                        "Authorization": token
                    }
                })
                    .then(response => response.text())
                    .then(async () => await loadPosts());
            });
        });
    }

    function bindEditButtons() {
        const btns = document.getElementsByClassName("postEdite");
        for (const btn of btns) {
            btn.addEventListener("click", async (event) => {
                const id = event.target.dataset.postId;
                
                const response = await fetch(`http://localhost:3000/post/${id}`, {
                    headers: {
                        "Authorization": token
                    }
                });

                let post;
                try {
                    if (response.status === 401)
                        throw new Error('User unauthorized!');
                    post = await response.json();
                } catch (error) {
                    localStorage.removeItem('token');
                    console.log(error.message);
                    app.userButtons();
                    return;
                }

                postEditForm.post = post;
                postEditForm.fill();
                
                app.modalWindow.show(modalEditPost);
            });
        }
    }
}

export { homeController, aboutController, contactController, addPostController };