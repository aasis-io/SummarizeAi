const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const SEARCH_ENGINE_ID = process.env.GOOGLE_CSE_ID;

const fetchGoogleResults = async (query) => {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}`;

    console.log("🔍 Google API Request URL:", url);

    const response = await axios.get(url);
    return response.data.items || [];
  } catch (error) {
    console.error(
      "❌ Google API Error:",
      error.response?.data || error.message
    );
    return [];
  }
};

module.exports = { fetchGoogleResults };
