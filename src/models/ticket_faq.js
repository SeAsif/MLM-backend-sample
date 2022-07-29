const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketFaqSchema = new Schema({
    department_id: {type: Schema.Types.ObjectId, ref: 'Department'},
    question: String,
    answer: String,
    date: Date,
    status: Boolean,
});

module.exports = mongoose.model('TicketFaq', TicketFaqSchema);
