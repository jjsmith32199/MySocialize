const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateTime');

const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectID(),

        },
    
    reactionBody: {
        type: String,
        required: true,
        maxlength: 140
    },
    userId: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
},
);

module.exports = reactionSchema;