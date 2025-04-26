import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HistoryProvider } from "./context/HistoryContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Dashboard from "./components/pages/Dashboard";
import Summarize from "./components/pages/Summarize";
import PlagiarismChecker from "./components/pages/PlagiarismChecker";

const App = () => {
  return (
    <div className="bg-background">
      <AuthProvider>
        <HistoryProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/summarize" element={<Summarize />} />
              <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
            </Routes>
            <Footer />
          </Router>
          {/* ToastContainer component to manage all toasts */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </HistoryProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
