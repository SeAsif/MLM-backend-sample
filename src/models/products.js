const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    slug: String,
    description: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category' },
    sub_category: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    amount: Number,
    code: String,
    investment_amount: Number,
    expiry_date: Date,
    recurring_type: String,
    product_type: String,
    images: [],
    special: Number,
    quantity: Number,
    sales_count: Number,
    date: Date,
    status: Boolean

});

module.exports = mongoose.model('Product', ProductSchema);
