const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  description: String,
  creation_date: Date,
  updation_date: Date,
  status: Number,
  order: Number,
  nav_status: Number,
  featured: Number,
  special: Number,
  image: String,
  slug: String,
});

module.exports = mongoose.model('Category', CategorySchema);
