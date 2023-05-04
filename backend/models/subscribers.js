const mongoose = require('mongoose');
const subscribers = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subscribersToChannel: {
        type: String,
        required: true,
    },
    subscribersDate: {
        type: Date,
        required: true,
        default: Date.now,
    }
});
module.exports = mongoose.model('Subscribers',subscribers);