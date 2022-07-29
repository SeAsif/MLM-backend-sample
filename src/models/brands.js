const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: String,
    image: String,
    date: Date
});

module.exports = mongoose.model('Brand', BrandSchema);
