const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User' },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
    party_code: String,
    name: String,
    image: String,
    creating_user: Number,
    start_date: Date,
    end_date: Date,
    address_type: String,
    country_id: { type: Schema.Types.ObjectId, ref: 'Country' },
    city: String,
    zip_code: Number,
    phone: Number,
    email: String,
    status: Boolean,

});

module.exports = mongoose.model('Party', PartySchema);
