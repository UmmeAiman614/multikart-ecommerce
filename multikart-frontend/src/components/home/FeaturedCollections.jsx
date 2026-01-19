// src/components/FeaturedCollections.jsx
import { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const FeaturedCollections = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  const collections = [
    {
      id: 1,
      name: "Diamond Elegance",
      description: "Timeless pieces featuring ethically sourced diamonds",
      price: "$299",
      image: "https://images.unsplash.com/photo-1608351731391-2d4e5b2c5f4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Gold Heritage",
      description: "Handcrafted 18K gold pieces with vintage inspiration",
      price: "$449",
      image: "https://images.unsplash.com/photo-1591070804470-2d4f5251c6b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Pearl Radiance",
      description: "Lustrous freshwater pearls with modern settings",
      price: "$199",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b37c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Simplified Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 px-4 py-1.5 rounded-full mb-6 text-sm font-medium">
            Premium Collections
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            Curated Jewelry Masterpieces
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Discover handcrafted pieces where tradition meets contemporary design
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div 
              key={collection.id}
              className={`group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-1 border ${
                darkMode 
                  ? 'bg-secondary-800 border-secondary-700' 
                  : 'bg-white border-secondary-200'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover Action Icons - Subtle Gold */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <button className="w-10 h-10 rounded-full bg-white/90 dark:bg-secondary-900 flex items-center justify-center text-secondary-700 dark:text-secondary-300 shadow-md hover:bg-accent-500 hover:text-white transition-all">
                    <FaHeart className="text-sm" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 dark:bg-secondary-900 flex items-center justify-center text-secondary-700 dark:text-secondary-300 shadow-md hover:bg-accent-500 hover:text-white transition-all">
                    <FaShoppingCart className="text-sm" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/90 dark:bg-secondary-900 flex items-center justify-center text-secondary-700 dark:text-secondary-300 shadow-md hover:bg-accent-500 hover:text-white transition-all">
                    <FaEye className="text-sm" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white">
                    {collection.name}
                  </h3>
                  <span className="font-bold text-secondary-900 dark:text-white">
                    {collection.price}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-secondary-400' : 'text-secondary-600'} mb-4`}>
                  {collection.description}
                </p>
                <a 
                  href="/products" 
                  className="w-full bg-secondary-900 dark:bg-secondary-700 text-white font-medium py-2.5 rounded-lg flex items-center justify-center hover:bg-secondary-800 dark:hover:bg-secondary-600 transition-colors"
                >
                  Explore Collection
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;