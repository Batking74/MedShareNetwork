// Importing Packages
const sequelize = require("../config/connection");
const { Model, DataTypes} = require("sequelize");
const bcrypt = require("bcrypt");


// Creating User Table
class Users extends Model {
    async checkPassword(loginPw) {
        // Compare the hashed input with the stored hashed password
        return bcrypt.compareSync(loginPw, this.Password);
    }
}
Users.init(
    {
        // Table Columns
        id: {
            // Column Attributes
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.Password = await bcrypt.hash(newUserData.Password, 10);
            return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
            updatedUserData.Password = await bcrypt.hash(updatedUserData.Password, 10);
            return updatedUserData;
        },
        },
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: "user",
    }
);


// Exporting Module
module.exports = Users;
