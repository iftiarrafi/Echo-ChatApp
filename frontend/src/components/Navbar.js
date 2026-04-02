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
    const [isLight, setIsLight] = useState(localStorage.getItem('theme') === 'light');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Apply theme on mount
        if (isLight) {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLight]);

    const toggleTheme = () => {
        const newTheme = !isLight;
        setIsLight(newTheme);
        localStorage.setItem('theme', newTheme ? 'light' : 'dark');
        if (newTheme) {
            document.documentElement.classList.add('light');
        } else {
            document.documentElement.classList.remove('light');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("userToken");
        navigate("/login");
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        ...(token ? [
            { name: 'Dashboard', path: '/auth/dashboard' }
        ] : [
            { name: 'Login', path: '/login' },
            { name: 'Signup', path: '/register' }
        ])
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-background/40 backdrop-blur-2xl border-b border-foreground/5 py-2' : 'bg-transparent py-4'
            }`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                <div className="flex justify-between items-center">
                    {/* Logo - Echo Branding */}
                    <Link to="/" className="flex items-center gap-2 group">
                        {/* <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform duration-500 ring-1 ring-white/20">
                            <span className="text-white font-black text-xl tracking-tighter">E</span>
                        </div> */}
                        <span className="text-xl font-black tracking-tighter text-foreground uppercase italic font-outfit">
                            Echo
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-[11px]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:tracking-[0.25em] ${location.pathname === link.path
                                    ? 'text-blue-500'
                                    : 'text-foreground/40 hover:text-foreground'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}


                        {token && (
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 rounded-xl bg-foreground/5 hover:bg-red-500/10 hover:text-red-500 border border-foreground/10 transition-all duration-300 font-black uppercase tracking-widest text-foreground/60"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Hamburger Menu & Theme Toggle (Mobile) */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 text-foreground/50 hover:text-foreground bg-foreground/5 rounded-xl border border-foreground/10"
                        >
                            {isLight ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 text-foreground/50 hover:text-foreground focus:outline-none bg-foreground/5 rounded-xl border border-foreground/10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                <div className="mx-6 my-4 p-5 rounded-[2rem] glass border border-foreground/5 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`px-6 py-3 rounded-xl text-base font-bold transition-all ${location.pathname === link.path ? 'bg-blue-500/10 text-blue-500' : 'text-foreground/50 hover:bg-foreground/5 hover:text-foreground'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {token && (
                        <button
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="w-full px-6 py-4 rounded-xl bg-red-500/5 text-red-500 border border-red-500/10 font-black uppercase tracking-widest text-xs"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
