const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: String,
    description: String,
    event_type: String,
    state_date: Date,
    end_date: Date,
    created_at: Date,
    status: Boolean
});

module.exports = mongoose.model('Event', EventSchema);
