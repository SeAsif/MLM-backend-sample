const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RankHistorySchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    current_rank: Number,
    new_rank: Number,
    updated_date: Date,
    from_user: { type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('RankHistory', RankHistorySchema);
