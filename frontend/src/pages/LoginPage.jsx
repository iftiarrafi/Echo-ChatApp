import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/loginSlice.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, status, token } = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (status === "succeeded" || token) {
      navigate("/auth/dashboard");
    }
  }, [status, token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] text-sm">
      <Helmet>
        <title>Echo • Login</title>
        <meta name="description" content="Log in to Echo." />
      </Helmet>

      <div className="w-full max-w-[350px] flex flex-col items-center mt-8">
        {/* Main Login Box */}
        <div className="w-full bg-[#000000] sm:bg-black border-none sm:border border-[#363636] pb-6 pt-10 px-10 mb-3 flex flex-col items-center">

          {/* Logo */}
          <div className="mb-10 mt-2">
            <h1
              className="text-4xl font-semibold text-white tracking-widest italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Echo
            </h1>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Phone number, username, or email"
                className="w-full bg-[#121212] flex items-center text-xs placeholder-gray-400 text-gray-100 border border-[#363636] focus:border-gray-500 rounded-[3px] px-2 pt-2.5 pb-2 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#121212] flex items-center text-xs placeholder-gray-400 text-gray-100 border border-[#363636] focus:border-gray-500 rounded-[3px] px-2 pt-2.5 pb-2 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="mb-4 text-center">
                <p className="text-red-500 text-sm">{error || "Sorry, your password was incorrect. Please double-check your password."}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || password.length < 6}
              className={`w-full text-white font-semibold flex justify-center items-center py-1.5 rounded-lg text-sm mt-1 transition-all 
                ${loading || !username || password.length < 6 ? 'bg-[#0095f6]/70 cursor-not-allowed text-white/70' : 'bg-[#0095f6] hover:bg-[#1877f2]'}`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : "Log in"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex w-full items-center mt-5 mb-5">
            <div className="h-px bg-[#363636] flex-1"></div>
            <span className="text-[#A8A8A8] text-[13px] font-semibold px-4 uppercase">OR</span>
            <div className="h-px bg-[#363636] flex-1"></div>
          </div>


        </div>

        {/* Signup Box */}
        <div className="w-full bg-[#000000] sm:bg-black border-none sm:border border-[#363636] py-5 flex items-center justify-center mb-4">
          <p className="text-sm text-gray-100">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#0095f6] font-semibold hover:text-white transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Get the app section */}
        <div className="mt-2 text-center w-full">
          <p className="text-sm text-gray-100 mb-4">Get the app.(Not available yet)</p>
          <div className="flex justify-center gap-2">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png"
              alt="Get it on Google Play"
              className="h-10 cursor-pointer"
            />
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="Get it from Microsoft"
              className="h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Login;
