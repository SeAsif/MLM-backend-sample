const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderProductsSchema = new Schema({
    order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
    party_id: { type: Schema.Types.ObjectId, ref: 'Party' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    amount: Number,
    image: String,
    recurring: String,
    date: Date,
    expiry_date: Date,
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
});

module.exports = mongoose.model('OrderProduct', OrderProductsSchema);
