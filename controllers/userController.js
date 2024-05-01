const { Types: { ObjectId } } = require('mongoose');
const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate({
                    path: 'thoughts',
                    populate: { path: 'reactions', populate: { path: 'username', select: 'username' } }
                })
                .populate('friends', 'username');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            console.log('req.params.userId:', req.params.userId);
            const user = await User.findById(req.params.userId).select('-__v');
    
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
    
            res.json(user);
        } catch (err) {
            console.error('Error fetching single user:', err)
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateSingleUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: req.params.userId },
            req.body,
            {new: true})
                .select('-__v');

            if(!updatedUser) {
                return res.status(404).json({ message: 'No user with that ID'})
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Delete Route
    async deleteSingleUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId })
                .select('-__v');
            
            if(!user) {
                return res.status(404).json({ message: 'No user with that ID'})
            }

            res.json( {message: 'User deleted successfully'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getFriends(req, res) {
        try {
            const user = await User.findById(req.params.userId).select('-__v');
    
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
    
            // Retrieve user's friends
            const friends = await User.find({ _id: { $in: user.friends } }).select('username');
    
            res.status(200).json({ friends });
        } catch (error) {
            console.error('Error getting friends:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    async getSingleFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v');
    
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
    
            const friendId = req.params.friendId;
            const friend = user.friends.find(friend => friend._id == friendId);
    
            if (!friend) {
                return res.status(404).json({ message: 'No friend with that ID' });
            }
    
            return res.status(200).json({ friend });
        } catch (error) {
            console.error('Error getting single friend:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
    
    
}


    