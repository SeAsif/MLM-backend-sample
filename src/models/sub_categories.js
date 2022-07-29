const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    sub_category: String,
    creation_date: Date,
    updation_date: Date,
    order: Number,
    status: Number,
    image: Number,
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
