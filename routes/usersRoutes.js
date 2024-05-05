//importing modules
const express = require('express')
const userController = require('../controllers/usersController')
const { signup, login } = userController
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

router.post('/signup', userAuth.saveUser, signup)
router.post('/login', login)

module.exports = router