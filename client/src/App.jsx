import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HistoryProvider } from "./context/HistoryContext";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import PlagiarismChecker from "./components/pages/PlagiarismChecker";
import Signup from "./components/pages/Signup";
import Summarize from "./components/pages/Summarize";

// Admin Pages
import AdminLogin from "./components/pages/admin/AdminLogin";
import AdminProfile from "./components/pages/admin/AdminProfile";
import AdminUsers from "./components/pages/admin/AdminUsersPage";
import UserDetails from "./components/pages/admin/UserDetails";

import { AdminAuthProvider } from "./context/AdminAuthContext";
import PrivateAdminRoute from "./routes/PrivateAdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./components/pages/NotFound";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <AdminAuthProvider>
          <HistoryProvider>
            <div className="bg-background min-h-screen flex flex-col">
              <Header />
              <div className="flex-grow">
                <Routes>
                  {/* User Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/summarize" element={<Summarize />} />
                  <Route
                    path="/plagiarism-checker"
                    element={<PlagiarismChecker />}
                  />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/users"
                    element={
                      <PrivateAdminRoute>
                        <AdminUsers />
                      </PrivateAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/users/:id"
                    element={
                      <PrivateAdminRoute>
                        <UserDetails />
                      </PrivateAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/profile"
                    element={
                      <PrivateAdminRoute>
                        <AdminProfile />
                      </PrivateAdminRoute>
                    }
                  />

                  {/* Not Found Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </HistoryProvider>
        </AdminAuthProvider>
      </AuthProvider>

      {/* Toast Notifications */}
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
    </Router>
  );
};

export default App;
