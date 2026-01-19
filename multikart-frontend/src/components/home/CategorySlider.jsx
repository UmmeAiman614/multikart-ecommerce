// src/components/CategorySlider.jsx
import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const CategorySlider = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('necklaces');
  const sliderRef = useRef(null);

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Product data by category
  const products = {
    necklaces: [
      { id: 1, name: "Diamond Pendant", price: "$299", image: "/images/4.jpg" },
      { id: 2, name: "Gold Chain", price: "$199", image: "/images/5.jpg" },
      { id: 3, name: "Pearl Necklace", price: "$249", image: "/images/6.jpg" },
      { id: 4, name: "Sapphire Locket", price: "$349", image: "/images/7.jpg" },
      { id: 5, name: "Emerald Choker", price: "$449", image: "/images/8.jpg" },
      { id: 6, name: "Silver Filigree", price: "$179", image: "/images/9.jpg" }
    ],
    rings: [
      { id: 7, name: "Solitaire Ring", price: "$599", image: "/images/10.jpg" },
      { id: 8, name: "Vintage Band", price: "$299", image: "/images/11.jpg" },
      { id: 9, name: "Gemstone Cluster", price: "$399", image: "/images/12.jpg" },
      { id: 10, name: "Diamond Halo", price: "$799", image: "/images/13.jpg" },
      { id: 11, name: "Rose Gold Twist", price: "$249", image: "/images/14.jpg" },
      { id: 12, name: "Eternity Band", price: "$499", image: "/images/15.jpg" }
    ],
    earrings: [
      { id: 13, name: "Diamond Studs", price: "$199", image: "/images/16.jpg" },
      { id: 14, name: "Pearl Drops", price: "$149", image: "/images/17.jpg" },
      { id: 15, name: "Hoop Earrings", price: "$129", image: "/images/18.jpg" },
      { id: 16, name: "Chandelier Gems", price: "$279", image: "/images/19.jpg" },
      { id: 17, name: "Minimalist Gold", price: "$99", image: "/images/20.jpg" },
      { id: 18, name: "Tassel Design", price: "$159", image: "/images/21.jpg" }
    ]
  };

  const categories = [
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'rings', name: 'Rings' },
    { id: 'earrings', name: 'Earrings' }
  ];

  // Scroll functions
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Our Products
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-secondary-400' : 'text-secondary-600'}`}>
            Discover our curated collection of handcrafted jewelry pieces designed to elevate your everyday elegance
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className={`inline-flex p-1 rounded-xl ${
            darkMode ? 'bg-secondary-800' : 'bg-secondary-100'
          }`}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-white text-secondary-900 dark:bg-secondary-700 dark:text-white shadow-sm'
                    : darkMode 
                      ? 'text-secondary-400 hover:text-white' 
                      : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-secondary-800 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-secondary-700 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5 text-secondary-700 dark:text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-secondary-800 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-secondary-700 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5 text-secondary-700 dark:text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Horizontal Slider */}
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide pb-6 space-x-8 -mx-2 px-2"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {products[activeCategory].map((product) => (
              <div 
                key={product.id}
                className={`flex-shrink-0 w-64 group relative ${darkMode ? 'bg-secondary-800' : 'bg-white'} rounded-xl shadow-md border ${
                  darkMode ? 'border-secondary-700' : 'border-secondary-200'
                } overflow-hidden`}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x600/f1f5f9/64748b?text=Jewelry";
                      e.target.className = "w-full h-full object-cover bg-secondary-200 dark:bg-secondary-800";
                    }}
                  />
                  
                  {/* Hover Overlay - Icons Slide In */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Icons Container - Slides from left */}
                    <div className="absolute top-4 left-4 flex space-x-2 transform translate-x-[-20px] group-hover:translate-x-0 transition-transform duration-300">
                      <button className="w-9 h-9 rounded-full bg-white/90 dark:bg-secondary-900 flex items-center justify-center text-secondary-700 dark:text-secondary-300 shadow-md hover:bg-accent-500 hover:text-white transition-all">
                        <FaHeart className="text-xs" />
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white/90 dark:bg-secondary-900 flex items-center justify-center text-secondary-700 dark:text-secondary-300 shadow-md hover:bg-accent-500 hover:text-white transition-all">
                        <FaEye className="text-xs" />
                      </button>
                    </div>
                    
                    {/* Add to Cart Button - Slides Up */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <button className="bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors flex items-center shadow-lg">
                        <FaShoppingCart className="mr-1.5 text-xs" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className={`font-semibold text-sm mb-1 ${darkMode ? 'text-white' : 'text-secondary-900'}`}>
                    {product.name}
                  </h3>
                  <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-secondary-900'}`}>
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;