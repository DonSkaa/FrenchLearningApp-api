const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getEvents,
    addEvent,
} = require('../controllers/eventsController')

router.get('/api/events', getEvents)
router.post('/api/event', addEvent)

module.exports = router
