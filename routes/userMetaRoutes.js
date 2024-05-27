const express = require('express')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

const {
    getUserMetas,
    updateUserMeta
} = require('../controllers/userMetaController')

router.get('/api/user-metas', getUserMetas)
router.put('/api/user-meta', updateUserMeta)

module.exports = router
