const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");

const {
  getAllDecks,
  // getDecksByIds
} = require("../controllers/decksController");

router.get("/api/decks", getAllDecks);
// router.get('/api/decks', getDecksByIds)

module.exports = router;
