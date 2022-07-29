const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SponsorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Sponsor', SponsorSchema);
