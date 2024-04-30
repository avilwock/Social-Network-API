const { Types: { ObjectId } } = require('mongoose');
const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
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
    }
}


    