const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    title: String,
    subject: String,
    mail: String,
    content: String,
    priority: String,
    department: String,
    assignee: { type: Schema.Types.ObjectId, ref: 'User'},
    status_changed_by: { type: Schema.Types.ObjectId, ref: 'User'},
    from_user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    to_user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    ticket_type_id: { type: Schema.Types.ObjectId, ref: 'TicketType'},
    rating: Number,
    attached_file: String,
    created_at: Date,
    updated_at: Date,
    status: Number
});

module.exports = mongoose.model('Ticket', TicketSchema);
