const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SoldItem = new Schema({
    sellerId:     {type: String, required: true},
    name:         {type: String, required: true},
    description:  String,
    endTime:      {type: Date, required: true},
    photo:        String,
    highestBid:   {itemId: Schema.Types.ObjectId, bidAmount: {type: Number, min: 0}}
})

module.exports = mongoose.model('SoldItem', SoldItem)