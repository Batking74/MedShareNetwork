// Importing Modules/Packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


// Creating Posts Table
class Posts extends Model {}
Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        Title: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        Body: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: "Posts",
    }
);


// Exporting Module
module.exports = Posts;
