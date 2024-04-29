const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const data = require('./data');

connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

async function seed() {
    try {
        await connection;

        // Seed thoughts with reactions
        const thoughtsWithReactions = data.thoughtData.map((thought, index) => {
            const reactions = [
                { reactionBody: 'Like', username: 'user1' },
                { reactionBody: 'Love', username: 'user2' }
                // Add more reactions as needed
            ];

            return {
                ...thought,
                reactions: reactions
            };
        });

        // Create each user individually
        for (const userData of data.userData) {
            const user = new User(userData);
            await user.save();
        }

        // Create each thought individually
        for (const thoughtData of thoughtsWithReactions) {
            const thought = new Thought(thoughtData);
            await thought.save();
        }

        console.log('Data successfully seeded.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
