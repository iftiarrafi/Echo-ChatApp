import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      <Helmet>
        <title>Register | Joro Chat App</title>
        <meta name="description" content="Initialize your frequency. Create a new account on Joro secure chat app." />
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="glass-dark p-8 rounded-[2rem] backdrop-blur-3xl border border-white/5">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6 transform hover:-rotate-6 transition-transform duration-500 ring-1 ring-white/10">
              <span className="text-white font-bold text-2xl tracking-tighter">E</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase ">
              Join Echo
            </h2>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
              Initialize Your Frequency
            </p>
          </div>

          {message && (
            <div className={`p-5 rounded-2xl mb-8 text-center backdrop-blur-md ${message.includes("exists") || message.includes("wrong")
              ? "bg-red-500/5 border border-red-500/10 text-red-400"
              : "bg-green-500/5 border border-green-500/10 text-green-400"
              }`}>
              <p className="text-[10px] font-black uppercase tracking-widest">{message}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">Username</label>
              <input
                type="text"
                placeholder="CHOOSE IDENTIFICATION"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-5 text-xs uppercase tracking-[0.3em] mt-4 shadow-blue-600/20"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Initializing...
                </span>
              ) : "Begin Resonance"}
            </button>
          </form>

          <div className="mt-10 text-center pt-6 border-t border-white/5">
            <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest leading-loose">
              Already Resonating? <br />
              <Link to="/login" className="text-white hover:text-blue-400 transition-colors">
                Return to Resonance
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
