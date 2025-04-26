// Targeting HTML Elements
const postBtn = document.querySelector('.create-post-btn');
const postContainer = document.getElementById('Post');


// Adding an event listener to the scroll to post button
postBtn.addEventListener('click', () => {
    const postContainer = document.getElementById('Post');
    postContainer.scrollIntoView({ behavior: 'smooth' });
})


// Displays all user posts
export function displayAllUsersPosts(functionName) {
    document.addEventListener('DOMContentLoaded', functionName);
}


// Error Handling
export function displayError(eventName, error) {
    console.error(`Error occurred in ${eventName} eventListener: `);
    console.log(error);
}


// Returns options parameter for fetch
export function getOptions(data) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
}


// Gets all user posts
export async function getPosts() {
    const response = (await fetch('/posts')).json();
    const posts = await response;
    for(let post of posts) displayPost(post);
}


// Displays all user posts to the web page
export function displayPost(post) {
    // Create Elements
    const newPost = document.createElement('div');
    const name = document.createElement('p');
    const title = document.createElement('h2');
    const message = document.createElement('p');
    // Append Elements
    newPost.append(name);
    newPost.setAttribute('class', 'posts');
    newPost.append(title);
    newPost.append(message);
    // Set Element Values
    title.textContent = post.Title;
    message.textContent = post.Body;
    name.textContent = post.User;
    postContainer.append(newPost);
}