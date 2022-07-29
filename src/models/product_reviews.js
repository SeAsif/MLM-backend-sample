const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductReviewsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Order' },
    summary: String,
    description: String,
    date: Date,
    rating: Number
});

module.exports = mongoose.model('ProductReview', ProductReviewsSchema);
