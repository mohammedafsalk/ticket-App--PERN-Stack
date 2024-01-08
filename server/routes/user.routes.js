const express = require("express");
const {
  register,
  login,
  authCheck: check,
  logout,
  createTicket,
  getAssignees,
  getTickets,
} = require("../controllers/user.controller");
const rateLimit = require("express-rate-limit");
const authCheck = require("../middleware/userAuth.middleware");
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
router.post("/login", limiter, login);
router.get("/logout", logout);
router.get("/check", authCheck, check);
router.post("/create", authCheck,createTicket );
router.get("/tickets", authCheck, getTickets);
router.get("/assignees", authCheck,getAssignees );

module.exports = router;
