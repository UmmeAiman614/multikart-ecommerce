import { useState, useEffect, useRef } from "react";
import { FaHeart, FaShoppingCart, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import { getFeaturedProducts } from "../../api/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Loader2, Diamond } from "lucide-react";
import { toast } from "react-hot-toast";

const FeaturedProductsSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideInterval = useRef(null);
  
  const navigate = useNavigate(); // Hook initialize kiya
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // API se data lana
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await getFeaturedProducts();
        setProducts(res.data || []);
      } catch (err) {
        console.error("Featured fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Chunks mein divide karna (3 items per slide for desktop)
  const slides = [];
  const itemsPerSlide = 3;
  for (let i = 0; i < products.length; i += itemsPerSlide) {
    slides.push(products.slice(i, i + itemsPerSlide));
  }

  useEffect(() => {
    if (slides.length > 0) startAutoSlide();
    return stopAutoSlide;
  }, [slides.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
  };

  if (loading) return (
    <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-gold-light" size={40} /></div>
  );

  if (products.length === 0) return null;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center items-center gap-2 text-gold-light">
            <Diamond size={18} fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-[0.5em]">Selected by Experts</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tight">
            Featured <span className="text-gold-light">Gems</span>
          </h2>
        </div>

        <div className="relative group">
          {/* Controls */}
          <button onClick={() => { stopAutoSlide(); setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1); startAutoSlide(); }}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white dark:bg-dark-card shadow-2xl flex items-center justify-center text-gold-light opacity-0 group-hover:opacity-100 transition-all duration-500 border border-gold-light/20 hover:bg-gold-light hover:text-white"
          >
            <FaChevronLeft size={20} />
          </button>

          <button onClick={() => { stopAutoSlide(); setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1); startAutoSlide(); }}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white dark:bg-dark-card shadow-2xl flex items-center justify-center text-gold-light opacity-0 group-hover:opacity-100 transition-all duration-500 border border-gold-light/20 hover:bg-gold-light hover:text-white"
          >
            <FaChevronRight size={20} />
          </button>

          {/* Slider Content */}
          <div className="overflow-hidden px-4">
            <div className="flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {slides.map((slide, idx) => (
                <div key={idx} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-10">
                  {slide.map((product) => (
                    <ProductCard 
                      key={product._id} 
                      product={product} 
                      addToCart={addToCart} 
                      toggleWishlist={toggleWishlist} 
                      isWishlisted={isInWishlist(product._id)}
                      onView={() => navigate(`/product/${product._id}`)} // Navigation pass ki
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-12 gap-3">
            {slides.map((_, index) => (
              <button key={index} onClick={() => { stopAutoSlide(); setCurrentSlide(index); startAutoSlide(); }}
                className={`transition-all duration-500 rounded-full ${currentSlide === index ? "w-10 h-2 bg-gold-light" : "w-2 h-2 bg-gold-light/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted, onView }) => {
  return (
    <div className="group relative bg-light-card dark:bg-[#1A1A1A] rounded-[3rem] overflow-hidden border border-light-section dark:border-white/5 shadow-xl transition-all duration-500 hover:shadow-gold-light/10">
      
      <div className="relative h-[400px] overflow-hidden">
        {/* Image Clickable */}
        <img 
          src={product.images?.[0] || "/placeholder.jpg"} 
          alt={product.name} 
          className="w-full h-full object-cover cursor-pointer transition-transform duration-[1.5s] group-hover:scale-110" 
          onClick={onView}
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
           <div className="flex gap-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
             <button onClick={() => toggleWishlist(product)} className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gold-light hover:bg-gold-light hover:text-white'}`}>
                <FaHeart size={20} />
             </button>
             
             {/* Eye Icon Clickable */}
             <button 
                onClick={onView}
                className="w-14 h-14 bg-white text-gold-light rounded-full flex items-center justify-center shadow-2xl hover:bg-gold-light hover:text-white transition-all"
             >
                <FaEye size={20} />
             </button>
           </div>
           
           <button onClick={() => { addToCart(product); toast.success("Added to cart!"); }} 
             className="bg-gold-light hover:bg-gold-hover text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transform translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-75 shadow-2xl"
           >
             Add to Bag
           </button>
        </div>

        {product.isOnSale && (
          <span className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">Sale</span>
        )}
      </div>

      <div className="p-10 text-center">
        <span className="text-gold-light text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
          {product.category?.catName || "Luxury Item"}
        </span>
        {/* Product Name Clickable */}
        <h3 
          className="text-2xl font-serif italic font-bold text-light-text dark:text-dark-text mb-3 truncate cursor-pointer hover:text-gold-light transition-colors"
          onClick={onView}
        >
          {product.name}
        </h3>
        <div className="flex justify-center items-center gap-3">
          <p className="text-2xl font-bold text-light-text dark:text-dark-text">
            ${product.isOnSale ? product.salePrice : product.price}
          </p>
          {product.isOnSale && <p className="text-sm line-through opacity-40 dark:text-dark-text">${product.price}</p>}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsSlider;