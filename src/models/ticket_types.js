const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketTypesSchema = new Schema({
    type_name: String,
    date: String,
    status: Boolean
});

module.exports = mongoose.model('TicketType', TicketTypesSchema);
