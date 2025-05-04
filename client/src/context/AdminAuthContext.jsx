// src/context/AdminAuthContext.js
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminAuthContext = createContext();
const serverUrl = "http://localhost:5000";
const apiUrl = serverUrl + `/api/admin-auth`;

export const AdminAuthProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("adminData"));
    if (storedData) {
      setAdminData(storedData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      const data = response.data;
      setAdminData(data);
      localStorage.setItem("adminData", JSON.stringify(data));
      setLoginSuccessMessage("Admin login successful!");
      setError(null);
      toast.success("Admin login successful!");
      navigate("/admin/users");
    } catch (err) {
      console.error("Admin login error:", err);
      setError(err.response?.data?.message || "Admin login failed");
      toast.error(err.response?.data?.message || "Admin login failed");
      setLoginSuccessMessage(null);
    }
  };

  const logout = () => {
    setAdminData(null);
    localStorage.removeItem("adminData");
    setLoginSuccessMessage(null);
    toast.info("Admin logged out");
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminData,
        login,
        logout,
        error,
        loginSuccessMessage,
        setLoginSuccessMessage,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;
