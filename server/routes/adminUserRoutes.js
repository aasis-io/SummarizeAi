const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const {
  getAllUsers,
  getUserDetails,
  deleteUser,
} = require("../controllers/adminUserController");

router.get("/users", adminAuth, getAllUsers);
router.get("/users/:id", adminAuth, getUserDetails);
router.delete("/users/:id", adminAuth, deleteUser);

module.exports = router;
