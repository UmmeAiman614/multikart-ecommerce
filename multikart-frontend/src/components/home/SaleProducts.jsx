import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSaleProducts } from '../../api/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Loader2, Zap, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);
  
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Handle Scroll Progress Line
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      const progress = (scrollLeft / totalScroll) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const fetchSale = async () => {
      try {
        setLoading(true);
        const res = await getSaleProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("Sale products error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSale();
  }, []);

  if (loading) return (
    <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-gold-light" size={40} /></div>
  );

  if (products.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-light-section dark:bg-dark-bg transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-red-500 font-black uppercase tracking-[0.3em] text-[10px]">
              <Zap size={14} fill="currentColor" />
              <span>Flash Deals</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic font-bold text-light-text dark:text-dark-text">
              The <span className="text-gold-light">Sale</span> Edit
            </h2>
          </div>
          <p className="text-light-muted dark:text-dark-muted max-w-xs text-sm font-medium">
            Exclusive discounts on our most coveted pieces.
          </p>
        </div>

        {/* Horizontal Scroll Wrapper */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 md:gap-8 pb-10 no-scrollbar snap-x snap-mandatory"
        >
          {products.map((product) => {
            const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
            
            return (
              <div 
                key={product._id}
                className="min-w-[280px] sm:min-w-[350px] md:min-w-[450px] snap-center group relative bg-white dark:bg-dark-card rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-transparent hover:border-gold-light/20 transition-all duration-500 shadow-lg"
              >
                <div className="flex h-48 sm:h-56 md:h-64">
                  {/* Left: Product Image - Fixed for visibility */}
                  <div className="w-2/5 relative bg-gray-50 dark:bg-neutral-800 overflow-hidden">
                    <img 
                      src={product.images?.[0] || "/placeholder.jpg"} 
                      className="w-full h-full object-contain p-2 transition-transform duration-1000 group-hover:scale-110"
                      alt={product.name}
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg">
                      -{discount}%
                    </div>
                  </div>

                  {/* Right: Info Area */}
                  <div className="w-3/5 p-4 md:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-gold-light text-[8px] md:text-[9px] font-black uppercase tracking-widest truncate mr-2">
                          {product.category?.catName}
                        </span>
                        <button 
                          onClick={() => toggleWishlist(product)}
                          className={`${isInWishlist(product._id) ? 'text-red-500' : 'text-gray-400'} hover:scale-110 transition-transform`}
                        >
                          <Heart size={18} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                      
                      <h3 
                        className="text-sm md:text-xl font-serif italic font-bold text-light-text dark:text-dark-text mt-2 leading-tight cursor-pointer line-clamp-2"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        {product.name}
                      </h3>
                      
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg md:text-2xl font-bold text-light-text dark:text-dark-text">${product.salePrice}</span>
                        <span className="text-xs line-through text-gray-400">${product.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button 
                        onClick={() => { addToCart(product); toast.success("Added to Bag"); }}
                        className="flex-1 bg-gold-light hover:bg-gold-hover text-white py-2 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} /> <span className="hidden sm:inline">Add</span>
                      </button>
                      <button 
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl border border-gray-200 dark:border-neutral-700 text-light-text dark:text-dark-text hover:bg-black hover:text-white transition-all"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-6 w-full h-[2px] bg-gray-200 dark:bg-neutral-800 relative rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-gold-light transition-all duration-150 rounded-full"
            style={{ width: `${Math.max(10, scrollProgress)}%` }} // Minimum 10% dikhegi
          ></div>
        </div>
      </div>
    </section>
  );
};

export default SaleProducts;