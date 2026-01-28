import React, { useState, useEffect } from 'react';
import { FaEye, FaHeart, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { getAllProducts, addToCart as addToCartApi } from '../../api/api'; 
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CategorySlider = () => {
  const [products, setProducts] = useState([]);
  const metals = ['All', 'Gold', 'Silver', 'Diamond', 'Platinum'];
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [loading, setLoading] = useState(true);

  // --- TOUCH SWIPE STATES ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const { addToCart: addToCartContext } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts();
        setProducts(res.data || []);
      } catch (error) {
        toast.error("Failed to load collection");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.metal?.toLowerCase() === activeTab.toLowerCase());

  const nextSlide = () => {
    if (currentIndex < filteredProducts.length - itemsPerView) setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(Math.max(0, filteredProducts.length - itemsPerView));
  };

  // --- SWIPE LOGIC ---
  const handleTouchStart = (e) => {
    setTouchEnd(null); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;  // 50px threshold
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const handleAddToCart = async (product) => {
    try {
      const priceToCharge = product.isOnSale ? product.salePrice : product.price;
      await addToCartApi({ product: product._id, quantity: 1, price: priceToCharge });
      addToCartContext(product, 1);
      toast.success(`${product.name} added to bag!`);
    } catch (err) {
      toast.error("Login to add items to cart");
    }
  };

  if (loading) return (
    <div className="h-[500px] flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg text-gold-light">
      <Loader2 className="animate-spin mb-4" size={40} />
      <span className="font-serif italic tracking-widest text-lg">Curating your vault...</span>
    </div>
  );

  return (
    <section className="py-12 md:py-20 px-4 md:px-10 bg-light-bg dark:bg-dark-bg transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center items-center gap-2 text-gold-light mb-2">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Masterpieces</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif italic font-bold text-light-text dark:text-dark-text leading-tight">
            Shop by <span className="text-gold-light">Material</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-start md:justify-center gap-6 md:gap-10 mb-8 md:mb-12 border-b border-light-section dark:border-dark-border overflow-x-auto no-scrollbar">
          {metals.map((metal) => (
            <button
              key={metal}
              onClick={() => { setActiveTab(metal); setCurrentIndex(0); }}
              className={`pb-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === metal ? 'text-gold-light' : 'text-light-muted dark:text-dark-muted'
              }`}
            >
              {metal}
              {activeTab === metal && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold-light rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Slider with Touch Handlers */}
        <div className="relative group">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-light-section dark:border-dark-border rounded-[2rem] text-light-muted italic text-lg">
              No {activeTab} pieces available.
            </div>
          ) : (
            <div 
              className="overflow-hidden touch-pan-y" 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {filteredProducts.map((product) => (
                  <div key={product._id} className="flex-shrink-0 px-2 md:px-3" style={{ width: `${100 / itemsPerView}%` }}>
                    <div className="group/card relative bg-light-card dark:bg-dark-card rounded-[2rem] p-3 md:p-4 border border-light-section dark:border-dark-border shadow-md transition-all duration-500 hover:shadow-xl">
                      
                      {/* Image Area */}
                      <div className="relative overflow-hidden bg-white dark:bg-dark-bg aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem]">
                        <img 
                          src={product.images && product.images[0] ? product.images[0] : '/placeholder.jpg'} 
                          className="w-full h-full object-cover pointer-events-none" 
                          alt={product.name}
                        />
                        
                        <div className="absolute top-1/2 right-2 md:right-[-60px] md:group-hover/card:right-4 transform -translate-y-1/2 flex flex-col gap-2 md:gap-3 transition-all duration-500">
                          <button onClick={() => toggleWishlist(product)} className={`w-9 h-9 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${isInWishlist(product._id) ? 'bg-red-500 text-white' : 'bg-white text-gold-light'}`}><FaHeart size={14} /></button>
                          <button onClick={() => setSelectedProduct(product)} className="w-9 h-9 md:w-11 md:h-11 bg-white text-gold-light rounded-full flex items-center justify-center shadow-lg"><FaEye size={14} /></button>
                        </div>

                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="absolute bottom-2 md:bottom-[-60px] md:group-hover/card:bottom-4 left-2 right-2 md:left-4 md:right-4 bg-gold-light text-white py-2.5 md:py-3.5 rounded-xl md:rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl"
                        >
                          Add to Bag
                        </button>
                      </div>

                      <div className="mt-4 text-center pb-1">
                        <p className="text-gold-light text-[8px] font-black uppercase tracking-[0.2em] mb-1">{product.metal || 'Exclusive'}</p>
                        <h3 className="text-sm md:text-base font-serif italic font-bold text-light-text dark:text-dark-text truncate px-2">{product.name}</h3>
                        <div className="flex justify-center items-center gap-2 mt-1">
                          <span className="text-base md:text-lg font-bold text-gold-light">${product.isOnSale ? product.salePrice : product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Nav Arrows */}
          {filteredProducts.length > itemsPerView && (
            <div className="hidden md:block">
              <button onClick={prevSlide} className="absolute -left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-dark-card rounded-full flex items-center justify-center shadow-xl text-gold-light z-10 hover:bg-gold-light hover:text-white transition-all"><FaChevronLeft /></button>
              <button onClick={nextSlide} className="absolute -right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-dark-card rounded-full flex items-center justify-center shadow-xl text-gold-light z-10 hover:bg-gold-light hover:text-white transition-all"><FaChevronRight /></button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} onWishlist={toggleWishlist} isWishlisted={isInWishlist(selectedProduct._id)} />}
    </section>
  );
};

// QuickViewModal: Mobile optimized (flex-col on mobile)
const QuickViewModal = ({ product, onClose, onAddToCart, onWishlist, isWishlisted }) => (
  <div className="fixed inset-0 z-[500] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
    <div className="bg-light-card dark:bg-dark-card w-full max-w-4xl relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl my-auto">
      <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 text-dark-text md:text-light-text dark:text-dark-text z-50 bg-black/20 md:bg-transparent p-2 rounded-full"><FaTimes size={20} /></button>
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-white flex items-center justify-center">
          <img src={product.images[0] || '/placeholder.jpg'} className="max-h-[250px] md:max-h-[400px] object-contain" alt={product.name} />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-light-card dark:bg-dark-card">
          <span className="text-gold-light text-[9px] font-black uppercase tracking-[0.3em] mb-2">Ref: {product._id.slice(-6)}</span>
          <h2 className="text-2xl md:text-4xl font-serif italic font-bold text-light-text dark:text-dark-text mb-4 leading-tight">{product.name}</h2>
          <div className="flex items-center gap-4 mb-4 md:mb-8">
            <p className="text-gold-light text-2xl md:text-3xl font-bold">${product.isOnSale ? product.salePrice : product.price}</p>
          </div>
          <p className="text-xs md:text-sm text-light-body dark:text-dark-body mb-6 md:mb-8 leading-relaxed font-serif italic line-clamp-3 md:line-clamp-none">
            {product.description || "A masterpiece of timeless elegance and craftsmanship."}
          </p>
          <div className="flex gap-3">
            <button onClick={() => { onAddToCart(product); onClose(); }} className="flex-1 bg-gold-light text-white py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest">Add to Bag</button>
            <button onClick={() => onWishlist(product)} className={`w-12 md:w-16 flex items-center justify-center rounded-xl md:rounded-2xl border transition-all ${isWishlisted ? 'bg-red-500 text-white border-red-500' : 'border-light-section dark:border-dark-border text-gold-light'}`}><FaHeart /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CategorySlider;