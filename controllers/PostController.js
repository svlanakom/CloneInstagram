import { app } from "../index.js";
import PostEditForm from "../forms/PostEditForm.js";

export default class PostController {
    constructor() {
        this.load();
    }

    async load() {
        const sendPostForm = document.getElementById("sendPost");
        
        sendPostForm.addEventListener("submit", (e) => this.sendPost(e));

        try {
            
            await this.loadPosts();
        } catch (error) {
            localStorage.removeItem('token');
            console.log(error.message);
            app.userButtons();
        }
    }

    async sendPost(event) {
        event.preventDefault();
        const postsContainer = document.getElementById("postContainer");
        const token = localStorage.getItem('token');

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
            `<div style="box-shadow: 10px -15px 10px 5px rgba(0, 0, 0, .1); width: 300px; height: 310px;">
            <h4 style="margin-left: 5px">${post.title}</h4>
            <img src="http://localhost:3000/${post.imagePath}" style = "height: 160px; width: 250px;"></br>
            <p style="margin-left: 5px">${post.description}</p>
            <button class="postDelete" data-post-id="${post._id}">del</button>
            <a href="#editepost"><button class="postEdite" data-post-id="${post._id}">edit</button></a>
        </div>`;

        this.bindDelButtons();
        this.bindEditButtons();
    }

    async loadPosts() {
       
        const postsContainer = document.getElementById("postContainer");
        const token = localStorage.getItem('token');

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
                <h4 style="margin-left: 5px">${post.title}</h4>
                <img src="http://localhost:3000/${post.imagePath}" style = "height: 160px; width: 250px;"></br>
                <p style="margin-left: 5px">${post.description}</p>
               <button class="postDelete" data-post-id="${post._id}">del</button>
               <a href="#editepost"><button class="postEdite" data-post-id="${post._id}">edit</button></a>
            </div>`;
        });

        this.bindDelButtons();
        this.bindEditButtons();
    }

    bindDelButtons() {
        const token = localStorage.getItem('token');
        const btns = document.getElementsByClassName("postDelete");
        Array.from(btns).forEach(btn => {
            btn.addEventListener('click', (event) => {
                const id = event.target.dataset.postId;
                fetch(`http://localhost:3000/deletepost/${id}`, {
                    method: "delete",
                    headers: {
                        "Authorization": token
                    }
                }).then(response => response.text()).then(async () => await this.loadPosts());
            });
        });
    }

    bindEditButtons() {
        const token = localStorage.getItem('token');
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

                const modalEditPost = document.getElementById("modalEditPost");
                const postEditForm = new PostEditForm(
                    modalEditPost,
                    {
                        title: document.getElementById("edit-title"),
                        description: document.getElementById("edit-description"),
                        image: document.getElementById("edit-image")
                    },
                    post
                );

                app.modalWindow.show(modalEditPost);
            });
        }
    }
}
