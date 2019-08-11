const User = require('./model/User')

module.exports = {
  async save(user) {
    return await User.save(user)
  }
}