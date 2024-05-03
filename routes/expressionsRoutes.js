const express = require('express')
const router = express.Router()
const { getAllExpressions } = require('../controllers/expressionController')

router.get('/expressions', getAllExpressions)

module.exports = router
