const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    hash: String,
    total_amount: Number,
    created_at: Date,
    updated_at: Date,
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    products: [
        {
            // product_id: { type: Schema.Types.ObjectId, ref: "Product"},
            product_name: String,
            quantity: Number,
            amount: Number,
            product: Object
        }
    ],
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
    is_same_shipping: Boolean
});

module.exports = mongoose.model('Cart', CartSchema);
