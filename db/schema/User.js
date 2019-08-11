const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: 'string', required: true },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: 'string', required: true }
})
