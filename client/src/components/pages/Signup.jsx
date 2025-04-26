import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Signup = () => {
  const { signup, error, signupSuccessMessage, setSignupSuccessMessage } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(""); // State for form validation errors

  const navigate = useNavigate();

  const togglePasswordVisibility = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!name || !email || !password) {
      setFormError("All fields are required.");
      return;
    }

    signup(name, email, password);
  };

  if (signupSuccessMessage) {
    setTimeout(() => {
      navigate("/login");
    }, 250);
  }

  return (
    <div className="flex items-center justify-center py-16 shadow-2xs">
      <div className="w-full max-w-[480px] flex border-[1px] border-gray-200 rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full p-8">
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 font-caudex text-gray-800 tracking-wide">
                Sign Up
              </h2>
              <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 mx-auto md:mx-0 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
            </div>
            <p className="text-gray-600 mb-6 font-poppins mt-4">
              Join Summarize.AI and start summarizing today!
            </p>
          </div>

          {/* Display error message */}
          {formError && (
            <p className="text-red-500 text-center mt-2">{formError}</p>
          )}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <div className="mb-4 font-poppins">
            <label className="block text-gray-600 mb-2">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 pl-9 rounded-lg bg-[#e4f7f2] focus:outline-main"
                placeholder="John Doe"
              />
              <FiUser className="absolute w-5 h-5 top-[14px] left-2 text-gray-800" />
            </div>
          </div>

          <div className="mb-4 font-poppins">
            <label className="block text-gray-600 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 pl-9 rounded-lg bg-[#e4f7f2] focus:outline-main"
                placeholder="example@gmail.com"
              />
              <FiMail className="absolute w-5 h-5 top-[14px] left-2 text-gray-800" />
            </div>
          </div>

          <div className="mb-4 font-poppins">
            <label className="block text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 rounded-lg bg-[#e4f7f2] pl-9 focus:outline-main relative"
                placeholder="password"
              />
              <FiLock className="absolute w-5 h-5 top-[14px] left-2 text-gray-800" />
            </div>
          </div>

          <div className="flex items-center mt-5 font-poppins">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              id="togglePass"
              className="form-checkbox h-4 w-4 text-[#79d7be] hover:cursor-pointer rounded-lg border-gray-300 focus:ring-[#79d7be] transition duration-200"
            />
            <label
              htmlFor="togglePass"
              className="ml-2 text-gray-800 font-medium text-sm hover:cursor-pointer"
            >
              Show Password
            </label>
          </div>

          <div className="text-center mt-5 mb-4">
            <button
              className="px-12 py-3 rounded-lg hover:cursor-pointer font-bold text-white 
                     bg-gradient-to-l from-[#02AAB0] via-[#00CDAC] to-[#4CB8C4] 
                     bg-[length:200%] bg-left transition-all duration-500 ease-in-out 
                     hover:bg-right"
            >
              Sign Up Now
            </button>
          </div>

          <div className="mb-4 text-center">
            <p>
              Already have an account? <Link to={"/login"} className="text-main hover:underline">Login!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
