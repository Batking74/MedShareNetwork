// Targeting HTML Elements
const createAccountBtn = document.getElementById('createAccountBtn');
const requestLoginBtn = document.getElementById('request-login');
const createPostBtn = document.getElementById('create-post-btn');
const loginMiniPage = document.getElementById('loginMiniPage');
const createAccountMiniPage = document.getElementById('createAccountMiniPage');
const postBtn = document.querySelector('.create-post-btn');
const closeLogin = document.getElementById('closeLogin');
const loginBtn = document.getElementById('loginButton');
const usersMessage = document.getElementById('message');
const username = document.getElementById('username');
const password = document.getElementById('password');
const usersTopic = document.getElementById('topic');
const createEmail = document.getElementById('createEmail');
const createUsername = document.getElementById('createUsername');
const createPassword = document.getElementById('createPassword');
// const closeCreateAccountMiniPage = document.getElementById('closeCreateAccountMiniPage');
const requestCreateAccount = document.getElementById('request-Create-Account');
const closeCreateAccountBtn = document.getElementById('closeCreateAccountBtn');


// Adding an event listener to the Request login button
requestLoginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Display the login mini-page
    loginMiniPage.style.display = 'block';
})


// Adding an event listener to the Request login button
requestCreateAccount.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Display the login mini-page
    createAccountMiniPage.style.display = 'block';
})


// Adding an event listener to the login button
loginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const postData = {
        email: createUsername.value,
        password: createPassword.value
    }

    fetch('users/login', postBtn)
    .then(res => {
        console.log(res)
    })
    console.log(postData)
})


// Adding an event listener to the create post button
createPostBtn.addEventListener('click', () => {
    const postData = {
        title: usersTopic.value,
        message: usersMessage.value
    }
    // fetch('users/login', )
    console.log(postData)
})


// Adding an event listener to the create an Account button
createAccountBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const postData = {
        Username: createUsername.value,
        Email: createEmail.value,
        Password: createPassword.value
    }
    // fetch('users/login', )
    console.log(postData)
})


// Adding an event listener to the close Create Account Mini Page button
closeCreateAccountBtn.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Display the login mini-page
    createAccountMiniPage.style.display = 'none';
})


// Adding an event listener to the Close Login mini page button
closeLogin.addEventListener('click', (event) => {
    event.preventDefault();
    username.value = '';
    password.value = '';
    
    // Display the login mini-page
    loginMiniPage.style.display = 'none';
})




// Adding an event listener to the post button
postBtn.addEventListener('click', () => {
    const postContainer = document.getElementById('Post');
    postContainer.scrollIntoView({ behavior: 'smooth' });
})