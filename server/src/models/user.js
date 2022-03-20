const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
  name:       {type: String, required: true},
  email:      {type: String, required: true},
  picture:    String,
  bids:       [{itemId: String, bidAmount: {type: Number, min: 0}}],
  watchlist:  [{type: Schema.Types.ObjectId}],
  items:      [{type: Schema.Types.ObjectId}]
})

module.exports = mongoose.model('User', User)