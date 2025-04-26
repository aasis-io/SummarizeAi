import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLock } from "react-icons/fi";

const Login = () => {
  const { login, error, loginSuccessMessage, setLoginSuccessMessage } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);

  const togglePasswordVisibility = (e) => {
    setShowPassword(e.target.checked);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password) {
      setFormError("All fields are required");
      return;
    }
    login(email, password);
  };

  if (loginSuccessMessage) {
    setTimeout(() => {
      navigate("/");
    }, 250);
  }

  return (
    <div className="flex items-center justify-center py-16 shadow-2xs">
      <div className="w-full max-w-[480px] flex border-[1px] border-gray-200 rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full p-8">
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 font-caudex text-gray-800 tracking-wide">
                Login
              </h2>
              <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 mx-auto md:mx-0 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>{" "}
            </div>
            <p className="text-gray-600 mb-6 mt-4">
              Ready to summarize? Log back in!
            </p>
          </div>
          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 pl-9 rounded-lg bg-[#e4f7f2] focus:outline-main"
                placeholder="example@gmail.com"
              />
              <FiUser className="absolute w-5 h-5 top-[14px] left-2 text-gray-800" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 rounded-lg bg-[#e4f7f2] pl-9 focus:outline-main"
                placeholder="password"
              />
              <FiLock className="absolute w-5 h-5 top-[14px] left-2 text-gray-800" />
            </div>
          </div>
          <div className="flex items-center mt-5">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              id="togglePass"
              className="h-4 w-4 text-[#79d7be] rounded-lg border-gray-300 focus:ring-[#79d7be]"
            />
            <label htmlFor="togglePass" className="ml-2 text-gray-800 text-sm">
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
              Login Now
            </button>
          </div>
          <div className="mb-4 text-center">
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-main hover:underline">
                Sign up!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
