const mongoose = require('mongoose');

const RSVP_Schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    response: { type: String, enum: ['yes', 'no', 'maybe'] },
});

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    invites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    rsvps: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        response: { type: String, enum: ['yes', 'no', 'maybe'] }}]
});

module.exports = mongoose.model('Event', EventSchema);

// {
//     "title": "Birthday Party",
//     "description": "John's 30th Birthday Party",
//     "date": "2024-12-31",
//     "time": "18:00"
// }