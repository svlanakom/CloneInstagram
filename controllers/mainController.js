import { pageContent, phone } from "../config/constants.js";
import { app } from "../index.js";

const homeController = async () => {
    let token = localStorage.getItem("token");
    if (!token) return;
    // let email = token.split(';')[0].split(':')[1];
    // let user = await app.Users.get(email);
    // if (Object.keys(user).length === 0) return;

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

const addPostController = () => {
    const postsContainer = document.getElementById("postContainer");
    const sendPostForm = document.getElementById("sendPost");
    
    
    sendPostForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const token = localStorage.getItem('token');
        fetch("http://localhost:3000/createpost", {
            method: "post",
            body: formData,
            headers: {
                "Authorization": token
            }
        }).then(response => response.json())
          .then( post => {
            postsContainer.innerHTML += 
            

             `<div style="width: 250px;"height: 250px;">
             <h4>${post.title}</h4>
            
             <img src="http://localhost:3000/${post.imagePath}" style = "height: 150px; width: 200px;"></br>
            
             <p>${post.description}</p>
             </div>`;
            
          });
       
        // let response = await fetch(`http://localhost:3000/image/${name}`);
        // const imageBlob = await response.blob();
        // const reader = new FileReader();
        // reader.readAsDataURL(imageBlob);
        // reader.onloadend = () => {
        //     const base64data = reader.result;
        //     imageContainer.innerHTML = 
        //         `<img src="${base64data}" witdh="200px">`;
        // }
    });

    loadPosts();

    async function loadPosts() {
        const token = localStorage.getItem('token');
        let response = await fetch('http://localhost:3000/posts', {
            headers: {
                "Authorization": token
            }
        });
        const posts = await response.json();
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            postsContainer.innerHTML += 
            `<div style="width: 250px; "height: 250px;">
            <h4>${post.title}</h4>
           
            <img src="http://localhost:3000/${post.imagePath}" style = "height: 150px; width: 200px;"></br>
           
            <p>${post.description}</p>
            </div>`;
           
        })
    }
}

export { homeController, aboutController, contactController, addPostController };