import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-background text-white flex flex-col items-center justify-center font-sans">
      <Helmet>
        <title>Home | Joro Chat App</title>
        <meta name="description" content="Echo your universe. Join Joro for secure, real-time connections redefined for the next generation." />
      </Helmet>

      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]"></div>

      {/* 3D Decorative Floating Shapes */}
      <div className="absolute top-[20%] right-[15%] w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl blur-sm animate-[bounce_8s_infinite] rotate-12 transition-all"></div>
      <div className="absolute bottom-[20%] left-[10%] w-32 h-32 bg-gradient-to-tr from-violet-500/10 to-blue-500/10 rounded-full blur-md animate-[pulse_12s_infinite] -rotate-45"></div>

      {/* Hero Section */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <div className="inline-block px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-blue-400 text-[9px] font-bold uppercase tracking-[0.3em] mb-8 shadow-xl backdrop-blur-md">
          Evolution of Social
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-tight perspective-1000">
          <span className="block transform transition-transform hover:scale-105 duration-700 cursor-default">
            Echo <span className="text-white/20 italic font-light">Your</span>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-violet-500 animate-gradient-x">
            Universe.
          </span>
        </h1>

        <p className="text-base md:text-lg text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed font-semibold tracking-tight">
          Where every word resonates. Real-time connections <br className="hidden md:block" />
          redefined for the next generation.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/login" className="w-full sm:w-auto">
            <button className="btn-primary w-full sm:w-auto px-10 py-3.5 text-xs uppercase tracking-widest">
              Enter Echo
            </button>
          </Link>
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-500 backdrop-blur-sm group">
              <span className="group-hover:tracking-widest transition-all">Create Account</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Interactive 3D Mockup Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 px-6 w-full max-w-5xl pb-16">
        {[
          { label: "Pulse", value: "Real-time", icon: "⚡" },
          { label: "Depth", value: "Enhanced", icon: "💎" },
          { label: "Flow", value: "Seamless", icon: "🌊" }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-[2rem] text-center hover:bg-white/10 transition-all duration-700 cursor-default group border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-4xl mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 drop-shadow-xl">{stat.icon}</div>
            <div className="text-xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
            <div className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
