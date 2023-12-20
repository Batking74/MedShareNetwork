// Importing Packages
const homeRoutes = require('./homeRoutes');
const router = require('express').Router();
const apiRoutes = require("./Api")


// Routers
router.use('/users', users);
router.use('/posts', posts);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);


// Exporting Modules
module.exports = router;