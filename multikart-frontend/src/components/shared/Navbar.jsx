import React, { useState, useEffect, useContext } from "react"; // Added useContext
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
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from context
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

            {/* RIGHT: Action Icons */}
            <div className="flex items-center gap-3 md:gap-6">
              
              <div className="hidden md:block">
                <IconBtn onClick={() => navigate("/search")}>
                  <FaSearch />
                </IconBtn>
              </div>

              <BadgeIcon icon={<FaHeart />} count={wishlistCount} onClick={() => navigate("/wishlist")} />
              <BadgeIcon icon={<FaShoppingCart />} count={cartCount} onClick={() => navigate("/viewcart")} />

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="text-xl md:text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {/* User Dropdown Integration */}
              <div className="relative group">
                <button 
                  onClick={() => navigate(user ? "/myaccount" : "/auth")}
                  className={`text-xl md:text-2xl transition flex items-center gap-2 ${
                    user ? 'text-gold-light' : 'text-light-body dark:text-dark-text hover:text-gold-light'
                  }`}
                >
                  <FaUser />
                </button>

                {/* Desktop Dropdown Content */}
                <div className="hidden md:block absolute right-0 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden border border-light-section dark:border-dark-border p-1">
                    {!user ? (
                      <>
                        <DropItem onClick={() => navigate("/auth")} text="Login" icon={<FaUser size={14}/>} />
                        <DropItem onClick={() => navigate("/auth")} text="Register" icon={<FaUser size={14}/>} />
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-2 border-b border-light-section dark:border-dark-border mb-1">
                          <p className="text-[10px] uppercase tracking-widest text-gold-light font-bold">Welcome</p>
                          <p className="text-sm font-bold truncate dark:text-white">{user.name}</p>
                        </div>
                        
                        {/* ADMIN ONLY BUTTON */}
                        {user.role === 'admin' && (
                          <DropItem 
                            onClick={() => navigate("/admin")} 
                            text="Admin Panel" 
                            icon={<FaUserShield className="text-gold-light"/>}
                            className="bg-gold-light/10 text-gold-light" 
                          />
                        )}

                        <DropItem onClick={() => navigate("/myaccount")} text="My Orders" icon={<FaShoppingCart size={14}/>} />
                        <hr className="border-light-section dark:border-dark-border my-1" />
                        <button 
                          onClick={logout}
                          className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm font-bold text-accent-rose hover:bg-accent-rose/10 transition rounded-xl"
                        >
                          <FaSignOutAlt size={14} /> Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-2xl text-gold-light focus:outline-none ml-1"
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
        <div className={`fixed top-0 right-0 h-full w-72 bg-light-card dark:bg-dark-card shadow-2xl transition-transform duration-300 md:hidden z-[110] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 flex justify-between items-center border-b border-light-section dark:border-dark-border">
             <div className="flex flex-col">
                <span className="font-bold text-gold-light uppercase tracking-widest text-xs">Navigation</span>
                {user && <span className="text-sm dark:text-white font-medium italic">Hi, {user.name.split(' ')[0]}</span>}
             </div>
            <button onClick={() => setIsMenuOpen(false)} className="text-2xl text-light-text dark:text-dark-text">
              <FaTimes />
            </button>
          </div>
          
          <div className="flex flex-col p-4 space-y-2">
            {/* Admin Button in Mobile Menu */}
            {user?.role === 'admin' && (
              <button
                onClick={() => { navigate("/admin"); setIsMenuOpen(false); }}
                className="flex items-center gap-3 py-3 px-4 rounded-xl bg-gold-light text-black font-bold transition shadow-lg shadow-gold-light/20 mb-2"
              >
                <FaUserShield /> Admin Dashboard
              </button>
            )}

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
            
            {!user ? (
              <button 
                onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} 
                className="text-left py-3 px-4 rounded-xl text-gold-light font-bold flex items-center gap-2"
              >
                <FaUser /> Account Login
              </button>
            ) : (
              <>
                <button 
                  onClick={() => { navigate("/myaccount"); setIsMenuOpen(false); }} 
                  className="text-left py-3 px-4 rounded-xl text-light-text dark:text-dark-text flex items-center gap-2"
                >
                  <FaUser /> My Account
                </button>
                <button 
                  onClick={logout} 
                  className="text-left py-3 px-4 rounded-xl text-accent-rose font-bold flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>
      <div className="h-20"></div>
    </>
  );
};

// Updated DropItem to support Icons and custom classNames
const DropItem = ({ text, onClick, icon, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition ${
      className || "text-light-body dark:text-dark-body hover:bg-light-section dark:hover:bg-dark-border hover:text-gold-light"
    }`}
  >
    {icon} {text}
  </button>
);

// (BadgeIcon and IconBtn remain same as your provided code)
const IconBtn = ({ children, onClick }) => (
  <button onClick={onClick} className="text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition">
    {children}
  </button>
);

const BadgeIcon = ({ icon, count, onClick }) => (
  <button onClick={onClick} className="relative text-xl md:text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition">
    {icon}
    {count > 0 && (
      <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-gold-light text-black text-[10px] md:text-xs h-4 w-4 md:h-5 md:w-5 rounded-full flex items-center justify-center shadow font-bold">
        {count}
      </span>
    )}
  </button>
);

export default Navbar;