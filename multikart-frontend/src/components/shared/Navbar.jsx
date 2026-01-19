// src/components/Navbar.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Mock cart count

  // Detect system preference and set initial dark mode
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Categories', href: '#' },
    { name: 'Deals', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar with subtle gradient */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-gray-900 dark:to-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* LEFT: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-white dark:bg-gray-700 p-2 rounded-xl shadow-md">
                <FaShoppingCart className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <span className="ml-3 text-xl font-bold text-white dark:text-primary-300 tracking-tight">
                Shop<span className="text-accent-400">Vista</span>
              </span>
            </div>

            {/* CENTER: Desktop Navigation */}
            <div className="hidden md:flex md:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-accent-300 dark:hover:text-accent-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* RIGHT: Icons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-white hover:text-accent-300 dark:hover:text-accent-400 p-2 rounded-full hover:bg-white/10 transition">
                <FaSearch className="h-5 w-5" />
              </button>
              
              <button className="relative text-white hover:text-success-300 dark:hover:text-success-400 p-2 rounded-full hover:bg-white/10 transition">
                <FaShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={toggleDarkMode}
                className="text-white hover:text-accent-300 dark:hover:text-accent-400 p-2 rounded-full hover:bg-white/10 transition"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-accent-300 dark:hover:text-accent-400 p-2 rounded-md focus:outline-none"
                aria-expanded="false"
              >
                {isMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-600 dark:bg-gray-800 border-t border-primary-700 dark:border-gray-700">
            <div className="pt-2 pb-3 space-y-1 px-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:bg-primary-700 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile action buttons */}
              <div className="mt-4 pt-4 border-t border-primary-700 dark:border-gray-700 flex space-x-4">
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg flex items-center justify-center">
                  <FaSearch className="mr-2" /> Search
                </button>
                <button className="flex-1 bg-success-500 hover:bg-success-600 text-white py-2 rounded-lg flex items-center justify-center">
                  <FaShoppingCart className="mr-2" /> Cart ({cartCount})
                </button>
              </div>
              
              <div className="mt-4 flex justify-center">
                <button 
                  onClick={toggleDarkMode}
                  className="text-white hover:text-accent-300 flex items-center"
                >
                  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;