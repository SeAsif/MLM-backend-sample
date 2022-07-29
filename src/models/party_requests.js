const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User' },
    party_title: String,
    content: String,
    image: String,
    request_date: Date,
    status: Boolean,
    confirm_date: Date,
    start_date: Date,
    end_date: Date,
    place: String,
    reason: String
});

module.exports = mongoose.model('Party', PartySchema);
