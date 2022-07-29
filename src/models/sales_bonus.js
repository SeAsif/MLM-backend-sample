const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalesBonusSchema = new Schema({
    from_amount: Number,
    to_amount: Number,
    percentage: Number,
    type: String //percentage
});

module.exports = mongoose.model('SalesBonus', SalesBonusSchema);
