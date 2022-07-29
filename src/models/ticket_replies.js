const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketRepliesSchema = new Schema({
    ticket_id: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    message: String,
    reply_attachment: String,
    date: Date,
});

module.exports = mongoose.model('TicketReply', TicketRepliesSchema);
