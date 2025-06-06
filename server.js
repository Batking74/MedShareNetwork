// Importing packages
const handlebars = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers/index');
const session = require('express-session');
const express = require('express');
const bars = handlebars.create({ defaultLayout: 'main' });
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 1000;
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Set up sessions with cookies
const sess = {
  secret: process.env.SECRET_KEY,
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


const waitForDB = async () => {
  const maxRetries = 10;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      // Waiting for database to be running
      await sequelize.authenticate();
      console.log("✅ Database connected successfully. ✅");

      // Starting up MySQL Server
      sequelize.sync({ force: false }).then(() => {
        // Starting up Backend Node Server
        app.listen(PORT, () => {
          console.log(`Listening on port ${PORT}`);
        });
      });
      return;
    }
    catch (err) {
      console.log('⏳ Waiting for DB to be ready...');
      retries++;
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  console.error('❌ Could not connect to database. Exiting.');
};

waitForDB();
