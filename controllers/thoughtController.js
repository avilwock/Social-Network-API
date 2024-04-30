const Thought = require('../models/Thought')
const User = require('../models/User')

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
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
    },
    async createThought(req, res) {
        try {
            // Create the thought
            const thought = await Thought.create(req.body);
    
            // Find the user by ID
            const user = await User.findById(req.body.userId);
    
            // If user not found, return 404 error
            if (!user) {
                return res.status(404).json({
                    message: 'User not found with the provided ID',
                });
            }
    
            // Add the thought's ID to the user's thoughts array
            user.thoughts.push(thought._id);
    
            // Save the user with the updated thoughts array
            await user.save();
    
            res.json('Created the thought');
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
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId})
                .select('-__v');

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID'})
            }
            res.json({ message: 'Thought deleted successfully'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getReactions(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
    
            return res.status(200).json({ reactions: thought.reactions });
        } catch (error) {
            console.error('Error getting reactions for thought:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    
    async getSingleReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
    
            const reaction = thought.reactions.find(reaction => reaction._id == req.params.reactionId);
    
            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }
    
            return res.status(200).json({ reaction });
        } catch (error) {
            console.error('Error getting single reaction:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    
    // async createReactions(req, res) {
    //     try {
    //         const thoughts = await Thought.find()
    //         res.json(thoughts);
    //     } catch (err) {
    //         res.status(500).json(err)
    //     }
    // },
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
    
            const reactionIndex = thought.reactions.findIndex(reaction => reaction._id == req.params.reactionId);
            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }
    
            // Remove the reaction from the reactions array
            thought.reactions.splice(reactionIndex, 1);
    
            const updatedThought = await thought.save();
            res.json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    
}
