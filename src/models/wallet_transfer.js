const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletTransferSchema = new Schema({
    from_user: { type: Schema.Types.ObjectId, ref: 'User'},
    to_user: { type: Schema.Types.ObjectId, ref: 'User'},
    amount: Number,
    wallet_type: String,
    reason: String,
    status: String,
    date: Date
});

module.exports = mongoose.model('WalletTransfer', WalletTransferSchema);
