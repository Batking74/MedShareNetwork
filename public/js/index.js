// Targeting HTML Elements
const requestLoginBtn = document.getElementById('request-login');
const loginMiniPage = document.getElementById('loginMiniPage');
const postBtn = document.querySelector('.create-post-btn');
const closeLogin = document.getElementById('closeLogin');
const loginBtn = document.getElementById('loginButton');
const username = document.getElementById('username');
const password = document.getElementById('password');


// Adding an event listener to the Request login button
requestLoginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Display the login mini-page
    loginMiniPage.style.display = 'block';
})

closeLogin.addEventListener('click', (event) => {
    event.preventDefault();
    username.value = '';
    password.value = '';
    
    // Display the login mini-page
    loginMiniPage.style.display = 'none';
})


// Adding an event listener to the login button
loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(event);
    console.log(username.value);
    console.log(password.value);
})


// Adding an event listener to the post button
postBtn.addEventListener('click', () => {
    const postContainer = document.getElementById('Post');
    postContainer.scrollIntoView({ behavior: 'smooth' });
})