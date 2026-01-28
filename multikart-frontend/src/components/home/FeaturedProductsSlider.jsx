import { useState, useEffect } from "react";
import { FaHeart, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "../../api/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Loader2, Diamond } from "lucide-react";
import { toast } from "react-hot-toast";

const FeaturedProductsSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  
  // Touch States
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await getFeaturedProducts();
        setProducts(res.data || []);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchFeatured();
  }, []);

  const nextSlide = () => {
    if (currentIndex < products.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    } else { setCurrentIndex(0); }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else { setCurrentIndex(products.length - itemsPerView); }
  };

  // --- SWIPE LOGIC ---
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide(); // Swipe Left to go Next
    if (distance < -50) prevSlide(); // Swipe Right to go Prev
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-gold-light" size={40} /></div>;

  return (
    <section className="py-16 md:py-24 px-4 bg-light-bg dark:bg-dark-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header - Isko thoda aur clean kiya */}
        <div className="text-center mb-16 space-y-2">
          <div className="flex justify-center items-center gap-2 text-gold-light">
            <Diamond size={14} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Curated Selection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif italic font-medium dark:text-white">
            Featured <span className="text-gold-light">Gems</span>
          </h2>
        </div>

        <div className="relative">
          {/* Navigation Buttons - Inhein thoda aur stylish kiya */}
          <button onClick={prevSlide} className="absolute -left-5 lg:-left-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur shadow-lg hidden md:flex items-center justify-center text-gold-light border border-gold-light/20 hover:bg-gold-light hover:text-white transition-all duration-300">
            <FaChevronLeft size={14}/>
          </button>
          <button onClick={nextSlide} className="absolute -right-5 lg:-right-12 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur shadow-lg hidden md:flex items-center justify-center text-gold-light border border-gold-light/20 hover:bg-gold-light hover:text-white transition-all duration-300">
            <FaChevronRight size={14}/>
          </button>

          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" 
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product) => (
                <div 
                  key={product._id} 
                  className="flex-shrink-0 px-3 md:px-6" 
                  /* Desktop par width control karne ke liye max-width add ki */
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="max-w-[380px] mx-auto"> {/* Card ki width limit set ki */}
                    <ProductCard 
                      product={product} 
                      addToCart={addToCart} 
                      toggleWishlist={toggleWishlist} 
                      isWishlisted={isInWishlist(product._id)}
                      onView={() => navigate(`/product/${product._id}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted, onView }) => {
  return (
    <div className="group bg-white dark:bg-[#111] rounded-[1.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500">
      
      {/* Aspect Ratio 1:1 (Square) kar di taaki image bahut lambi na lage */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-neutral-900">
        <img 
          src={product.images?.[0] || "/placeholder.jpg"} 
          alt={product.name} 
          className="w-full h-full object-cover cursor-pointer transition-transform duration-1000 group-hover:scale-105" 
          onClick={onView}
        />
        
        <div className="absolute inset-0 bg-black/30 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
           <div className="flex gap-3">
             <button 
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} 
                className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gold-light hover:bg-gold-light hover:text-white'}`}
             >
                <FaHeart size={16} />
             </button>
             <button 
                onClick={(e) => { e.stopPropagation(); onView(); }} 
                className="w-11 h-11 bg-white/90 text-gold-light rounded-full flex items-center justify-center backdrop-blur-md hover:bg-gold-light hover:text-white transition-all"
             >
                <FaEye size={16} />
             </button>
           </div>
           
           <button 
             onClick={(e) => { e.stopPropagation(); addToCart(product); toast.success("Added to bag!"); }} 
             className="bg-gold-light text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-gold-light transition-colors duration-300"
           >
             Add to Bag
           </button>
        </div>

        {/* Mobile View Buttons (Bottom bar style) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex justify-between items-center md:hidden bg-gradient-to-t from-black/60 to-transparent">
             <button 
                onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} 
                className={`${isWishlisted ? 'text-red-500' : 'text-white'}`}
             >
                <FaHeart size={18} />
             </button>
             <button 
               onClick={(e) => { e.stopPropagation(); addToCart(product); }}
               className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase"
             >
               + Add
             </button>
        </div>

        {product.isOnSale && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">
            SALE
          </span>
        )}
      </div>

      <div className="p-6 text-center">
        <h3 className="text-sm md:text-lg font-medium dark:text-gray-200 truncate cursor-pointer hover:text-gold-light transition-colors" onClick={onView}>
          {product.name}
        </h3>
        <div className="mt-2 flex justify-center items-center gap-3">
          <p className="text-base md:text-lg font-bold text-gold-light">
            ${product.isOnSale ? product.salePrice : product.price}
          </p>
          {product.isOnSale && (
            <p className="text-xs line-through text-gray-400">
              ${product.price}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


export default FeaturedProductsSlider;