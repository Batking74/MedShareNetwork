// Importing Packages
const router = require('express').Router();

const apiRoutes = require("./Api")
const homeRoutes = require('./homeRoutes');

// Routers
router.use('/users', users);
router.use('/posts', posts);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;