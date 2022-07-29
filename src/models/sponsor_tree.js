const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SponsorTreeSchema = new Schema({
    sponsor: { type: Schema.Types.ObjectId, ref: 'Sponsor'},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    level: Number
});

module.exports = mongoose.model('SponsorTree', SponsorTreeSchema);
