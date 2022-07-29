const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
    key: String,
    value: String
});

module.exports = mongoose.model('Config', ConfigSchema);
