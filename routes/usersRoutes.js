const express = require("express");
const userController = require("../controllers/usersController");
const { signup, login, user, logout, getCurrentStudents, updatePassword } =
  userController;
const userAuth = require("../middlewares/userAuth");
const rateLimiter = require("../middlewares/rateLimiter");
const csrfProtection = require("../middlewares/csrfMiddleware");

const router = express.Router();

router.post("/api/signup", csrfProtection, userAuth.saveUser, signup);
router.post("/api/login", csrfProtection, rateLimiter, login);
router.get("/api/user", user);
router.post("/api/logout", csrfProtection, logout);
router.get("/api/users", getCurrentStudents);
router.put("/api/user", csrfProtection, updatePassword);

module.exports = router;
