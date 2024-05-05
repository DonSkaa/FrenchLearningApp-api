require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const usersRouter = require('./routes/usersRoutes')
const expressionsRouter = require('./routes/expressionsRoutes')


// const usersRouter = require('./routes/expressionsRoutes')


// Configuration des middlewares

app.use(bodyParser.json())
app.use(cors())

app.use('/', usersRouter)
app.use('/', expressionsRouter)


module.exports = app
