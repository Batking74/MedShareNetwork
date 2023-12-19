const User = require("./User");
const Post = require("./Posts");

User.hasMany(Post, {
    foreignKey: "userID",
});

Post.belongsTo(User, {
    foreignKey: "userID"
});

module.exports = { User, Post };