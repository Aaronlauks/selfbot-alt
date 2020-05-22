const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userID: String,
  giveAmt: String,
  type: String
});

module.exports = mongoose.model("selfbot", messageSchema);