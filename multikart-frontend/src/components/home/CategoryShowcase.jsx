// src/components/CategoryShowcase.jsx
import { useState, useEffect } from 'react';

const CategoryShowcase = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Correct Jewelry Categories
  const categories = [
    {
      id: 'earrings',
      categoryLabel: "EARRINGS",
      name: "Diamond Stud Earrings",
      description: "Timeless elegance for everyday wear",
      image: "/images/16.jpg",
      shopLink: "/products?category=earrings"
    },
    {
      id: 'rings',
      categoryLabel: "RINGS",
      name: "Solitaire Engagement Rings",
      description: "Symbolize your love with perfect brilliance",
      image: "/images/10.jpg",
      shopLink: "/products?category=rings"
    },
    {
      id: 'necklaces',
      categoryLabel: "NECKLACES",
      name: "Pearl Pendant Necklaces",
      description: "Classic sophistication for any occasion",
      image: "/images/4.jpg",
      shopLink: "/products?category=necklaces"
    },
    {
      id: 'bracelets',
      categoryLabel: "BRACELETS",
      name: "Gold Chain Bracelets",
      description: "Layered luxury for your wrist",
      image: "/images/22.jpg",
      shopLink: "/products?category=bracelets"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop By Category
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover our curated collections of fine jewelry
          </p>
        </div>

        {/* 2x2 Grid - Simple White Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x600/f1f5f9/64748b?text=Jewelry+Collection";
                    e.target.className = "w-full h-full object-cover bg-gray-200 dark:bg-gray-800";
                  }}
                />
                
                {/* Text Overlay - Right side, bold colors */}
                <div className="absolute top-6 right-6 max-w-[60%]">
                  <div className="mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wide ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {category.categoryLabel}
                    </span>
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm mb-4 ${
                    darkMode ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {category.description}
                  </p>
                  <a 
                    href={category.shopLink}
                    className={`inline-flex items-center text-sm font-bold border-b-2 border-transparent hover:border-accent-500 ${
                      darkMode ? 'text-white hover:text-accent-300' : 'text-gray-900 hover:text-accent-500'
                    } transition-colors`}
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;