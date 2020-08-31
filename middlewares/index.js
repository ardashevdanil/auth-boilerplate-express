const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { passport } = require('./passport')

module.exports = [
  cors({ origin: process.env.CLIENT_ORIGIN }),
  passport.initialize(),
  logger('dev'),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
]
