// Importing packages
const routes = require('./controllers/index');
const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});



const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.set('view-engine', 'handlebars');

const sess = {
    secret: '...',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess))
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);


// Starting up SQL Server
sequelize.sync({ force : false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
});