const natural = require("natural");

// Simple stopwords list (you can expand it)
const stopWords = new Set([
  "a",
  "an",
  "the",
  "and",
  "but",
  "or",
  "so",
  "on",
  "in",
  "at",
  "to",
  "for",
  "with",
  "of",
  "by",
  "this",
  "that",
  "it",
  "i",
  "you",
  "we",
  "they",
]);

/**
 * Preprocess the text: remove punctuation, lowercase, and split into words.
 * @param {string} text - The text to preprocess
 * @returns {string} - Preprocessed text
 */
const preprocessText = (text) => {
  if (typeof text !== "string") {
    console.error("Invalid input: Expected a string, but got:", typeof text);
    return ""; // Return empty string if not valid
  }

  return text
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // remove punctuation
    .split(/\s+/) // split into words
    .filter((word) => !stopWords.has(word)) // remove stop words
    .join(" "); // join back into a cleaned string
};

const checkPlagiarism = (userText, searchResults, searchUrls) => {
  if (!searchResults.length) return []; // No results means no plagiarism detected

  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();

  const cleanedUserText = preprocessText(userText);
  const cleanedSearchResults = searchResults.map(preprocessText);

  tfidf.addDocument(cleanedUserText);
  cleanedSearchResults.forEach((result) => tfidf.addDocument(result));

  let similarities = [];

  const allTerms = new Set();
  for (let i = 0; i < tfidf.documents.length; i++) {
    tfidf.listTerms(i).forEach((item) => allTerms.add(item.term));
  }
  const termsArray = Array.from(allTerms);

  const createVector = (docIndex) => {
    return termsArray.map((term) => {
      const termObj = tfidf.listTerms(docIndex).find((t) => t.term === term);
      return termObj ? termObj.tfidf : 0;
    });
  };

  const vectorUser = createVector(0);

  // Compare user text with each search result
  cleanedSearchResults.forEach((_, index) => {
    const vectorResult = createVector(index + 1);
    const similarity = cosineSimilarity(vectorUser, vectorResult);

    similarities.push({
      url: searchUrls[index],
      similarityScore: similarity,
    });
  });

  return similarities;
};

/**
 * Calculate Cosine Similarity between two vectors
 */
const cosineSimilarity = (vecA, vecB) => {
  if (vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return normA && normB
    ? dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
    : 0;
};

module.exports = { checkPlagiarism };
