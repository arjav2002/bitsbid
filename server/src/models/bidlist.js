const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ItemBidList = new Schema({
    itemId:         {type: [Schema.Types.ObjectId], required: true},
    biddingUsers:  {type: [String], required: true}
})

module.exports = mongoose.model('ItemBidList', ItemBidList)