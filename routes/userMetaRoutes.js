const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getUserMetas,
    updateUserMeta
} = require('../controllers/userMetaController')

router.get('/api/user-metas', userAuth.authenticateToken, getUserMetas)
router.put('/api/user-meta', userAuth.authenticateToken, updateUserMeta)

module.exports = router
