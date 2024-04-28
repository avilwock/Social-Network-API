const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            if (!thought) {
                return res.status(404).json({ message: 'No videos with that ID' });
            }

            res.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.creat(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                {new: true }
            );

            if(!user) {
                return res.status(404).json({
                    message: 'Video created, but found no user with that ID',
                })
            }

            res.json('Created the video');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId },
                { $set: req.body},
                { runValidators: true, new: true }
            );
        if(!thought) {
            return res.status(404).json({ message: 'No thoughts with this ID'});
        }

        res.json(thought)
        } catch {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
    
            const reactionToUpdate = thought.reactions.id(req.params.reactionId);
            if (!reactionToUpdate) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }
    
            // Update the reaction
            Object.assign(reactionToUpdate, req.body);
    
            const updatedThought = await thought.save();
            res.json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
    
            const reactionToDelete = thought.reactions.id(req.params.reactionId);
            if (!reactionToDelete) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }
    
            // Remove the reaction
            reactionToDelete.remove();
    
            const updatedThought = await thought.save();
            res.json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
