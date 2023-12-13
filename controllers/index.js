// Importing Packages
const router = require('express').Router();
const users = require('./Api/users');
const posts = require('./Api/posts');

// Routers
router.use('/Users', users);
router.use('/Posts', posts);