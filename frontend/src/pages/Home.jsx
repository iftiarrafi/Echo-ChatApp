import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      <Helmet>
        <title>Echo</title>
      </Helmet>



      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">

        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl space-y-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter sm:leading-tight">
            Connect with the people you care about.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Fast, simple, and secure messaging. Experience seamless communication anywhere in the world.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors shadow-lg">
                Get Started
              </button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#1a1a1a] text-white border border-[#333] px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#333] transition-colors">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </main>


    </div>
  );
};

export default Home;
