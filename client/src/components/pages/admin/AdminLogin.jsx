import React, { useContext, useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AdminAuthContext from "../../../context/AdminAuthContext";

const AdminLogin = () => {
  const { login, loginSuccessMessage } = useContext(AdminAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("adminData"));

  if (storedData?.token) {
    navigate("/admin/users");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!email || !password) {
      setFormError("All fields are required");
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      setFormError("Invalid admin credentials");
    }
  };

  const togglePasswordVisibility = (e) => {
    setShowPassword(e.target.checked);
  };

  return (
    <div className="flex items-center justify-center py-16 font-poppins">
      <div className="w-full max-w-[480px] flex border border-gray-200 rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full p-8">
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 font-caudex text-gray-800 tracking-wide">
                Admin Login
              </h2>
              <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 mx-auto md:mx-0 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>{" "}
            </div>
            <p className="text-gray-600 mb-6 mt-4">Welcome back, Admin!</p>
          </div>

          {formError && (
            <p className="text-red-500 text-sm text-center mb-4">{formError}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 pl-10 rounded-lg bg-[#e4f7f2] focus:outline-main"
                placeholder="admin@example.com"
              />
              <FiUser className="absolute w-5 h-5 top-[14px] left-3 text-gray-800" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 pl-10 rounded-lg bg-[#e4f7f2] focus:outline-main"
                placeholder="password"
              />
              <FiLock className="absolute w-5 h-5 top-[14px] left-3 text-gray-800" />
            </div>
          </div>

          <div className="flex items-center mt-5">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              id="togglePass"
              className="h-4 w-4 text-main rounded border-gray-300 focus:ring-main"
            />
            <label htmlFor="togglePass" className="ml-2 text-gray-800 text-sm">
              Show Password
            </label>
          </div>

          <div className="text-center mt-6 mb-4">
            <button
              type="submit"
              className="px-12 py-3 block w-full rounded-lg font-semibold text-white 
                bg-gradient-to-l from-[#02AAB0] via-[#00CDAC] to-[#4CB8C4] 
                bg-[length:200%] bg-left transition-all duration-500 ease-in-out 
                hover:bg-right hover:cursor-pointer shadow-md hover:shadow-lg"
            >
              Log In
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SummarizeAi
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
