const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
                }
            }
        },
        thoughts: [thoughtSchema],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports - User;