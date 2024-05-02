//imports the router
const router = require('express').Router();
//imports the api routes
const apiRoutes = require('./api');
//sets the api routes for use
router.use('/api', apiRoutes);
//ensures that if you enter an undefined route, you receive an error saying wrong route
router.use((req, res) => {
    return res.send('Wrong Route');
});
//exports the router
module.exports = router;