const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const debug = require('debug')('chat-express:models:user')
const { addDays }  = require('date-fns')

const Schema = mongoose.Schema

const userSchema = new Schema({
  login: {
    type: String,
    unique: [true, 'User with provided login already exsists'],
    required: [true, 'Login is required'],
  },
  hash: String,
  salt: String,
  name: String,
})

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
}

userSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')

  return this.hash == hash
}

userSchema.methods.getJWT = function() {
  return jwt.sign(
    {
      login: this.login,
      id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )
}

userSchema.statics.getById = async function(id) {
  return await this.findById(id).select('_id login name')
}

exports.User = mongoose.model('User', userSchema)
