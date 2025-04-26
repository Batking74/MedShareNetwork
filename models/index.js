// Importing Modules
const Users = require("./User");
const Posts = require("./Posts");

// Defining an association where users can have many Posts
Users.hasMany(Posts, {
    foreignKey: "userID",
});

// Defining a corresponding association where a Post belongs to a User
Posts.belongsTo(Users, {
    foreignKey: "userID"
});

// Exporting Modules
module.exports = { Users, Posts };