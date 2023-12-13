// Importing packages
const handlebars = require('express-handlebars');
const routes = require('./controllers/index');
const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.JAWS_DB || 3001;
const bars = handlebars.create();


app.engine('handlebars', bars.engine);
app.set('view-engine', 'handlebars');


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