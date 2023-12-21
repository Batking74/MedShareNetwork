// Importing Modules
const User = require("./User");
const Post = require("./Posts");


// Defining an association where users can have many Posts
User.hasMany(Post, {
    foreignKey: "userID",
});


// Defining a corresponding association where a Post belongs to a User
Post.belongsTo(User, {
    foreignKey: "userID"
});


// Exporting Modules
module.exports = { User, Post };