const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/public", "index.html"))
  })  

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))