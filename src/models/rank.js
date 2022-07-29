const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RankSchema = new Schema({
    name: String,
    referral_count: Number,
    downline_rank: Number,
    downline_user_count: Number,
    total_sales: Number,
    rank_bonus: Number,
    qualification: Number,
    level1: Number,
    level2: Number,
    level3: Number,
    level4: Number,
    status: Boolean,
});

module.exports = mongoose.model('Rank', RankSchema);
