const History = require("../models/history");

exports.getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await History.find({ userId }).sort({ createdAt: -1 }); // Latest first
    res.json(history);
  } catch (error) {
    console.error("History Fetch Error:", error);
    res.status(500).json({ message: "Error fetching history" });
  }
};

exports.addHistory = async (req, res) => {
  try {
    const { userId, originalText, summary } = req.body;
    const newHistory = new History({ userId, originalText, summary });
    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (error) {
    console.error("History Add Error:", error);
    res.status(500).json({ message: "Error adding history" });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;
    await History.findByIdAndDelete(id);
    res.json({ message: "History deleted successfully" });
  } catch (error) {
    console.error("History Delete Error:", error);
    res.status(500).json({ message: "Error deleting history" });
  }
};

exports.clearUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    await History.deleteMany({ userId });
    res.json({ message: "All history cleared successfully" });
  } catch (error) {
    console.error("History Clear Error:", error);
    res.status(500).json({ message: "Error clearing history" });
  }
};
