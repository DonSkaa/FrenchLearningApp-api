const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");

const {
  getUserMetas,
  updateUserMeta,
} = require("../controllers/userMetaController");
const csrfProtection = require("../middlewares/csrfMiddleware");

router.get("/api/user-metas", getUserMetas);
router.put("/api/user-meta", csrfProtection, updateUserMeta);

module.exports = router;
