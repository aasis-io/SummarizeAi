const express = require("express");
const { checkPlagiarism } = require("../controllers/plagiarismController");

const router = express.Router();

router.post("/check", checkPlagiarism); // Endpoint to check plagiarism

module.exports = router;
