const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getReactions,
    getSingleReaction,
    // createReaction,
    updateReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought)

router.route('/:thoughtId/reactions').get(getReactions)

router.route('/:thoughtId/reactions/:reactionId').get(getSingleReaction).put(updateReaction).delete(deleteReaction)

module.exports = router