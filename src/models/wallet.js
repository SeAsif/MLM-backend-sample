const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    from_user: { type: Schema.Types.ObjectId, ref: 'User'},
    type: String,
    transaction_id: String,
    orignal_amount: Number,
    amount1: Number,
    amount2: Number,
    transaction_charges: Number,
    tax1: Number,
    tax2: Number,
    wallet_type: String,
    bonus_flag: Boolean,
    payout_status: String,
    date: Date
});

module.exports = mongoose.model('Wallet', WalletSchema);
