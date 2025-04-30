import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();
const apiUrl = "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState(null);

  // On mount, check localStorage for saved auth data
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData"));
    if (storedData) {
      setAuthData(storedData);
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = (token, user) => {
    setAuthData({ token, user });
    localStorage.setItem("authData", JSON.stringify({ token, user }));
    toast.success("Google login successful!");
    setError(null);
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("authData");
    setLoginSuccessMessage(null);
    setSignupSuccessMessage(null);
    setError(null);
    toast.info("Logged out");
  };

  // Clear auth data (for Google login logout specifically)
  const clearAuthData = () => {
    setAuthData(null);
    localStorage.removeItem("authData");
    setLoginSuccessMessage(null);
    setSignupSuccessMessage(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        signup,
        googleLogin, // Added googleLogin method
        logout,
        clearAuthData, // Added clearAuthData method for Google logout
        error,
        isLoading,
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
