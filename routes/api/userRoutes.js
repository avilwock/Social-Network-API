const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteSingleUser,
    getFriends,
    getSingleFriend,
    addFriend,
    removeFriend
} = require('../../controllers/userController');
//calls the get and post routes for users
router.route('/').get(getUsers).post(createUser);
//calls the get routes for a single user, and the updated and delete routes
router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);
//calls for a list of friends based on a user's id
router.route('/:userId/friends').get(getFriends)
//calls a get route for a single friend or to create or deletet one
router.route('/:userId/friends/:friendId').get(getSingleFriend).post(addFriend).delete(removeFriend)

module.exports = router;
