// src/components/FeaturedProductsSlider.jsx
import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const FeaturedProductsSlider = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Product data - 12 products total (2 slides × 6 products)
  const products = [
    { id: 1, name: "Diamond Stud Earrings", price: "$199", image: "/images/16.jpg", category: "Earrings" },
    { id: 2, name: "Solitaire Engagement Ring", price: "$599", image: "/images/10.jpg", category: "Rings" },
    { id: 3, name: "Pearl Pendant Necklace", price: "$249", image: "/images/4.jpg", category: "Necklaces" },
    { id: 4, name: "Gold Chain Bracelet", price: "$179", image: "/images/22.jpg", category: "Bracelets" },
    { id: 5, name: "Hoop Earrings", price: "$129", image: "/images/17.jpg", category: "Earrings" },
    { id: 6, name: "Vintage Band Ring", price: "$299", image: "/images/11.jpg", category: "Rings" },
    { id: 7, name: "Sapphire Locket", price: "$349", image: "/images/7.jpg", category: "Necklaces" },
    { id: 8, name: "Tennis Bracelet", price: "$449", image: "/images/23.jpg", category: "Bracelets" },
    { id: 9, name: "Chandelier Earrings", price: "$279", image: "/images/19.jpg", category: "Earrings" },
    { id: 10, name: "Diamond Halo Ring", price: "$799", image: "/images/13.jpg", category: "Rings" },
    { id: 11, name: "Emerald Choker", price: "$449", image: "/images/8.jpg", category: "Necklaces" },
    { id: 12, name: "Beaded Gold Bracelet", price: "$159", image: "/images/24.jpg", category: "Bracelets" }
  ];

  // Calculate slides (6 products per slide)
  const slides = [];
  for (let i = 0; i < products.length; i += 6) {
    slides.push(products.slice(i, i + 6));
  }

  // Auto-slide functionality
  useEffect(() => {
    // Start auto-slide
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // Change slide every 4 seconds

    // Cleanup on unmount
    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [slides.length]);

  // Pause auto-slide when user interacts
  const pauseAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  // Resume auto-slide after interaction
  const resumeAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
  };

  const nextSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(resumeAutoSlide, 4000);
  };

  const prevSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(resumeAutoSlide, 4000);
  };

  const goToSlide = (index) => {
    pauseAutoSlide();
    setCurrentSlide(index);
    setTimeout(resumeAutoSlide, 4000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Our most popular jewelry pieces loved by customers worldwide
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Content */}
          <div 
            ref={sliderRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  {/* 2 Rows Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Row 1: First 3 products */}
                    <div className="md:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {slide.slice(0, 3).map((product) => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            darkMode={darkMode} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Row 2: Next 3 products */}
                    <div className="md:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {slide.slice(3, 6).map((product) => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            darkMode={darkMode} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-accent-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, darkMode }) => {
  return (
    <div 
      className={`group relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x600/f1f5f9/64748b?text=Jewelry";
            e.target.className = "w-full h-full object-cover bg-gray-200 dark:bg-gray-800";
          }}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-4 space-y-2">
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md hover:bg-accent-500 hover:text-white transition-all">
              <FaHeart className="text-xs" />
            </button>
            <button className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900 flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md hover:bg-accent-500 hover:text-white transition-all">
              <FaEye className="text-xs" />
            </button>
          </div>
          <button className="bg-accent-500 hover:bg-accent-600 text-white text-xs font-medium py-1.5 px-3 rounded-full transition-colors flex items-center">
            <FaShoppingCart className="mr-1 text-xs" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <span className={`text-xs font-medium uppercase tracking-wide ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {product.category}
        </span>
        <h3 className={`font-semibold text-sm mb-1 mt-1 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {product.name}
        </h3>
        <p className={`font-bold text-sm ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default FeaturedProductsSlider;