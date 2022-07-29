const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReturnSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    reason: String,
    date: Date,
    status: Number,
});

module.exports = mongoose.model('Return', ReturnSchema);
