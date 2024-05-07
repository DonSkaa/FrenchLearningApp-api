const express = require('express')
const router = express.Router()
const {
    getAllExpressions,
    getDayExpression
} = require('../controllers/expressionsController')

router.get('/expressions', getAllExpressions)
router.get('/day-expression', getDayExpression)

module.exports = router
