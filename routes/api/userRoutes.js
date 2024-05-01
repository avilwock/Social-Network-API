const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteSingleUser,
    getFriends,
    getSingleFriend,
    // addFriend,
    // updateFriend,
    // deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

router.route('/:userId/friends').get(getFriends)
router.route('/:userId/friends/:friendId').get(getSingleFriend)

module.exports = router;
