const { Schema, model,} = require('mongoose');

const reactionSchema = new Schema(
    {
        //references thought schema
        reactionId: {
            type: Schema.Types.ObjectId, ref: 'Thought',
        },
        //sets type to string, required, and max length of 280 characters
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        //sets the username as a required string
        username: {
            type: String,
            required: true,
        },
        //creates a date to log when the item is created
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(value) {
                return value.toLocaleString();
            }
        }
    }
)

//thoughtSchema
const thoughtSchema = new Schema(
    {
        //sets thought text to a required string with a limit of at least one character
        //to 280 characters
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        //sets the created at day
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(value) {
                return value.toLocaleString();
            }
        },
        //adds in the username for the creator as required
        username: {
            type: String,
            required: true,
        },
        //connnects to the user schema
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        reactions: [reactionSchema]
    }
)



thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;