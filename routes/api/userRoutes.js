const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteSingleUser
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

module.exports = router;
