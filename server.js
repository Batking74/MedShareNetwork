// Importing packages
const handlebars = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers/index');
const session = require('express-session');
const express = require('express');
const bars = handlebars.create({ defaultLayout: 'main' });
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Set up sessions with cookies
const sess = {
    secret: 'Super secret secret',
    cookie: {
      // Stored in milliseconds
      maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
    db: sequelize,
    }),
};


  // Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', bars.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));
app.use(routes);


// Starting up SQL Server
sequelize.sync({ force : false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})