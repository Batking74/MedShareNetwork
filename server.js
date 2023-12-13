// Importing packages
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./controllers/index');
require('dotenv').config();
const PORT = process.env.JAWS_DB || 3001;


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// Starting up SQL Server
sequelize.sync({ force : false })
.then(() => {
    app.listen(PORT => {
        console.log(`Listening on port ${PORT}`);
    })
})