import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "./AuthContext";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const { authData } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (authData?.user?._id) {
      fetchHistory(authData.user._id, authData.token);
    }
  }, [authData]); // Runs whenever `authData` changes

  const fetchHistory = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/history/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const addHistoryItem = (newItem) => {
    setHistory((prevHistory) => [newItem, ...prevHistory]);
  };

  const deleteHistoryItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`, {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      setHistory((prevHistory) => prevHistory.filter((item) => item._id !== id));
      toast.success("History item deleted successfully!");
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Failed to delete history item.");
    }
  };

  const clearAllHistory = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/history/clear/${authData.user._id}`,
        {
          headers: { Authorization: `Bearer ${authData.token}` },
        }
      );
      setHistory([]); // Instantly clear history from UI
      toast.success("All history cleared!");
    } catch (error) {
      console.error("Error clearing history:", error);
      toast.error("Failed to clear history.");
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addHistoryItem, deleteHistoryItem, clearAllHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContext;
