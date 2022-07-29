const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactQueriesSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    subject: String,
    message: String

});

module.exports = mongoose.model('ContactQueries', ContactQueriesSchema);
