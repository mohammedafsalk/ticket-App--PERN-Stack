const express = require("express");
const {
  login,
  logout,
  check,
  getDetails,
  updateTicket,
} = require("../controllers/admin.controller");
const authCheck = require("../middleware/adminAuth.middleware");
const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/check", authCheck, check);
router.get("/details", authCheck, getDetails);
router
  .route("/ticket")
  .patch(authCheck, updateTicket);

module.exports = router;
