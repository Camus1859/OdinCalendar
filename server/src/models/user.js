const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  title: String,
  body: String
})

const User = mongoose.model('user', UserSchema)

module.exports = User