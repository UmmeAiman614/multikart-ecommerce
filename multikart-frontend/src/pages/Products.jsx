import { useState, useEffect } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/shared/Breadcrumb";

const Products = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter state

  const productsPerPage = 6;

  useEffect(() => {
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
  }, []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "necklaces", name: "Necklaces" },
    { id: "rings", name: "Rings" },
    { id: "earrings", name: "Earrings" },
    { id: "bracelets", name: "Bracelets" },
  ];

  const products = [
    { id: 1, name: "Diamond Stud Earrings", price: 199, image: "/images/16.jpg", category: "earrings" },
    { id: 2, name: "Solitaire Engagement Ring", price: 599, image: "/images/10.jpg", category: "rings" },
    { id: 3, name: "Pearl Pendant Necklace", price: 249, image: "/images/4.jpg", category: "necklaces" },
    { id: 4, name: "Gold Chain Bracelet", price: 179, image: "/images/22.jpg", category: "bracelets" },
    { id: 5, name: "Hoop Earrings", price: 129, image: "/images/17.jpg", category: "earrings" },
    { id: 6, name: "Vintage Band Ring", price: 299, image: "/images/11.jpg", category: "rings" },
    { id: 7, name: "Sapphire Locket", price: 349, image: "/images/7.jpg", category: "necklaces" },
    { id: 8, name: "Tennis Bracelet", price: 449, image: "/images/23.jpg", category: "bracelets" },
    { id: 9, name: "Chandelier Earrings", price: 279, image: "/images/19.jpg", category: "earrings" },
  ];

  /* ---------------- FILTER + SORT ---------------- */
  let filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      p.price <= priceRange
  );

  if (sortBy === "price-low") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "price-high") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === "name") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const breadcrumbPaths = [{ name: "Home", href: "/" }, { name: "Products" }];

  return (
    <div className="py-10 px-4 bg-light-bg dark:bg-dark-bg transition-colors min-h-screen relative">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb paths={breadcrumbPaths} />

        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 mb-6">
          <p className="text-sm text-light-body dark:text-dark-body font-medium">
            Showing <span className="text-gold-light">{filteredProducts.length}</span> products
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
             {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gold-light text-white rounded-lg text-sm font-bold"
            >
              <FaFilter size={12} /> Filter
            </button>

            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-none"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* MOBILE OVERLAY */}
          {isFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-[150] lg:hidden backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}
            />
          )}

          {/* SIDEBAR (Responsive) */}
          <aside className={`
            fixed inset-y-0 left-0 z-[200] w-72 bg-light-card dark:bg-dark-card p-6 shadow-2xl transition-transform duration-300 transform
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:translate-x-0 lg:w-1/4 lg:z-0 lg:shadow-sm lg:rounded-xl lg:border lg:border-light-section lg:dark:border-dark-border lg:block self-start
          `}>
            <div className="flex justify-between items-center mb-6 lg:mb-4">
              <h3 className="font-bold text-lg text-light-text dark:text-dark-text">Categories</h3>
              <button onClick={() => setIsFilterOpen(false)} className="lg:hidden text-light-body dark:text-dark-body">
                <FaTimes size={20} />
              </button>
            </div>

            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentPage(1);
                      setIsFilterOpen(false); // Auto close on mobile
                    }}
                    className={`w-full px-4 py-2.5 text-left rounded-lg text-sm font-medium transition
                      ${selectedCategory === cat.id
                        ? "bg-gold-light text-white shadow-md"
                        : "text-light-body dark:text-dark-body hover:bg-light-section dark:hover:bg-dark-border"
                      }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-light-section dark:border-dark-border">
              <h3 className="font-semibold mb-4 text-light-text dark:text-dark-text">Max Price: <span className="text-gold-light">${priceRange}</span></h3>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
                className="w-full accent-gold-light h-1.5 bg-gray-200 dark:bg-dark-border rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <section className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div key={product.id} className="group bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64 overflow-hidden bg-white">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  
                  {/* Hover Icons Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gold-light hover:bg-gold-light hover:text-white transition-all shadow-lg"><FaEye /></button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gold-light hover:bg-gold-light hover:text-white transition-all shadow-lg"><FaHeart /></button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 text-light-text dark:text-dark-text">{product.name}</h3>
                  <p className="font-bold text-gold-light mb-4">${product.price}</p>
                  <div className="flex gap-2">
                    <Link to={`/product/${product.id}`} className="flex-1 text-center text-[10px] font-bold uppercase py-2 border border-gold-light text-gold-light rounded hover:bg-gold-light hover:text-white transition">Details</Link>
                    <button className="flex-1 text-[10px] font-bold uppercase py-2 bg-gold-light text-white rounded hover:bg-gold-hover transition">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 mb-10">
            <div className="flex items-center gap-1 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border p-1.5 rounded-full">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="w-9 h-9 flex items-center justify-center hover:bg-gold-light hover:text-white rounded-full transition disabled:opacity-30"><FaChevronLeft size={12}/></button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-full text-xs font-bold ${currentPage === i + 1 ? "bg-gold-light text-white" : "hover:bg-light-section dark:hover:bg-dark-border"}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="w-9 h-9 flex items-center justify-center hover:bg-gold-light hover:text-white rounded-full transition disabled:opacity-30"><FaChevronRight size={12}/></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;