import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSaleProducts } from '../../api/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Loader2, Zap, ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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
    <section className="py-24 bg-light-section dark:bg-dark-bg transition-colors duration-500 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Header with Accent Rose color */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent-roseDark font-black uppercase tracking-[0.3em] text-[10px]">
              <Zap size={14} fill="currentColor" />
              <span>Flash Deals</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic font-bold text-light-text dark:text-dark-text">
              The <span className="text-gold-light">Sale</span> Edit
            </h2>
          </div>
          <p className="text-light-muted dark:text-dark-muted max-w-xs text-sm font-medium">
            Exclusive discounts on our most coveted pieces. Once they're gone, they're gone.
          </p>
        </div>

        {/* Horizontal Scroll Wrapper */}
        <div className="flex overflow-x-auto gap-8 pb-10 no-scrollbar snap-x snap-mandatory">
          {products.map((product) => {
            const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);
            
            return (
              <div 
                key={product._id}
                className="min-w-[320px] md:min-w-[450px] snap-center group relative bg-light-card dark:bg-dark-card rounded-[2rem] overflow-hidden border border-transparent hover:border-gold-light/20 transition-all duration-500 shadow-xl"
              >
                <div className="flex h-full">
                  {/* Left: Product Image */}
                  <div className="w-2/5 relative overflow-hidden">
                    <img 
                      src={product.images?.[0] || "/placeholder.jpg"} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={product.name}
                    />
                    <div className="absolute top-4 left-4 bg-accent-rose text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-lg">
                      -{discount}%
                    </div>
                  </div>

                  {/* Right: Info Area */}
                  <div className="w-3/5 p-6 flex flex-col justify-between bg-light-card dark:bg-dark-card">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-gold-light text-[9px] font-black uppercase tracking-widest">{product.category?.catName}</span>
                        <button 
                          onClick={() => toggleWishlist(product)}
                          className={`${isInWishlist(product._id) ? 'text-accent-roseDark' : 'text-light-muted dark:text-dark-muted'} hover:scale-110 transition-transform`}
                        >
                          <Heart size={18} fill={isInWishlist(product._id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                      
                      <h3 
                        className="text-xl font-serif italic font-bold text-light-text dark:text-dark-text mt-2 leading-tight cursor-pointer"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        {product.name}
                      </h3>
                      
                      <div className="mt-4 flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-light-text dark:text-dark-text">${product.salePrice}</span>
                        <span className="text-sm line-through text-light-muted dark:text-dark-muted">${product.price}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-6">
                      <button 
                        onClick={() => { addToCart(product); toast.success("Added to Bag"); }}
                        className="flex-1 bg-gold-light hover:bg-gold-hover text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} /> Add
                      </button>
                      <button 
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl border border-light-section dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-text hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
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

        {/* Custom Progress Bar for Scroll */}
        <div className="mt-10 w-full h-[2px] bg-light-section dark:bg-dark-border relative">
          <div className="absolute top-0 left-0 h-full bg-gold-light w-1/4 transition-all duration-300"></div>
        </div>
      </div>
    </section>
  );
};

export default SaleProducts;