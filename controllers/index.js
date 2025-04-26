// Importing Packages
const router = require('express').Router();
const posts = require('./Api/postsRoutes');
const users = require("./Api/userRoutes");
const home = require("./Api/homeRoutes");

// Middleware
router.use('/users', users);
router.use('/posts', posts);
router.use('/', home);

// Exporting Modules
module.exports = router;