import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaTimes,
  FaSearch
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Breadcrumb from "../components/shared/Breadcrumb";
import { getAllProducts, getAllCategories, addToCart } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext"; 
import { useWishlist } from "../context/WishlistContext";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { addToCart: addToCartContext } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: "all", name: "All Products" }]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(10000);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  const productsPerPage = 6;

  // --- URL Search Term Logic ---
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || "";

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        setProducts(prodRes.data);
        const dynamicCats = catRes.data.map(c => ({ id: c._id, name: c.catName }));
        setCategories([{ id: "all", name: "All Products" }, ...dynamicCats]);
      } catch (error) {
        toast.error("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const catIdFromUrl = queryParams.get('category');
    if (catIdFromUrl) {
      setSelectedCategory(catIdFromUrl);
      setCurrentPage(1);
    } else {
      setSelectedCategory("all");
    }
  }, [location.search]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(location.search);
    if (value) params.set('search', value);
    else params.delete('search');
    navigate(`?${params.toString()}`, { replace: true });
    setCurrentPage(1);
  };

  /* ---------------- FILTER + SORT LOGIC ---------------- */
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const pCatId = typeof p.category === 'object' ? p.category?._id : p.category;
      const categoryMatch = selectedCategory === "all" || pCatId === selectedCategory;
      const currentPrice = p.isOnSale ? p.salePrice : p.price;
      const priceMatch = currentPrice <= priceRange;
      
      // New Search Match
      const nameMatch = p.name?.toLowerCase().includes(searchTerm);
      const skuMatch = p.sku?.toLowerCase().includes(searchTerm);

      return categoryMatch && priceMatch && (searchTerm ? (nameMatch || skuMatch) : true);
    });

    if (sortBy === "price-low") result.sort((a, b) => (a.isOnSale ? a.salePrice : a.price) - (b.isOnSale ? b.salePrice : b.price));
    if (sortBy === "price-high") result.sort((a, b) => (b.isOnSale ? b.salePrice : b.price) - (a.isOnSale ? a.salePrice : a.price));
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, selectedCategory, priceRange, sortBy, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to shop");
      return navigate("/auth");
    }
    try {
      setCartLoading(product._id);
      const priceToCharge = product.isOnSale ? product.salePrice : product.price;
      await addToCart({ product: product._id, quantity: 1, price: priceToCharge });
      addToCartContext({ ...product, price: priceToCharge, image: product.images?.[0] || "/placeholder-jewelry.jpg" }, 1);
      setAddedItem(product._id);
      toast.success(`${product.name} added!`);
      setTimeout(() => setAddedItem(null), 2000);
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setCartLoading(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gold-light uppercase tracking-widest font-bold">Loading Collection...</div>;

  return (
    <div className="py-10 px-4 bg-light-bg dark:bg-dark-bg transition-colors min-h-screen relative font-sans">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb paths={[{ name: "Home", href: "/" }, { name: "Products" }]} />

        {/* TOP BAR WITH SEARCH */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 mb-6">
          <div className="flex-1 w-full sm:w-auto">
             <div className="relative max-w-sm">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-light/60" />
                <input 
                  type="text" 
                  placeholder="Search jewelry..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:border-gold-light outline-none dark:text-dark-text"
                />
             </div>
             {searchTerm && <p className="text-[10px] text-gold-light mt-1 ml-1 uppercase font-bold tracking-widest">Results for: {searchTerm}</p>}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gold-light text-white rounded-lg text-sm font-bold shadow-md">
                <FaFilter size={12} /> Filter
              </button>
              <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }} className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-none dark:text-dark-text">
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}
          <aside className={`fixed inset-y-0 left-0 z-[200] w-72 bg-light-card dark:bg-dark-card p-6 shadow-2xl transition-transform duration-300 transform ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 lg:w-1/4 lg:z-0 lg:shadow-sm lg:rounded-xl lg:border lg:border-light-section lg:dark:border-dark-border lg:block self-start`}>
             <div className="flex justify-between items-center mb-6 lg:mb-4">
               <h3 className="font-bold text-lg text-light-text dark:text-dark-text uppercase tracking-widest">Categories</h3>
               <button onClick={() => setIsFilterOpen(false)} className="lg:hidden text-light-body dark:text-dark-body"><FaTimes size={20} /></button>
             </div>
             <ul className="space-y-2">
               {categories.map((cat) => (
                 <li key={cat.id}>
                   <button onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); setIsFilterOpen(false); }} className={`w-full px-4 py-2.5 text-left rounded-lg text-sm font-medium transition ${selectedCategory === cat.id ? "bg-gold-light text-white shadow-md" : "text-light-body dark:text-dark-body hover:bg-light-section dark:hover:bg-dark-border"}`}>{cat.name}</button>
                 </li>
               ))}
             </ul>
             <div className="mt-8 pt-6 border-t border-light-section dark:border-dark-border">
               <h3 className="font-semibold mb-4 text-light-text dark:text-dark-text">Max Price: <span className="text-gold-light">${priceRange}</span></h3>
               <input type="range" min="0" max="10000" value={priceRange} onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }} className="w-full accent-gold-light h-1.5 bg-gray-200 dark:bg-dark-border rounded-lg appearance-none cursor-pointer" />
             </div>
          </aside>

          {/* PRODUCTS GRID */}
          <section className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div key={product._id} className="group bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 overflow-hidden bg-white">
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {product.isOnSale && <span className="bg-accent-rose text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter">Sale</span>}
                    {product.isFeatured && <span className="bg-gold-light text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-tighter">Featured</span>}
                  </div>

                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder-jewelry.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Link to={`/product/${product._id}`} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gold-light hover:bg-gold-light hover:text-white transition-all shadow-lg"><FaEye /></Link>
                    <button onClick={() => toggleWishlist(product)} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${isInWishlist(product._id) ? "bg-red-500 text-white" : "bg-white text-gold-light hover:bg-gold-light hover:text-white"}`}><FaHeart /></button>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-sm mb-1 text-light-text dark:text-dark-text line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {product.isOnSale ? (
                      <><p className="font-bold text-gold-light">${product.salePrice}</p><p className="text-xs text-light-muted line-through opacity-60">${product.price}</p></>
                    ) : (
                      <p className="font-bold text-gold-light">${product.price}</p>
                    )}
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Link to={`/product/${product._id}`} className="flex-1 text-center text-[10px] font-bold uppercase py-2 border border-gold-light text-gold-light rounded hover:bg-gold-light hover:text-white transition">Details</Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={cartLoading === product._id}
                      className={`flex-1 text-[10px] font-bold uppercase py-2 rounded transition flex items-center justify-center gap-2 ${addedItem === product._id ? "bg-green-600 text-white" : "bg-gold-light text-white hover:bg-gold-hover"} disabled:opacity-70`}
                    >
                      {cartLoading === product._id ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : addedItem === product._id ? <>✓ Added!</> : <><FaShoppingCart size={12} /> Add</>}
                    </button>
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
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="w-9 h-9 flex items-center justify-center hover:bg-gold-light hover:text-white rounded-full transition disabled:opacity-30 dark:text-dark-text"><FaChevronLeft size={12} /></button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-full text-xs font-bold ${currentPage === i + 1 ? "bg-gold-light text-white" : "hover:bg-light-section dark:hover:bg-dark-border dark:text-dark-text"}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="w-9 h-9 flex items-center justify-center hover:bg-gold-light hover:text-white rounded-full transition disabled:opacity-30 dark:text-dark-text"><FaChevronRight size={12} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;