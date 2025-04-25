// Importing Modules/Packages
const posts = require('express').Router();
const { Posts, Users } = require("../../models");


// Gets all Users Posts from database
posts.get("/", async (req, res) => {
    try {
        const data = await Posts.findAll({
            attributes: ['Title', 'Body'],
            include: [{ model: Users, attributes: ['username'] }]
        });
        const posts = data.map((post) => post.get({ plain: true }));
        for(let post of posts) post.User = post.User.username;
        res.json(posts);
    }
    catch (error) {
        res.status(400).json(error);
    }
});


// Create new users Post in database
posts.post("/createPost", async (req, res) => {
    // Data Sanitation
    const data = req.body;
    if(data.title === '') {
        res.status(400).json('Title is required!');
        return;
    }
    else if(data.message === '') {
        res.status(400).json('Post message is required!');
        return;
    }
    try {
        // Create New Post in Database
        const newPost = await Posts.create({
            Title: data.title,
            Body: data.message,
            userID: req.session.UserID
        });

        // Get the users name
        const user = await Users.findOne({
            where: {
                id: req.session.UserID
            }
        })

        // Add users name to object
        newPost.dataValues.user = user.dataValues.Username
        
        res.status(200).json(newPost);
    }
    catch (error) {
        res.status(400).json(error);
    }
});


// Exporting Modules
module.exports = posts;