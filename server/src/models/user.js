const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
  name:       {type: String, required: true},
  email:      {type: String, required: true},
  picture:    String,
  bids:       [{itemId: Schema.Types.ObjectId, bidAmount: {type: Number, min: 0}}],
  watchlist:  [Schema.Types.ObjectId],
  items:      [Schema.Types.ObjectId],
  soldItems:  [Schema.Types.ObjectId]
})

module.exports = mongoose.model('User', User)