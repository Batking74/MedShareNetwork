const User = require("./User");
const Posts = require("./Posts");

User.hasMany(Posts, {
    foreignKey: "userID",
});

Posts.belongsTo(User, {
    foreignKey: "userID"
});

module.exports = { User, Posts };