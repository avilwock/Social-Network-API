const connection = require('../config/connection');
const { User, Thought } = require('../models');
const data = require('./data');

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

async function seed() {
    try {
        await connection;

        // Clear existing data
        await User.deleteMany();
        await Thought.deleteMany();

        // Insert users into the database
        const createdUsers = await User.insertMany(userData);

        // Extract user IDs
        const userIds = createdUsers.map(user => user._id);

        // Seed thoughts with user IDs
        const thoughtsWithUserIds = thoughtData.map((thought, index) => ({
            ...thought,
            username: userIds[index % userIds.length], // Cycling through user IDs
        }));
        await Thought.insertMany(thoughtsWithUserIds);

        console.log('Data successfully seeded.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

// Call the seed function
seed();
