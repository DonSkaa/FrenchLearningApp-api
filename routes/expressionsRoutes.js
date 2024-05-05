const express = require('express')
const router = express.Router()
const { getAllExpressions } = require('../controllers/expressionsController')

router.get('/expressions', getAllExpressions)

module.exports = router
