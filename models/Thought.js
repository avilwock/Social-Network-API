const { Schema, model, trusted } = require('mongoose');
const userSchema = require('./User');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(value) {
                return value.toLocaleString();
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    }
)

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId, ref: 'Thought',
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(value) {
                return value.toLocaleString();
            }
        }
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});