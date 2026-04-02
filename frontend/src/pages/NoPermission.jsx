import React from "react";
import { Link } from "react-router-dom";

const NoPermission = () => {
  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-dark p-8 rounded-3xl max-w-sm w-full">
        <h2 className="text-xl font-bold text-white mb-4 tracking-tight">Access Restricted</h2>
        <p className="text-xs text-white/40 mb-8 font-medium">You need to be authenticated to access this frequency.</p>
        <Link to="/login" className="btn-primary block w-full">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default NoPermission;
