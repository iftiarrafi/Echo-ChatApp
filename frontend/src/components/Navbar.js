import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/loginSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector((state) => state.login.token);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);



    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };


    const navLinks = [
        { name: 'Home', path: '/' },
        ...(token ? [
            { name: 'Dashboard', path: '/auth/dashboard' }
        ] : [
            { name: 'Log in', path: '/login' },
            { name: 'Sign up', path: '/register' }
        ])
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-[#333]' : 'bg-transparent'
            }`}>
            <div className="max-w-4xl mx-auto px-6 sm:px-8 py-5">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-semibold italic text-white" style={{ fontFamily: 'Georgia, serif' }}>
                            Echo
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors ${location.pathname === link.path
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {token && (
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                Log out
                            </button>
                        )}


                    </div>

                    {/* Mobile Hamburger & Theme */}
                    <div className="flex items-center gap-4 md:hidden">

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#0a0a0a] border-t border-[#333] absolute top-full left-0 w-full py-4 px-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-sm font-medium ${location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {token && (
                        <button
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="text-left text-sm font-medium text-gray-400 hover:text-white"
                        >
                            Log out
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
