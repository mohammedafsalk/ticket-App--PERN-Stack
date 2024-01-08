const express = require("express");
const {
  login,
  logout,
  getUsers,
  check,
} = require("../controllers/admin.controller");
const authCheck = require("../middleware/adminAuth.middleware");
const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/check", authCheck, check);
router.get("/users", authCheck, getUsers);

module.exports = router;