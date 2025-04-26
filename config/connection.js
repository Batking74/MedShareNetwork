// Importing Packages
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'MedShareNetwork-Database-Test',
    dialect: 'mysql',
    port: 3306
  });


// Exporting Module
module.exports = sequelize;