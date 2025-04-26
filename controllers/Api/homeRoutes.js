// Importing Modules/Packages
const home = require('express').Router();

// Serving up home page
home.get('/', (req, res) => {
    res.render('home', {
        Style: './css/styles.css',
        JSFile: './JavaScript/index.js',
        isLoggedIn: req.session.logged_in
    });
})

// Exporting Modules
module.exports = home;