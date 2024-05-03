const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

const expressionRoutes = require('../routes/expressionRoutes');

// Configuration des middlewares
app.use(bodyParser.json())
app.use(cors())

// Définition des routes
app.get('/test-connection', (req, res) => {
    db.query('SELECT 1', (err, results) => {
        if (err) {
            res.status(500).send('Database connection failed')
        } else {
            res.send('Database connection successful')
        }
    })
})

app.use('/api', expressionRoutes);

module.exports = app
