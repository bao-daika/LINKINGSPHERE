const functions = require('firebase-functions')
const express = require('express')
const firebase = require('firebase')

const config = require('./config/config')

firebase.initializeApp(config)

const app = express()
const user = require('./routes/user')

app.use('/user', user)

exports.api = functions.https.onRequest(app)
