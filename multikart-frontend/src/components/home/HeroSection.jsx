// src/components/HeroSection.jsx
import { useState, useEffect } from 'react';

// src/components/HeroSection.jsx
const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-light-bg dark:bg-dark-bg">
      
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.webp')" }}
      ></div>

      {/* Always dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-light-text dark:text-dark-text mb-6 tracking-tight">
          Timeless Elegance, <br />
          <span className="text-gold-light dark:text-gold-dark">Handcrafted</span> Just For You
        </h1>

        <p className="text-xl md:text-2xl text-light-body dark:text-dark-body mb-10 max-w-2xl leading-relaxed">
          Discover our exclusive collection of artisanal jewelry pieces crafted with ethically sourced diamonds and precious metals
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-accent-emerald dark:bg-accent-emeraldDark hover:dark:bg-accent-emeraldDark text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Shop Collection
          </button>

          <button className="border-2 border-gold-light dark:border-gold-dark text-gold-light dark:text-gold-dark hover:bg-gold-light/20 dark:hover:bg-gold-dark/30 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300">
            View Lookbook
          </button>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 w-full h-16 text-gold-light dark:text-gold-dark">
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
    </section>
  );
};

export default HeroSection;


