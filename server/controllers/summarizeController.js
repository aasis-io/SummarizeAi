const History = require("../models/history");
const axios = require("axios");

exports.summarizeText = async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!text || text.trim().split(/\s+/).length < 50) {
      return res.status(400).json({ message: "Text must be at least 50 words long." });
    }

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );

    const summary = response.data[0]?.summary_text || "Summarization failed.";

    let historyId = null;

    // ✅ Only save to history if userId exists
    if (userId) {
      const historyEntry = new History({ userId, originalText: text, summary });
      const savedEntry = await historyEntry.save();
      historyId = savedEntry._id;
    }

    res.json({ summary, historyId });

  } catch (error) {
    console.error("Summarization Error:", error);
    res.status(500).json({ message: "Error processing summarization" });
  }
};
