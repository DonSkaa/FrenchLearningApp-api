const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getAllExpressions,
    getDayExpression
} = require('../controllers/expressionsController')

router.get('/api/expressions', getAllExpressions)
router.get('/api/day-expression', userAuth.authenticateToken, getDayExpression)

module.exports = router
