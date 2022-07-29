const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserBalanceSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    balance_amount: Number,
    total_amount: Number,
    released_amount: Number,
    user_wallet_two: Number,
    donation_send: Number,
    donation_received: Number,
    coupon_balance: Number,
    group_sales: Number,
    monthly_run_status: Number,
});

module.exports = mongoose.model('UserBalance', UserBalanceSchema);
