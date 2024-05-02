//calls in the connection
const connection = require('../config/connection');
//imports user model
const User = require('../models/User');
//imports thought model
const Thought = require('../models/Thought');
//imports data
const data = require('./data');

//sets up connection to server
connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
//seeds the data
async function seed() {
    try {
        //ensures a connection to server before running
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

        // Establish friendships between users
        const users = await User.find();
        const [user1, user2] = users;
        user1.friends.push(user2);
        user2.friends.push(user1);
        await user1.save();
        await user2.save();

        console.log('Data successfully seeded.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
