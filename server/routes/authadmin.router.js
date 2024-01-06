const express = require("express");
const { login, sample, logout } = require("../controllers/admin.controller");
const authCheck = require("../middleware/adminAuth.middleware");
const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/protected", authCheck, sample);

module.exports = router;
