const express = require("express");
const {
  getUserHistory,
  addHistory,
  deleteHistory,
  clearUserHistory,
} = require("../controllers/historyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId", authMiddleware, getUserHistory); // Fetch history by user ID
router.post("/", authMiddleware, addHistory); // Add history entry
router.delete("/:id", authMiddleware, deleteHistory); // Delete a single history entry
router.delete("/clear/:userId", authMiddleware, clearUserHistory); // Clear all history for a user

module.exports = router;
