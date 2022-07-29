const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    hash: String,
    total_amount: Number,
    delivery_charges: Number,
    shipping_charges: Number,
    tax: Number,
    product_count: Number,
    payment_method: String,
    order_date: Date,
    confirm_date: Date,
    order_status: Number,
    shipping_full_name: String,
    shipping_email: String,
    shipping_phone_number: String,
    shipping_company: String,
    shipping_zip_code: String,
    shipping_country: {
        label: String,
        value: String
    },
    shipping_address_1: String,
    shipping_address_2: String,
    billing_full_name: String,
    billing_email: String,
    billing_phone_number: String,
    billing_company: String,
    billing_zip_code: String,
    billing_country: {
        label: String,
        value: String
    },
    billing_address_1: String,
    billing_address_2: String,
    is_same_shipping: Boolean,
    products: {}
});

module.exports = mongoose.model('Order', OrderSchema);
