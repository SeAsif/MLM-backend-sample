const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchema = new Schema({
    title: String,
    slug: String,
    description: String,
    meta_title: String,
    meta_keywords: String,
    meta_descriptions: String,
    featured_image: String,
    images: [],
});

module.exports = mongoose.model('Page', PageSchema);
