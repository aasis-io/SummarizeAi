import axios from "axios";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./../../context/AuthContext";
import CustomAlert from "./../CustomAlert"; // Import the CustomAlert component

const PlagiarismChecker = () => {
  const navigate = useNavigate();

  const { authData } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [wordCount, setWordCount] = useState(0); // State for word count
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);

  const handleTextChange = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);

    // Update word count dynamically
    const wordCount =
      updatedText.trim() === "" ? 0 : updatedText.trim().split(/\s+/).length;
    setWordCount(wordCount);
  };

  const checkPlagiarism = async () => {
    if (!text.trim()) return;

    const wordCount = text.split(/\s+/).length;
    if (wordCount < 50) {
      setAlertData({
        message: "Failed to check plagiarism. Input minimum 50 words!",
        confirmText: "Try Again",
        cancelText: null,
        onConfirm: () => setShowAlert(false),
        onCancel: null,
        type: "warning",
      });
      setShowAlert(true);
      return;
    }
    if (authData === null || !authData.user) {
      if (wordCount > 500) {
        setAlertData({
          message:
            "You have exceeded the 500-word limit. Log in to increase the limit to 1000 words.",
          confirmText: "Go to Login",
          cancelText: "Cancel",
          onConfirm: () => navigate("/login"),
          onCancel: () => setShowAlert(false),
          type: "warning",
        });
        setShowAlert(true);
        return;
      }
    } else {
      // If logged in, allow up to 1000 words
      if (wordCount > 1000) {
        setAlertData({
          message:
            "You have exceeded the 1000-word limit. Get a premium account to get unlimited access.",
          confirmText: "Get Premium",
          cancelText: "Cancel",
          onConfirm: () => navigate("/premium"),
          onCancel: () => setShowAlert(false),
          type: "warning",
        });
        setShowAlert(true);
        return;
      }
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/plagiarism/check",
        { text }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Plagiarism check error:", error);
      setAlertData({
        message: "Failed to check plagiarism. Please try again.",
        confirmText: "Try Again",
        cancelText: null,
        onConfirm: () => setShowAlert(false),
        onCancel: null,
        type: "warning",
      });
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-18 font-poppins">
      <div className={`container flex flex-col items-center justify-center`}>
        <div
          className={`w-full ${
            result ? "" : "max-w-3xl"
          } flex justify-between mb-10`}
        >
          <div>
            <h3 className="text-4xl text-gray-700 font-caudex font-semibold mb-2">
              Check Plagiarism
            </h3>
            <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
          </div>
          {authData?.user && (
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-6 text-main hover:cursor-pointer font-semibold flex items-center gap-2"
            >
              Go to Dashboard →
            </button>
          )}
        </div>

        <div
          className={`w-full ${
            result ? "" : "max-w-3xl"
          } bg-[#fbfaf8] box-shadow p-8 rounded-2xl flex justify-between`}
        >
          {/* Text input section */}
          <div className={`w-full ${result ? "lg:w-1/2" : "lg:w-full"} pr-4`}>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              Input Text
            </h1>
            <textarea
              className="w-full h-80 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-main outline-none"
              placeholder="Enter text to check for plagiarism..."
              value={text}
              onChange={handleTextChange}
            />
            <p
              className={`mt-2 text-center ${
                authData === null || !authData.user
                  ? wordCount > 500
                    ? "text-red-500"
                    : "text-gray-500" // Guest, limit is 500
                  : wordCount > 1000
                  ? "text-red-500"
                  : "text-gray-500" // Authenticated user, limit is 1000
              }`}
            >
              Word Limit: {wordCount} /{" "}
              {authData === null || !authData.user ? "500" : "1000"}
            </p>

            <button
              onClick={checkPlagiarism}
              className="w-full mt-4 bg-main text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-main-dark hover:cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Check Plagiarism"
              )}
            </button>
          </div>

          {/* Result section */}
          {result && (
            <div className="w-full lg:w-1/2 pl-4">
              <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Result
              </h1>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800">
                  Plagiarism Detected:{" "}
                  {typeof result.plagiarismPercentage === "number"
                    ? result.plagiarismPercentage.toFixed(2)
                    : "N/A"}
                  %
                </h2>
                <ul className="mt-4 space-y-4 max-h-80 overflow-y-scroll overflow-x-hidden">
                  {result.similarityScores.map((item, index) => (
                    <li
                      key={index}
                      className="p-4 bg-white shadow rounded-lg border-l-4 border-main"
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-main-dark font-medium"
                      >
                        {item.url}
                      </a>
                      <p className="text-gray-600 text-sm">
                        Similarity: {item.percentage}%
                      </p>
                      {item.plagiarizedText && (
                        <p className="text-gray-700 mt-2">
                          "{item.plagiarizedText}"
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Custom Alert */}
      {showAlert && alertData && (
        <CustomAlert
          message={alertData.message}
          onConfirm={alertData.onConfirm}
          onCancel={alertData.onCancel}
          confirmText={alertData.confirmText}
          cancelText={alertData.cancelText}
          type={alertData.type}
        />
      )}
    </div>
  );
};

export default PlagiarismChecker;
