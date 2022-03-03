const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())

//connect to mongodb
const dbURL = process.env.MONGO_URL
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(res => console.log("Connected to the database"))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public", "index.html"))
  })  

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))