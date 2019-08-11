const config = require('config-lite')(__dirname)
const mongoose = require('mongoose')
mongoose.connect(config.mongodb, { useNewUrlParser: true }, err => {
  if (err) {
    console.log(`can not connect to MongoDB`)
    process.exit(1)
  } else {
    console.log(`connecting to MongoDB`)
  }
})
