const express = require("express");
const { register, login } = require("../controllers/user.controller");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const limiter = rateLimit({
  windowMs: 60000,
  max: 5,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again later one minute.",
    });
  },
});

router.post("/register", limiter, register);
router.post("/login", limiter,login);

module.exports = router;
