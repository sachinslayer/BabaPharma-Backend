// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String
});

module.exports = mongoose.model('User', UserSchema);
