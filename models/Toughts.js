const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');


// Create Schema for thoughts collection and reactions subdocument data
const thoughtsScehma = new Schema(
    {

    thoughtBody: {
        type: String,
        required: "What's on your mind today?",
        maxlength: 300
    },
    userID: {
        type: String,
        required: true
    },
    timePosted: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    userId: {
        type: String,
        required: true
    },
    // use reactionSchema to validate data for a reaction
    reactions: [reactionSchema]
    },
    {
        toJSON: {
            // include any virtual properties when data is requested
            virtuals: true,
            getters: true
        },
        id: false
    }
    );
// get total count of reactions and replies on retrieval
thoughtsScehma.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtsScehma);
module.exports = Thought;