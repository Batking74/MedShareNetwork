// Importing Modules/Packages
const { isAuthenticated, isAuthorizedForProfile } = require('../../helpers/auth');
const { displayError } = require('../../helpers/helper');
const users = require('express').Router();
const { User } = require("../../models");


// Serves up user profiles
users.get('/profile', isAuthenticated, isAuthorizedForProfile, async (req, res) => {
    res.render('LoggedIn', {
        Style: '../css/LoggedIn.css',
        JSFile: '../JavaScript/loggedIn.js',
        isLoggedIn: req.session.logged_in
    });
})


// Create New User Account
users.post('/createAccount', async (req,res) => {
    const data = req.body;
    // Data Sanitation
    if(data.Username === '') res.status(400).json('Username is Required!');
    else if(data.Email === '') res.status(400).json('Email is Required!');
    else if(data.Password === '') res.status(400).json('Password is Required!');
    try {
        const userData = await User.create(data);
        const userRes = { user: userData, message: "Account Created!" };
        // Logging in the user by storing their ID in the session
        req.session.UserId = userData.id;
        res.json(userRes);
    }
    catch (error) {
        displayError('/createAccount');
        res.status(400).json(error);
    }
})


// Sign in a user
users.post("/login", async (req, res) => {
    const data = req.body;
    let correctPassword;
    try {
        // Checking to see if email exists in database
        const userData = await User.findOne({ where: { email: data.email } });
        if(!userData) {
            res.status(400).json({ message: "Incorrect Email!" });
            return;
        }

        // Validating Password
        if(data.password != '') {
            correctPassword = await userData.checkPassword(data.password);
        }
        else {
            res.status(400).json({ message: 'Password must be filled out!' });
        }
        if (!correctPassword) {
            res.status(400).json({ message: "Incorrect Password!" });
            return;
        }

        // Saving session
        req.session.save(() => {
            req.session.UserID = userData.id;
            req.session.logged_in = true;
            res.redirect(`/users/profile?id=${userData.id}`);
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});


// Working on the delete account feature in future development
// users.delete("/:id", async (req, res) => {
//     try {
//         const userData = await User.destroy({
//             where: {
//                 id: req.params.id,
//                 userID: req.session.userID,
//             }
//         });

//         if (!userData) {
//             res.status(404).json({ message: "No user with this id was found."});
//             return;
//         }
//         res.status(200).json(userData)
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// });


// User will get redirected to their profile page if already logged in
users.get("/login", (req, res) => {
    if (req.session.logged_in && req.session.logged_in != undefined) {
        res.redirect(`/users/profile?id=${req.session.UserID}`);
    }
    res.status(200).json({ message: 'You are not logged in!' });
});


// Sign out a User
users.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).redirect('/');
        });
    }
    else {
        res.status(404);
    }
});


// Exporting Module
module.exports = users;