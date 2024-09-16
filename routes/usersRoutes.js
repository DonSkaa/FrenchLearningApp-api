const express = require("express");
const userController = require("../controllers/usersController");
const { signup, login, user, logout, getCurrentStudents, updatePassword } =
  userController;
const userAuth = require("../middlewares/userAuth");
const rateLimiter = require("../middlewares/rateLimiter");

const router = express.Router();

router.post("/api/signup", userAuth.saveUser, signup);
router.post("/api/login", rateLimiter, login);
router.get("/api/user", user);
router.post("/api/logout", logout);
router.get("/api/users", getCurrentStudents);
router.put("/api/user", updatePassword);

module.exports = router;
