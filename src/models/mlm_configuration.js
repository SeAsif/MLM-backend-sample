const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MlmConfigurationSchema = new Schema({
    wallet_a: String,
    wallet_b: String,
    payout_min: String,
    payout_max: String,
    payout_cut_off_balance: Number,
    payout_transaction_charges: Number,
    automatic_payout_status: String,
    tax: Number,
    tax_type: String,
    time_limit1: Number,
    time_limit2: Number,
    sunday: Number,
    monday: Number,
    tuesday: Number,
    wednesday: Number,
    thursday: Number,
    friday: Number,
    staturday: Number,
});

module.exports = mongoose.model('MlmConfiguration', MlmConfigurationSchema);
