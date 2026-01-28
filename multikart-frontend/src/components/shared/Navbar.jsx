import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
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
import { useCart } from "../../context/CartContext"; 
import { useWishlist } from "../../context/WishlistContext"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart(); 
  const { wishlist } = useWishlist(); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const cartCount = cartItems?.length || 0;
  const wishlistCount = wishlist?.length || 0;
  
  const navigate = useNavigate();
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 z-[100] w-full">
        <div className="bg-light-bg dark:bg-dark-bg border-b border-dark-border shadow-lg w-full transition-colors duration-300">
          <div className="flex items-center justify-between h-20 px-4 md:px-8 max-w-[1440px] mx-auto">
            
            {/* LEFT: Logo */}
            <div className="flex items-center gap-2 md:gap-4 cursor-pointer flex-shrink-0" onClick={() => navigate("/")}>
              <div className="bg-gold-light dark:bg-gold-dark p-2 md:p-3 rounded-xl md:rounded-2xl shadow-md">
                <FaShoppingCart className="text-xl md:text-2xl text-black" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-light-text dark:text-dark-text tracking-tight">
                Jewel<span className="text-gold-light dark:text-gold-dark">Lux</span>
              </span>
            </div>

            {/* CENTER: Links (Desktop Only) */}
            <nav className="hidden md:flex flex-grow justify-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  className={`text-lg font-medium transition-all relative py-1
                    ${isActive(link.href) ? "text-gold-light" : "text-light-body dark:text-dark-body hover:text-gold-light"}
                  `}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-gold-light rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* RIGHT: Action Icons */}
            <div className="flex items-center gap-3 md:gap-6">
              
              {/* Desktop Only Icons */}
              <div className="hidden md:flex items-center gap-5">
                <BadgeIcon icon={<FaHeart />} count={wishlistCount} onClick={() => navigate("/wishlist")} />
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition"
                >
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              </div>

              {/* Always Visible: Cart */}
              <BadgeIcon icon={<FaShoppingCart />} count={cartCount} onClick={() => navigate("/viewcart")} />

              {/* User Section (Updated with Image Logic) */}
              <div className="hidden md:block relative group">
                <button 
                  onClick={() => navigate(user ? "/myaccount" : "/auth")}
                  className="flex items-center justify-center transition focus:outline-none"
                >
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt="Profile" 
                      className="w-9 h-9 rounded-full object-cover border-2 border-gold-light shadow-sm"
                    />
                  ) : (
                    <div className={`text-2xl ${user ? 'text-gold-light' : 'text-light-body dark:text-dark-text hover:text-gold-light'}`}>
                      <FaUser />
                    </div>
                  )}
                </button>

                {user && (
                  <div className="absolute right-0 pt-4 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-light-card dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden border border-light-section dark:border-dark-border p-1">
                        <div className="px-4 py-2 border-b dark:border-dark-border text-center">
                          <p className="text-[10px] uppercase text-gold-light font-bold">Welcome</p>
                          <p className="text-sm font-bold truncate dark:text-white">{user.name}</p>
                        </div>
                        
                        {user.role === 'admin' && (
                          <DropItem 
                            onClick={() => navigate("/admin")} 
                            text="Admin Dashboard" 
                            icon={<FaUserShield className="text-gold-light"/>}
                            className="bg-gold-light/10 text-gold-light" 
                          />
                        )}

                        <DropItem onClick={() => navigate("/myaccount")} text="My Orders" icon={<FaShoppingCart size={14}/>} />
                        <hr className="dark:border-dark-border my-1" />
                        <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition">
                          <FaSignOutAlt size={14} /> Logout
                        </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl text-gold-light ml-1 focus:outline-none">
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Sidebar */}
        <div className={`fixed inset-0 bg-black/60 md:hidden transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)} />
        <div className={`fixed top-0 right-0 h-full w-72 bg-light-card dark:bg-dark-card shadow-2xl transition-transform duration-300 md:hidden z-[110] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="p-6 flex justify-between items-center border-b dark:border-dark-border">
             <span className="font-bold text-gold-light uppercase tracking-widest text-xs">Menu</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-2xl dark:text-white"><FaTimes /></button>
          </div>
          
          <div className="flex flex-col p-4 space-y-2">
            {/* Mobile Mode & Wishlist Quick Access */}
            <div className="flex justify-around items-center py-4 bg-light-bg dark:bg-dark-bg rounded-2xl mb-4 border border-light-section dark:border-dark-border">
               <button onClick={() => setDarkMode(!darkMode)} className="flex flex-col items-center gap-1 text-gold-light">
                  {darkMode ? <FaSun size={20}/> : <FaMoon size={20}/>}
                  <span className="text-[10px] uppercase font-bold text-light-body dark:text-dark-body">Mode</span>
               </button>
               <button onClick={() => {navigate("/wishlist"); setIsMenuOpen(false)}} className="flex flex-col items-center gap-1 text-gold-light relative">
                  <FaHeart size={20}/>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] h-4 w-4 rounded-full flex items-center justify-center font-bold border border-white">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-bold text-light-body dark:text-dark-body">Wishlist</span>
               </button>
            </div>

            {/* Links */}
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => { navigate(link.href); setIsMenuOpen(false); }}
                className={`text-left py-3 px-4 rounded-xl transition flex justify-between items-center
                  ${isActive(link.href) ? "bg-gold-light/10 text-gold-light font-bold" : "text-light-text dark:text-dark-text hover:bg-light-section dark:hover:bg-dark-border"}`}
              >
                {link.name}
                {isActive(link.href) && <div className="w-1.5 h-1.5 rounded-full bg-gold-light" />}
              </button>
            ))}
            
            <hr className="dark:border-dark-border my-2" />
            
            {!user ? (
              <button onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} className="text-left py-3 px-4 rounded-xl text-gold-light font-bold flex items-center gap-2">
                <FaUser /> Account Login
              </button>
            ) : (
              <div className="space-y-1">
                {/* Mobile Profile Header */}
                <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-xl">
                  {user.image ? (
                    <img src={user.image} alt="User" className="w-10 h-10 rounded-full object-cover border border-gold-light" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold-light/20 flex items-center justify-center text-gold-light"><FaUser /></div>
                  )}
                  <div className="flex flex-col truncate">
                    <span className="text-[10px] text-gold-light font-bold uppercase">Member</span>
                    <span className="text-sm font-bold dark:text-white truncate">{user.name}</span>
                  </div>
                </div>

                {user.role === 'admin' && (
                  <button onClick={() => { navigate("/admin"); setIsMenuOpen(false); }} className="w-full flex items-center gap-2 py-3 px-4 rounded-xl bg-gold-light text-black font-bold mb-2">
                    <FaUserShield /> Admin Dashboard
                  </button>
                )}
                <button onClick={() => { navigate("/myaccount"); setIsMenuOpen(false); }} className="w-full text-left py-3 px-4 rounded-xl text-light-text dark:text-dark-text flex items-center gap-2">
                  <FaUser /> My Profile
                </button>
                <button onClick={logout} className="w-full text-left py-3 px-4 rounded-xl text-red-500 font-bold flex items-center gap-2">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="h-20"></div>
    </>
  );
};

const DropItem = ({ text, onClick, icon, className = "" }) => (
  <button onClick={onClick} className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition ${className || "text-light-body dark:text-dark-body hover:bg-gold-light/10 hover:text-gold-light"}`}>
    {icon} {text}
  </button>
);

const BadgeIcon = ({ icon, count, onClick }) => (
  <button onClick={onClick} className="relative text-xl md:text-2xl text-light-body dark:text-dark-text hover:text-gold-light transition">
    {icon}
    {count > 0 && (
      <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-gold-light text-black text-[9px] md:text-xs h-4 w-4 md:h-5 md:w-5 rounded-full flex items-center justify-center shadow-md font-black border border-white">
        {count}
      </span>
    )}
  </button>
);

export default Navbar;