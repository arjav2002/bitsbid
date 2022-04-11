const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ItemWatchlist = new Schema({
    itemId:         {type: [Schema.Types.ObjectId], required: true},
    watchingUsers:  {type: [String], required: true}
})

module.exports = mongoose.model('ItemWatchlist', ItemWatchlist)