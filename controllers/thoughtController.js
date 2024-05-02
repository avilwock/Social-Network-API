//imports thoughts model
const Thought = require('../models/Thought')
//imports User model
const User = require('../models/User')

//creates the routes
module.exports = {
    //the get thoughts route finds all thoughts in the database
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //finds a single thought within the database
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            //if no thoughts found, an error is returned
            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thought);
            } catch (err) {
                res.status(500).json(err);
            }
    },
    //create thought route, finds the user by ID to add the thought to it
    async createThought(req, res) {
        try {
            console.log('Request Body:', req.body);
    
            // Create the thought
            const thought = await Thought.create(req.body);
    
            // Find the user by ID
            const user = await User.findById(req.body.userId);
            console.log('User:', user);
    
            // If user not found, return 404 error
            if (!user) {
                console.log('User not found with the provided ID');
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
            console.error(err);
            res.status(500).json(err);
        }
    },
    //update a thought, finds one thought, and if valid ID, pushes the changes to it
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
    //delete thought route, if the id is found, the thought is deleted
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
    //get reaction. This finds the thought which holds the reaction, if present, then pulls t he reaction too
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
    //get singleReaction. This find a single reaction based on thought, thought id, and reactionid
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
    //This allows the creation of reactions.
    async createReaction(req, res) {
        try {
            //this finds the thought to add the reaction to
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
    
            // Create a new reaction object
            const newReaction = {
                //the variables necessary to create a new reaction
                username: req.body.username,
                reactionBody: req.body.reactionBody
            };
    
            // Add the new reaction to the thought's reactions array
            thought.reactions.push(newReaction);
    
            // Save the updated thought with the new reaction
            const updatedThought = await thought.save();
    
            // Return the updated thought with the new reaction
            res.status(201).json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //this is to update the reaction. 
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
    //route to delete reaction
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
