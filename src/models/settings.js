const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    key: String,
    value: String
});

module.exports = mongoose.model('Setting', SettingSchema);
