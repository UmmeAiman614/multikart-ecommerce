// src/components/HeroSection.jsx
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Detect system preference (matches your Navbar logic)
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Full-width background image with overlay */}
      <div 
        className="w-full h-[80vh] md:h-[90vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero.webp')"
        }}
      >
        {/* Dark/light overlay using your custom colors */}
        <div className={`absolute inset-0 ${darkMode ? 'bg-secondary-900/80' : 'bg-gradient-to-r from-secondary-900/90 to-secondary-900/70'}`}></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Timeless Elegance, <br />
              <span className="text-accent-400">Handcrafted</span> Just For You
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover our exclusive collection of artisanal jewelry pieces crafted with ethically sourced diamonds and precious metals
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent-500/30">
                Shop Collection
              </button>
              
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
                View Lookbook
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave using your secondary color */}
      <div className={`absolute bottom-0 left-0 w-full h-16 ${darkMode ? 'text-secondary-900' : 'text-white'}`}>
        <svg 
          viewBox="0 0 1440 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path 
            d="M0 30C240 10 480 90 720 90C960 90 1200 10 1440 30V100H0V30Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;