const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    from_id: { type: Schema.Types.ObjectId, ref: 'User'},
    subject: String,
    content: String,
    attachment: String,
    category: String, // inbox, sent
    read_status: String, // read, unread
    starred: Boolean,
    spam: Boolean,
    created_at: Date,
    updated_at: Date,
    status: Number
});

module.exports = mongoose.model('Ticket', TicketSchema);
