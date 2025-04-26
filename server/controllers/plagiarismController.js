const { fetchGoogleResults } = require("../utils/googleSearch");
const { checkPlagiarism } = require("../utils/plagiarismCheck");

/**
 * Controller to check plagiarism using TF-IDF + Cosine Similarity
 */
exports.checkPlagiarism = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    // Fetch search results from Google
    const searchResults = await fetchGoogleResults(text);

    // Log the search results to inspect the structure
    console.log("Search Results:", searchResults);

    // Check if the results contain what we expect
    if (!Array.isArray(searchResults)) {
      return res
        .status(400)
        .json({ message: "Search results should be an array" });
    }

    // Assuming the structure of each search result is different, let's extract the snippet and URL accordingly
    const searchUrls = searchResults.map(
      (result) => result.url || result.link || ""
    ); // Update this based on actual result structure
    const snippets = searchResults.map(
      (result) => result.snippet || result.description || ""
    ); // Update this based on actual result structure

    // Log URLs and snippets to verify
    console.log("Search URLs:", searchUrls);
    console.log("Snippets:", snippets);

    // Compute similarity scores
    const similarityScores = checkPlagiarism(text, snippets, searchUrls);

    // Log similarity scores to ensure correct computation
    console.log("Similarity Scores:", similarityScores);

    // Create a list to hold the detailed results
    const detailedResults = similarityScores.map((item, index) => {
      const percentage = (item.similarityScore * 100).toFixed(2); // Calculate percentage
      const plagiarizedText = item.similarityScore > 0 ? snippets[index] : ""; // Get the plagiarized text if any similarity is found
      return {
        url: searchUrls[index],
        similarityScore: item.similarityScore,
        percentage: percentage,
        plagiarizedText: plagiarizedText,
      };
    });

    // Calculate plagiarism detected status - plagiarism detected if any similarity score is greater than 0
    const plagiarismDetected = similarityScores.some(
      (item) => item.similarityScore > 0
    );

    // Calculate plagiarism percentage
    const plagiarizedCount = similarityScores.filter(
      (item) => item.similarityScore > 0
    ).length;
    const plagiarismPercentage =
      (plagiarizedCount / similarityScores.length) * 100;

    // Log plagiarism detection
    console.log("Plagiarism Detected:", plagiarismDetected);
    console.log("Plagiarism Percentage:", plagiarismPercentage);

    // Respond with detailed similarity scores, plagiarism status, and the plagiarized text for each URL
    res.json({
      similarityScores: detailedResults,
      plagiarismDetected,
      plagiarismPercentage,
    });
  } catch (error) {
    console.error("Plagiarism Check Error:", error);
    res.status(500).json({ message: "Error checking plagiarism" });
  }
};
