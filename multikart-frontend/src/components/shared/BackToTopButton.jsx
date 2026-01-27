import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      const scrollPos = window.pageYOffset || 
                        document.documentElement.scrollTop || 
                        (event.target.scrollTop || 0);

      if (scrollPos > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const scrollToTop = () => {
    const scrollOptions = { top: 0, behavior: "smooth" };
    window.scrollTo(scrollOptions);
    document.documentElement.scrollTo(scrollOptions);
    
    const mainContent = document.querySelector('main') || document.querySelector('.min-h-screen');
    if (mainContent) mainContent.scrollTo(scrollOptions);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-10 right-6 md:right-10 z-[999999]
        flex items-center justify-center
        w-12 h-12 md:w-14 md:h-14
        rounded-full border border-white/30
        bg-gradient-to-br from-[#D4AF37] via-[#F1D38A] to-[#B8860B]
        text-white shadow-[0_8px_30px_rgb(0,0,0,0.2)]
        backdrop-blur-sm transition-all duration-500 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'}
        hover:shadow-[0_15px_35px_rgba(212,175,55,0.4)]
        hover:-translate-y-2 active:scale-90
      `}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Effect */}
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping"></span>
        <FaChevronUp className="relative z-10 text-lg md:text-xl drop-shadow-md" />
      </div>
    </button>
  );
};

export default BackToTopButton;