const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinRequestSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    amount: Number,
    count: Number,
    date: Date,
    status: Boolean,
});

module.exports = mongoose.model('PinRequest', PinRequestSchema);
