import axios from "axios";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./../../context/AuthContext";
import HistoryContext from "./../../context/HistoryContext";
import CustomAlert from "./../CustomAlert"; // Import the CustomAlert component

const Summarize = () => {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);
  const { addHistoryItem } = useContext(HistoryContext);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0); // State for word count
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);

  // useEffect(() => {
  //   if (authData === null) return; // Wait until authData is loaded
  //   if (!authData || !authData.user) {
  //     navigate("/login");
  //   }
  // }, [authData, navigate]);

  // Update word count on text change
  const handleTextChange = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);

    // Update word count dynamically
    const wordCount =
      updatedText.trim() === "" ? 0 : updatedText.trim().split(/\s+/).length;
    setWordCount(wordCount);
  };

  const apiUrl = "http://localhost:5000";
  const summarizeText = async () => {
    if (!text.trim()) return;

    // Get word count
    const wordCount = text.split(/\s+/).length;

    if (wordCount < 50) {
      setAlertData({
        message: "Failed to summarize text. Input minimum 50 words!",
        confirmText: "Try Again",
        cancelText: null,
        onConfirm: () => setShowAlert(false),
        onCancel: null,
        type: "warning",
      });
      setShowAlert(true);
      return;
    }

    // Word limit check based on login status
    if (!authData?.user) {
      if (wordCount > 200) {
        setAlertData({
          message:
            "You have exceeded the 200-word limit. Log in to increase the limit to 500 words.",
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
      if (wordCount > 500) {
        setAlertData({
          message:
            "You have exceeded the 500-word limit. Get a premium account to summarize more.",
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
    setSummary("");

    try {
      const payload = { text };

      // Only attach userId if user is logged in
      if (authData?.user?._id) {
        payload.userId = authData.user._id;
      }

      const headers = authData?.token
        ? { Authorization: `Bearer ${authData.token}` }
        : {};

      const response = await axios.post(apiUrl + "/api/summarize", payload, {
        headers,
      });

      setSummary(response.data.summary);

      // Only add to history if user is logged in
      if (authData?.user) {
        const newHistoryItem = {
          _id: response.data.historyId, // Ensure backend returns this
          originalText: text,
          summary: response.data.summary,
          createdAt: new Date().toISOString(),
        };
        addHistoryItem(newHistoryItem);
      }
    } catch (error) {
      console.error("Summarization error:", error);
      setAlertData({
        message: "Failed to summarize text.",
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
            summary ? "" : "max-w-3xl"
          } flex justify-between mb-10`}
        >
          <div>
            <h3 className="text-4xl text-gray-700 font-caudex font-semibold mb-2">
              Summarize Texts
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
            summary ? "" : "max-w-3xl"
          } bg-[#fbfaf8] bos-shadow p-8 rounded-2xl flex place-items-start`}
        >
          <div className={`w-full ${summary ? "lg:w-1/2" : "lg:w-full"} pr-4`}>
            <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              Input Text
            </h1>
            <textarea
              className="w-full h-64 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-main outline-none focus:border-none transition"
              placeholder="Enter text to summarize..."
              value={text}
              onChange={handleTextChange}
            />
            <p
              className={`mt-2 text-center ${
                wordCount > (authData === null || !authData.user ? 200 : 500)
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Word Limit: {wordCount} /{" "}
              {authData === null || !authData.user ? "200" : "500"}
            </p>

            <button
              onClick={summarizeText}
              className="w-full mt-4 bg-main text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-main-dark hover:cursor-pointer transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Summarize"}
            </button>
            {loading && (
              <p className="mt-4 text-center text-gray-500">Processing...</p>
            )}
          </div>

          {/* Conditionally Render the Result Section */}
          {summary && (
            <div className="w-full lg:w-1/2 pl-4">
              <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Summarized Text
              </h1>
              <div className="bg-gray-100 shadow-md p-6 rounded-xl border-l-4 border-main">
                {/* <h2 className="font-semibold text-gray-800 mb-2">Summary:</h2> */}
                <p className="text-gray-700 leading-relaxed">{summary}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Summarized Text Length: {summary.trim().split(/\s+/).length}{" "}
                  words
                </p>
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

export default Summarize;
