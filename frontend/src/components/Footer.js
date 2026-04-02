import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black/20 backdrop-blur-xl border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex items-center gap-3">
                    {/* <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-black text-lg tracking-tighter">E</span>
                    </div> */}
                    <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Echo</span>
                </div>

                <div className="flex space-x-12">
                    {['About', 'Contact', 'Privacy'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="text-white/30 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] hover:tracking-[0.25em]"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <p className="text-white/10 text-[10px] font-slate-400 uppercase tracking-[0.3em]">
                    © 2025 Echo. Defined by Sound.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
