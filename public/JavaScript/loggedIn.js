// Importing Modules
import { displayAllUsersPosts, getPosts, displayPost, displayError, getOptions } from './helper.js';


// Targeting HTML Elements
const createPostBtn = document.getElementById('create-post-btn');
const usersMessage = document.getElementById('message');
const usersTopic = document.getElementById('topic');
const logoutBtn = document.querySelector('.logoutBtn');

displayAllUsersPosts(getPosts);


function displayImagePreview(event) {
  const fileInput = event.target;
    const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    
    reader.onload = function (e) {
      const circularImage = document.querySelector('.circular-image');
      circularImage.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
  }
}


logoutBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/users/logout', { method: 'POST' });
    if(response.ok) {
      window.location.href = response.url;
    }
  }
  catch(error) {
    displayError('logoutBtn', error);
  }
})



// function displayImagePreview(event) {
//     const fileInput = event.target;
//     const file = fileInput.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = function (e) {
//         const circularImage = document.querySelector('.circular-image');
//         circularImage.src = e.target.result;
//       };

//       reader.readAsDataURL(file);
//     }
//   }


// Adding an event listener to the create post button
createPostBtn.addEventListener('click', async () => {
    try {
        const postData = {
            title: usersTopic.value,
            message: usersMessage.value
        }
        usersTopic.value = '';
        usersMessage.value = '';
        const response = (await fetch('/posts/createPost', getOptions(postData))).json();
        const data = await response;
        displayPost(data);
    }
    catch(error) {
        displayError('createPostBtn.addEventListener', error);
    }
})