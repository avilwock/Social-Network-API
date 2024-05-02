//sets up an express router
const router = require('express').Router();
//imports thoughtRoutes
const thoughtRoutes = require('./thoughtRoutes');
//imports user routes
const userRoutes = require('./userRoutes');

//sets up thought route information
router.use('/thoughts', thoughtRoutes);
//sets up user route information
router.use('/users', userRoutes);

//exports the router for use
module.exports = router;