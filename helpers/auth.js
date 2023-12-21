// Middleware to check user authentication
const isAuthenticated = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect("/login");
    }
    else {
        next();
    }
};


// Middleware to check authorization for profile routes
const isAuthorizedForProfile = (req, res, next) => {
    const { id } = req.query.id;
    // Compare the session userID with the requested profile ID
    if (req.session.userID !== id) {
        res.status(403).json({ message: 'Forbidden' });
    }
    else {
        next();
    }
};


// Exporting Modules
module.exports = { isAuthenticated, isAuthorizedForProfile };