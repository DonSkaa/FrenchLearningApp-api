const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getUserPrograms,
} = require('../controllers/userPrograms')

router.get('/user-programs', userAuth.authenticateToken, getUserPrograms)

module.exports = router
