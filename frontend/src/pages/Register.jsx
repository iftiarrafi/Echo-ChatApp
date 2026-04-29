import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.login);

  React.useEffect(() => {
    if (token || localStorage.getItem("userToken")) {
      navigate("/auth/dashboard");
    }
  }, [token, navigate]);


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v2/user/register",
        { username, password }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#000000] text-sm py-8">
      <Helmet>
        <title>Echo • Sign up</title>
        <meta name="description" content="Create a new account on Echo." />
      </Helmet>

      <div className="w-full max-w-[350px] flex flex-col items-center mt-2">
        {/* Main Register Box */}
        <div className="w-full bg-[#000000] sm:bg-black border-none sm:border border-[#363636] pb-6 pt-10 px-10 mb-3 flex flex-col items-center text-center">

          {/* Logo */}
          <div className="mb-4 mt-2">
            <h1
              className="text-4xl font-semibold text-white tracking-widest italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Echo
            </h1>
          </div>

          <p className="text-gray-400 font-semibold text-[15px] mb-6 leading-5">
            Sign up to connect with your friends.
          </p>



          {/* Divider */}
          <div className="flex w-full items-center mb-5">
            <div className="h-px bg-[#363636] flex-1"></div>
            <span className="text-[#A8A8A8] text-[13px] font-semibold px-4 uppercase">OR</span>
            <div className="h-px bg-[#363636] flex-1"></div>
          </div>

          {message && (
            <div className="w-full mb-4 text-center">
              <p className={`text-sm ${message.includes("exists") || message.includes("wrong") || message.includes("failed") ? "text-red-500" : "text-green-500"}`}>
                {message}
              </p>
            </div>
          )}

          {/* Form */}
          <form className="w-full flex flex-col" onSubmit={handleRegister}>
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-[#121212] flex items-center text-xs placeholder-gray-400 text-gray-100 border border-[#363636] focus:border-gray-500 rounded-[3px] px-2 pt-2.5 pb-2 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative mb-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-[#121212] flex items-center text-xs placeholder-gray-400 text-gray-100 border border-[#363636] focus:border-gray-500 rounded-[3px] px-2 pt-2.5 pb-2 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <p className="text-[11px] text-gray-400 mt-3 mb-4 leading-4">
              People who use our service may have uploaded your contact information to Echo. <a href="#" className="text-gray-300">Learn More</a>
              <br /><br />
              By signing up, you agree to our <a href="#" className="text-gray-300">Terms</a>, <a href="#" className="text-gray-300">Privacy Policy</a> and <a href="#" className="text-gray-300">Cookies Policy</a>.
            </p>

            <button
              type="submit"
              disabled={loading || !username || password.length < 6}
              className={`w-full text-white font-semibold flex justify-center items-center py-1.5 rounded-lg text-sm mt-1 transition-all 
                ${loading || !username || password.length < 6 ? 'bg-[#0095f6]/70 cursor-not-allowed text-white/70' : 'bg-[#0095f6] hover:bg-[#1877f2]'}`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : "Sign up"}
            </button>
          </form>
        </div>

        {/* Login Box */}
        <div className="w-full bg-[#000000] sm:bg-black border-none sm:border border-[#363636] py-5 flex items-center justify-center mb-4 text-center">
          <p className="text-sm text-gray-100">
            Have an account?{" "}
            <Link to="/login" className="text-[#0095f6] font-semibold hover:text-white transition-colors">
              Log in
            </Link>
          </p>
        </div>

        {/* Get the app section */}
        <div className="mt-2 text-center w-full">
          <p className="text-sm text-gray-100 mb-4">Get the app(Not available yet).</p>
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

export default Register;
