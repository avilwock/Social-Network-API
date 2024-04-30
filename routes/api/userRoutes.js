const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateSingleUser,
    deleteSingleUser,
    getFriends,
    getFriend,
    addFriend,
    updateFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);

router.route('/:userId/friends').get(getFriends).post(addFriend)
router.route('/:userId/friend/:friendId').get(getFriend).put(updateFriend).delete(deleteFriend)

module.exports = router;
