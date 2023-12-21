// Importing Modules
import { displayAllUsersPosts, displayError, getOptions, getPosts } from './helper.js';


// Targeting HTML Elements
const requestCreateAccount = document.getElementById('request-Create-Account');
const closeCreateAccountBtn = document.getElementById('closeCreateAccountBtn');
const createAccountMiniPage = document.getElementById('createAccountMiniPage');
const createAccountBtn = document.getElementById('createAccountBtn');
const createPassword = document.getElementById('createPassword');
const createUsername = document.getElementById('createUsername');
const requestLoginBtn = document.getElementById('request-login');
const loginMiniPage = document.getElementById('loginMiniPage');
const createEmail = document.getElementById('createEmail');
const closeLogin = document.getElementById('closeLogin');
const loginBtn = document.getElementById('loginButton');
const password = document.getElementById('password');
const email = document.getElementById('email');


// Adding an event listener to the Request login button
displayMiniPageWhenClicked(requestLoginBtn, loginMiniPage, createAccountMiniPage);

// Adding an event listener to the Request Create Account button
displayMiniPageWhenClicked(requestCreateAccount, createAccountMiniPage, loginMiniPage);

// Adding an event listener to the Close Login Mini page button
closeMiniPageWhenCloseBtnClicked(closeLogin, loginMiniPage);

// Adding an event listener to the close Create Account Mini Page button
closeMiniPageWhenCloseBtnClicked(closeCreateAccountBtn, createAccountMiniPage);

// Displays all users posts
displayAllUsersPosts(loginCheckThenGetPosts);


// Adding an event listener to the login button
loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        const postData = {
            email: email.value,
            password: password.value
        }
        const response = (await fetch('/users/login', getOptions(postData)));
        if (response.ok) window.location.href = response.url;
        else alert((await response.json()).message);
    }
    catch(error) {
        displayError('loginBtn', error);
    }
})


// Checks if the user is logged in first before trying to display posts
async function loginCheckThenGetPosts() {
    try {
        let response = await fetch('/users/login');
        if(!response.redirected) getPosts();
        // Redirects users to their accounts if logged in
        else window.location.href = response.url;
    }
    catch(error) {
        displayError('document.addEventListener("DOMContentLoaded")', error);
    }
}


// Adding an event listener to the create an Account button
createAccountBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        const newUser = {
            Username: createUsername.value,
            Email: createEmail.value,
            Password: createPassword.value
        }
        const response = await fetch('/users/createAccount', getOptions(newUser));
        const data = await response.json();
        if(response.ok) {
            // Close the createAccount mini-page
            createAccountMiniPage.style.display = 'none';
            // Display the login mini-page
            loginMiniPage.style.display = 'block';
        }
        else {
            alert(data.errors[0].message);
        }
    }
    catch(error) {
        displayError('createAccountBtn', error);
    }
})


// Adds eventlisteners to request buttons
function displayMiniPageWhenClicked(requestBtn, miniPage, otherMiniPage) {
    requestBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if(otherMiniPage.style.display === 'block') {
            otherMiniPage.style.display = 'none';
        }
        
        // Display the mini-page
        miniPage.style.display = 'block';
    })
}


// Adds eventlisteners to close buttons
function closeMiniPageWhenCloseBtnClicked(closeBtn, miniPage) {
    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        createUsername.value = '';
        createPassword.value = '';
        createEmail.value = '';
        password.value = '';
        email.value = '';
        // Closes the mini-page
        miniPage.style.display = 'none';
    })
}