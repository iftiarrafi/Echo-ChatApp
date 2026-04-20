import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="w-full bg-[#000000] text-xs text-[#737373] pb-10 pt-12 flex flex-col items-center border-t border-[#333]">
            <div className="flex flex-wrap justify-center gap-4 px-6 mb-4 max-w-4xl">
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
                <Link to="/help" className="hover:text-white transition-colors">Help</Link>
                <Link to="/press" className="hover:text-white transition-colors">Press</Link>
                <Link to="/api" className="hover:text-white transition-colors">API</Link>
                <Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link to="/locations" className="hover:text-white transition-colors">Locations</Link>
                <span className="cursor-pointer hover:text-white transition-colors">Language</span>
            </div>
            <div className="flex gap-4 mt-2">
                <span>© {new Date().getFullYear()} Echo.</span>
            </div>
        </footer>
    );
};

export default Footer;
