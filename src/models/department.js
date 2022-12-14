const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    status: Boolean,
});

module.exports = mongoose.model('Department', DepartmentSchema);
