// Importing Packages
const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize = getDatabase();


// Returns Database
function getDatabase() {
  if (process.env.JAWSDB_URL) {
    return new Sequelize(process.env.JAWSDB_URL);
  }
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    });
}


// Exporting Module
module.exports = sequelize;
