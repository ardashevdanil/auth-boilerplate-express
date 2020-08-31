const express = require('express')
const path = require('path')
const middlewares = require('./middlewares')
const mongoose = require('mongoose');
const { indexRouter } = require('./routes')

// Connection to the db
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('Successfully connected to the mongodb'))

const app = express()

app.use(middlewares)
app.use('/', indexRouter)

module.exports = app
