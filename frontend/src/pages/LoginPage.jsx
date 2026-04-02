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
  const { loading, error, status } = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (status === "success" || localStorage.getItem("userToken")) {
      navigate("/auth/dashboard");
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      <Helmet>
        <title>Login | Joro Chat App</title>
        <meta name="description" content="Return to your resonance. Securely login to your Joro account." />
      </Helmet>

      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="glass-dark p-8 rounded-[2rem] backdrop-blur-3xl border border-white/5">
          <div className="text-center mb-10">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6 transform hover:rotate-6 transition-transform duration-500 ring-1 ring-white/10">
              <span className="text-white font-bold text-2xl tracking-tighter">E</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase ">
              Echo
            </h2>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
              Return to Resonance
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="username"
                className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2"
              >
                Identification
              </label>
              <input
                type="text"
                id="username"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input-field"
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2"
              >
                Access Code
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/10 p-4 rounded-2xl">
                <p className="text-[10px] text-red-400 text-center font-black uppercase tracking-widest">
                  {error || "Verification Failed"}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-5 text-xs uppercase tracking-[0.3em] mt-4 shadow-blue-600/20"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </span>
              ) : "Enter Resonance"}
            </button>
          </form>

          <div className="mt-10 text-center pt-6 border-t border-white/5">
            <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest leading-loose">
              New to the Echo? <br />
              <Link
                to="/register"
                className="text-white hover:text-blue-400 transition-colors"
              >
                Start Your Frequency
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
