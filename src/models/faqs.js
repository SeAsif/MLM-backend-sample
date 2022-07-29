const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
    title: String,
    questions: [
        {
            question: String,
            answer: String,
            heading: String
        }
    ]

});

module.exports = mongoose.model('Faqs', FaqSchema);
