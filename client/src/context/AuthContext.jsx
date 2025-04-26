import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();
const apiUrl = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [error, setError] = useState(null);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData) {
      setAuthData(storedData);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(apiUrl + `/api/auth/login`, {
        email,
        password,
      });
      const data = response.data;
      setAuthData(data);
      localStorage.setItem("authData", JSON.stringify(data));
      setLoginSuccessMessage("Login successful!");
      setSignupSuccessMessage(null); // Clear signup message on login
      toast.success("Login successful!");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
      setLoginSuccessMessage(null);
    }
  };

  const signup = async (name, email, password) => {
    try {
      await axios.post(apiUrl + `/api/auth/register`, {
        name,
        email,
        password,
      });
      setSignupSuccessMessage("Signup successful! Please log in.");
      setLoginSuccessMessage(null); // Clear login message on signup
      toast.success("Signup successful! Please log in.");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
      setSignupSuccessMessage(null);
    }
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("authData");
    setLoginSuccessMessage(null);
    setSignupSuccessMessage(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        signup,
        logout,
        error,
        loginSuccessMessage,
        signupSuccessMessage,
        setLoginSuccessMessage,
        setSignupSuccessMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
