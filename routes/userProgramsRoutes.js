const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getCurrentUserProgram,
} = require('../controllers/userProgramsController')

router.get('/api/user-program', userAuth.authenticateToken, getCurrentUserProgram)

module.exports = router
