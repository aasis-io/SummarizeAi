// routes/adminAuthRoutes.js
const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin, getAdminProfile } = require("../controllers/adminAuthController");
const adminAuth  = require("../middleware/adminAuth");

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/profile", adminAuth, getAdminProfile);

module.exports = router;
