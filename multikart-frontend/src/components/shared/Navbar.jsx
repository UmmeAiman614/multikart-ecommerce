import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaHeart,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 z-[100] w-full">
        <div className="bg-light-bg dark:bg-dark-bg border-b border-dark-border shadow-lg w-full">
          <div className="flex items-center justify-between h-20 px-4 md:px-8">
            
            {/* LEFT: Logo */}
            <div className="flex items-center gap-2 md:gap-4 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
              <div className="bg-gold-light dark:bg-gold-dark p-2 md:p-3 rounded-xl md:rounded-2xl shadow-md">
                <FaShoppingCart className="text-xl md:text-2xl text-black" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-light-text dark:text-dark-text">
                Jewel<span className="text-gold-light dark:text-gold-dark">Lux</span>
              </span>
            </div>

            {/* CENTER: Links (Desktop Only) */}
            <nav className="hidden md:flex flex-grow justify-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  className="text-lg font-medium text-light-body dark:text-dark-body hover:text-gold-light dark:hover:text-gold-dark transition"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* RIGHT: Action Icons (Visible on Mobile & Desktop) */}
            <div className="flex items-center gap-3 md:gap-6">
              
              {/* Search (Desktop Only to save mobile space) */}
              <div className="hidden md:block">
                <IconBtn onClick={() => navigate("/search")}>
                  <FaSearch />
                </IconBtn>
              </div>

              {/* Wishlist & Cart (Always Visible) */}
              <BadgeIcon icon={<FaHeart />} count={wishlistCount} onClick={() => navigate("/wishlist")} />
              <BadgeIcon icon={<FaShoppingCart />} count={cartCount} onClick={() => navigate("/viewcart")} />

              {/* Dark Mode Toggle (Always Visible) */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="text-xl md:text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {/* User Icon (Always Visible, Outside Hamburger) */}
              <div className="relative group">
                <button 
                  onClick={() => navigate("/myaccount")}
                  className="text-xl md:text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition"
                >
                  <FaUser />
                </button>
                {/* Desktop Dropdown */}
                <div className="hidden md:block absolute right-0 pt-4 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden border border-light-section dark:border-dark-border">
                    <DropItem onClick={() => navigate("/auth")} text="Login" />
                    <DropItem onClick={() => navigate("/auth")} text="Register" />
                    <DropItem onClick={() => navigate("/myaccount")} text="My Account" />
                  </div>
                </div>
              </div>

              {/* Mobile Hamburger (Only visible on small screens) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-2xl text-gold-light hover:text-gold-dark focus:outline-none ml-1"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Sidebar */}
        <div 
          className={`fixed inset-0 bg-black/60 transition-opacity md:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
          onClick={() => setIsMenuOpen(false)} 
        />
        <div className={`fixed top-0 right-0 h-full w-64 bg-light-card dark:bg-dark-card shadow-2xl transition-transform duration-300 md:hidden z-[110] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 flex justify-between items-center border-b border-light-section dark:border-dark-border">
            <span className="font-bold text-gold-light uppercase tracking-widest">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-light-text dark:text-dark-text">
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { navigate(link.href); setIsMenuOpen(false); }}
                className="text-left py-3 px-4 rounded-xl text-light-text dark:text-dark-text hover:bg-light-section dark:hover:bg-dark-border transition"
              >
                {link.name}
              </button>
            ))}
            <hr className="border-light-section dark:border-dark-border my-2" />
            <button 
              onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} 
              className="text-left py-3 px-4 rounded-xl text-gold-light font-bold"
            >
              Account Login
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

// Reusable Sub-components
const IconBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition"
  >
    {children}
  </button>
);

const BadgeIcon = ({ icon, count, onClick }) => (
  <button
    onClick={onClick}
    className="relative text-xl md:text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition"
  >
    {icon}
    {count > 0 && (
      <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-gold-light text-black text-[10px] md:text-xs h-4 w-4 md:h-5 md:w-5 rounded-full flex items-center justify-center shadow font-bold">
        {count}
      </span>
    )}
  </button>
);

const DropItem = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-5 py-3 text-sm font-medium text-light-body dark:text-dark-body hover:bg-light-section dark:hover:bg-dark-border hover:text-gold-light transition"
  >
    {text}
  </button>
);

export default Navbar;