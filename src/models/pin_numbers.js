const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinNumberSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    pin_number: Number,
    allocate_amount: Number,
    balance_amount: Number,
    allocate_date: Date,
    expiry_date: Date,
    used_date: Date,
    used_for: String,
    status: Boolean,
    used_by: { type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('PinNumber', PinNumberSchema);
