const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WithdrawRequestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    transaction_password: String,
    amount: Number,
    status: Boolean,
    date: Date
});

module.exports = mongoose.model('WithdrawRequest', WithdrawRequestSchema);
