const mongoose = require('mongoose')
const bidSchema = require('./bid')
const schema = mongoose.Schema
const itemSchema = new schema(
    {
        sellerID:       {type: String,      required: true},
        name:           {type: String,      required: true},
        maxBid:         {type: bidSchema,    required: false},
        description:    {type: String,      required: false},
        endTime:        {type: Date,        required: true},
        photoUrl:       {type: String,      required: false}
    }
)

module.exports = mongoose.model('Item', itemSchema)