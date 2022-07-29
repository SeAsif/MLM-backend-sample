const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartyUsersSchema = new Schema({
    party_id: {type: Schema.Types.ObjectId, ref: 'Party' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    added_user: Number,
    date: Date,
    status: Boolean,

});

module.exports = mongoose.model('PartyUser', PartyUsersSchema);
