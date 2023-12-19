// Importing Packages
const router = require('express').Router();

const users = require('./Api/users');
const posts = require('./Api/posts');

// Routers
router.use('/users', users);
router.use('/posts', posts);
router.use('/api/user/profile', posts);

module.exports = router;