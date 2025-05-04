import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/google.svg";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:5000";
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [navigate]);

  const {
    login,
    error,
    loginSuccessMessage,
    setLoginSuccessMessage,
    googleLogin,
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);

  const togglePasswordVisibility = (e) => {
    setShowPassword(e.target.checked);
  };

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

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google API using access_token
        const googleRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const { name, email, sub: googleId } = googleRes.data;

        const res = await axios.post(
          apiUrl + `/api/auth/google-login`,
          { name, email, googleId }
        );

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
        console.error("Google login failed:", err);
      }
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "implicit", // or "auth-code" based on backend
  });

  return (
    <div className="flex items-center justify-center py-16 shadow-2xs font-poppins">
      <div className="w-full max-w-[480px] p-10 flex flex-col border-[1px] border-gray-200 rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col justify-center items-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 font-caudex text-gray-800 tracking-wide">
                Login
              </h2>
              <span className="w-16 h-[3px] bg-main block rounded-full relative mt-3 mx-auto md:mx-0 after:w-[5px] after:h-[5px] after:absolute after:bg-main after:rounded-full after:left-[67px] after:bottom-[-1px]"></span>
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
              className="px-12 w-full py-3 rounded-lg hover:cursor-pointer font-bold text-white 
              bg-gradient-to-l from-[#02AAB0] via-[#00CDAC] to-[#4CB8C4] 
              bg-[length:200%] bg-left transition-all duration-500 ease-in-out 
              hover:bg-right"
            >
              Login Now
            </button>
          </div>

          <div className="mt-4 text-center text-sm">
            <p>
              Not a member yet?{" "}
              <Link to={"/signup"} className="text-main hover:underline">
                Sign up!
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
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
