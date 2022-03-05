const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  picture: { type: String },
  bids: [{String, String}],
  watchlist: [{String}],
  items: [{String}]
})

module.exports = mongoose.model('User', User)