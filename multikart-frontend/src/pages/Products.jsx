// src/pages/Products.jsx
import { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const Products = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'necklaces', name: 'Necklaces' },
    { id: 'rings', name: 'Rings' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets' }
  ];

  // Sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Product data (27 products for pagination)
  const allProducts = [
    { id: 1, name: "Diamond Stud Earrings", price: 199, image: "/images/16.jpg", category: "earrings" },
    { id: 2, name: "Solitaire Engagement Ring", price: 599, image: "/images/10.jpg", category: "rings" },
    { id: 3, name: "Pearl Pendant Necklace", price: 249, image: "/images/4.jpg", category: "necklaces" },
    { id: 4, name: "Gold Chain Bracelet", price: 179, image: "/images/22.jpg", category: "bracelets" },
    { id: 5, name: "Hoop Earrings", price: 129, image: "/images/17.jpg", category: "earrings" },
    { id: 6, name: "Vintage Band Ring", price: 299, image: "/images/11.jpg", category: "rings" },
    { id: 7, name: "Sapphire Locket", price: 349, image: "/images/7.jpg", category: "necklaces" },
    { id: 8, name: "Tennis Bracelet", price: 449, image: "/images/23.jpg", category: "bracelets" },
    { id: 9, name: "Chandelier Earrings", price: 279, image: "/images/19.jpg", category: "earrings" },
    { id: 10, name: "Diamond Halo Ring", price: 799, image: "/images/13.jpg", category: "rings" },
    { id: 11, name: "Emerald Choker", price: 449, image: "/images/8.jpg", category: "necklaces" },
    { id: 12, name: "Beaded Gold Bracelet", price: 159, image: "/images/24.jpg", category: "bracelets" },
    { id: 13, name: "Minimalist Gold Earrings", price: 99, image: "/images/20.jpg", category: "earrings" },
    { id: 14, name: "Rose Gold Twist Ring", price: 249, image: "/images/14.jpg", category: "rings" },
    { id: 15, name: "Silver Filigree Necklace", price: 179, image: "/images/9.jpg", category: "necklaces" },
    { id: 16, name: "Layered Chain Bracelet", price: 199, image: "/images/25.jpg", category: "bracelets" },
    { id: 17, name: "Tassel Design Earrings", price: 159, image: "/images/21.jpg", category: "earrings" },
    { id: 18, name: "Eternity Band Ring", price: 499, image: "/images/15.jpg", category: "rings" },
    { id: 19, name: "Diamond Pendant Necklace", price: 299, image: "/images/5.jpg", category: "necklaces" },
    { id: 20, name: "Cuff Bracelet", price: 229, image: "/images/26.jpg", category: "bracelets" },
    { id: 21, name: "Pearl Drops Earrings", price: 149, image: "/images/17.jpg", category: "earrings" },
    { id: 22, name: "Gemstone Cluster Ring", price: 399, image: "/images/12.jpg", category: "rings" },
    { id: 23, name: "Locket Necklace", price: 199, image: "/images/6.jpg", category: "necklaces" },
    { id: 24, name: "Bangle Set", price: 279, image: "/images/27.jpg", category: "bracelets" },
    { id: 25, name: "Stud Earrings Set", price: 119, image: "/images/28.jpg", category: "earrings" },
    { id: 26, name: "Wedding Band", price: 349, image: "/images/29.jpg", category: "rings" },
    { id: 27, name: "Chain Necklace", price: 129, image: "/images/30.jpg", category: "necklaces" }
  ];

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  // Handle size filter toggle
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <a href="/" className={`text-sm ${
                  darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}>
                  Home
                </a>
              </li>
              <li>
                <svg className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Products
                </span>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`lg:w-1/4 rounded-xl p-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-sm`}>
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-accent-500 text-white'
                          : darkMode 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Price Range
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    ${priceRange[0]}
                  </span>
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    ${priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-accent-500"
                />
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-accent-500 text-white'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Product Count & Sorting */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Showing {currentProducts.length} of {filteredProducts.length} products
              </p>
              <div className="flex items-center space-x-4">
                <label htmlFor="sort" className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Sort by:
                </label>
                <select 
                  id="sort" 
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none`}
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group relative"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden rounded-lg mb-3">
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
                  <h3 className={`font-semibold text-sm mb-1 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {product.name}
                  </h3>
                  <p className={`font-bold text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentPage === 1
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : darkMode 
                          ? 'bg-gray-800 text-white hover:bg-gray-700' 
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                    } transition-colors shadow-sm`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === index + 1
                          ? 'bg-accent-500 text-white'
                          : darkMode 
                            ? 'bg-gray-800 text-white hover:bg-gray-700' 
                            : 'bg-white text-gray-900 hover:bg-gray-100'
                      } transition-colors shadow-sm`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentPage === totalPages
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : darkMode 
                          ? 'bg-gray-800 text-white hover:bg-gray-700' 
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                    } transition-colors shadow-sm`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;