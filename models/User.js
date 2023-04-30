const { Schema, model} = require('mongoose');

// Create Schema for users collection and friends subdocument data
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],

    }
});

const User = model('User', userSchema);
module.exports = User;