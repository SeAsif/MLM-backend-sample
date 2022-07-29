const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartyProductSchema = new Schema({
    party_id: {type: Schema.Types.ObjectId, ref: 'Party' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    amount: Number,
    added_user: Number,
    date: Date,
    status: Boolean

});

module.exports = mongoose.model('PartyProduct', PartyProductSchema);
