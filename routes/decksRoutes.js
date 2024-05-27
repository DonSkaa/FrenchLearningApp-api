const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getDecksByIds
} = require('../controllers/decksController')

router.get('/api/decks', getDecksByIds)

module.exports = router
