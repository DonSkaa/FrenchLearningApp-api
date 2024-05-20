//importing modules
const express = require('express')
const userController = require('../controllers/usersController')
const { signup, login, user } = userController
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

router.post('/api/signup', userAuth.saveUser, signup)
router.post('/api/login', login)
router.get('/api/user', user)

module.exports = router