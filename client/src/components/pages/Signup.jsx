import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/google.svg";
import AuthContext from "../../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { googleLogin, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);

  const apiUrl = "http://localhost:5000";
  
  const togglePasswordVisibility = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!email || !password || !name) {
      setFormError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(apiUrl + `/api/auth/signup`, {
        name,
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem(
          "authData",
          JSON.stringify({ token: res.data.token, user: res.data.user })
        );
        login(res.data.token, res.data.user);
        navigate("/");
      }
    } catch (err) {
      setFormError(err.response?.data?.message || "Signup failed");
    }
  };
  console.log(apiUrl + `/api/auth/google-login`);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Use the access_token to get user info from Google
        const { data } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const { name, email, sub: googleId } = data;


        const res = await axios.post(apiUrl + `/api/auth/google-login`, {
          name,
          email,
          googleId,
        });

        if (res.data.token) {
          const authData = {
            token: res.data.token,
            user: res.data.user,
          };
          localStorage.setItem("authData", JSON.stringify(authData));
          googleLogin(authData.token, authData.user);
          navigate("/");
        } else {
          console.error("No token returned from the backend");
        }
      } catch (err) {
        console.error("Google signup failed:", err);
      }
    },
    onError: () => {
      console.error("Google signup failed");
    },
    flow: "implicit",
  });

  return (
    <div className="flex items-center justify-center py-16 shadow-2xs font-poppins">
      <div className="w-full max-w-[480px] p-10 flex flex-col border-[1px] border-gray-200 rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 font-caudex text-gray-800 tracking-wide">
                Sign Up
              </h2>
              <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 mx-auto md:mx-0 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
            </div>
            <p className="text-gray-600 mb-6 mt-4">
              Create your account to get started!
            </p>
          </div>
          {formError && (
            <p className="text-red-500 text-sm text-center">{formError}</p>
          )}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-gray-700 px-4 py-3 pl-9 rounded-lg bg-[#e4f7f2] focus:outline-main"
                placeholder="Your full name"
              />
              <FiUser className="absolute w-5 h-5 top-[14px] left-2 text-gray-800" />
            </div>
          </div>
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
              className="px-12 w-full py-3 rounded-lg hover:cursor-pointer font-bold text-white 
                     bg-gradient-to-l from-[#02AAB0] via-[#00CDAC] to-[#4CB8C4] 
                     bg-[length:200%] bg-left transition-all duration-500 ease-in-out 
                     hover:bg-right"
            >
              Sign Up
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-main hover:underline">
                Log in!
              </Link>
            </p>
          </div>
        </form>

        <span className="block text-center my-6 text-gray-600 relative before:absolute before:content-[''] before:w-[45%] before:h-[2px] before:bg-gray-300 rounded-lg before:left-0 before:top-[50%] after:absolute after:content-[''] after:w-[45%] after:h-[2px] after:bg-gray-300 after:right-0 after:top-[50%] font-semibold">
          or
        </span>

        <div className="w-full justify-center place-items-center mb-2">
          <div className="w-full text-center flex place-items-center justify-center">
            <button
              onClick={() => loginWithGoogle()}
              className="flex text-sm place-items-center justify-center font-semibold text-gray-600 border border-gray-200 py-3 px-6 w-full rounded-lg hover:cursor-pointer bg-gray-50 hover:bg-gray-200 duration-200"
            >
              <img
                src={GoogleLogo}
                alt="Google Logo"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                }}
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
