const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Item = new Schema({
  sellerId:     {type: String, required: true},
  name:         {type: String, required: true},
  minBid:       {type: Number, min: 0, required: true},
  description:  String,
  endTime:      {type: Date, required: true},
  photo:        String,
  highestBid:   {userId: Schema.Types.ObjectId, bidAmount: {type: Number, min: 0}}
})

module.exports = mongoose.model('Item', Item)