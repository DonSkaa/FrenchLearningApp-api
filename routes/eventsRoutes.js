const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getEventsByUserId
} = require('../controllers/eventsController')

router.get('/events', userAuth.authenticateToken, getEventsByUserId)

module.exports = router