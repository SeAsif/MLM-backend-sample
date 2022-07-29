const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForgotPasswordSchema = new Schema({
  email: String,
  token: String,
});

module.exports = mongoose.model('ForgotPassword', ForgotPasswordSchema);
