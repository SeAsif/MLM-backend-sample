const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountriesSchema = new Schema({
  country_name: String,
  country_code: String,
  states: Array,
});

module.exports = mongoose.model('Country', CountriesSchema);
