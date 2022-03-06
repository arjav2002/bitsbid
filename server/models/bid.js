const mongoose = require('mongoose')
const schema = mongoose.Schema
const bidSchema = new schema(
    {
        bidderID:   { type: String, required: true },
        bidAmount:  { type: Number, required: true, min: 0 }
    }
)

module.exports = bidSchema