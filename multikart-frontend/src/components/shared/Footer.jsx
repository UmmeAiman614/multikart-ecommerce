// src/components/Footer.jsx
import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Footer sections data
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Necklaces", href: "/products?category=necklaces" },
        { name: "Rings", href: "/products?category=rings" },
        { name: "Earrings", href: "/products?category=earrings" },
        { name: "Bracelets", href: "/products?category=bracelets" },
        { name: "New Arrivals", href: "/products?new=true" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping Policy", href: "/shipping" },
        { name: "Returns & Exchanges", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Story", href: "/story" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" }
      ]
    }
  ];

  return (
    <footer className={`pt-16 pb-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-md">
                <svg className="h-8 w-8 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Shop<span className="text-accent-500">Vista</span>
              </span>
            </div>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Crafting timeless jewelry pieces with ethically sourced materials and exceptional craftsmanship since 2010.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebookF, href: "#" },
                { icon: FaTwitter, href: "#" },
                { icon: FaInstagram, href: "#" },
                { icon: FaPinterestP, href: "#" },
                { icon: FaYoutube, href: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  } transition-colors shadow-sm`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className={`text-lg font-semibold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`block text-sm ${
                        darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      } transition-colors`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          <div>
            <h3 className={`text-lg font-semibold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Stay Updated
            </h3>
            <p className={`mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Subscribe to receive updates, exclusive offers, and new arrivals.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition-colors`}
              />
              <button
                type="submit"
                className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-4 md:mb-0`}>
              &copy; {new Date().getFullYear()} ShopVista. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`text-sm ${
                    darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-600 hover:text-gray-900'
                  } transition-colors`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;