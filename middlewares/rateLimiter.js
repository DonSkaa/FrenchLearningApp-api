const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // maximum 5 requests any 15 minutes
  message: "Too many login attempts, please try again later.",
});

module.exports = rateLimiter;
