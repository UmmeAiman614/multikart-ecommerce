import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaHeart, FaChevronLeft, FaChevronRight, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { getAllProducts, addToCart as addToCartApi } from '../../api/api'; 
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const CategorySlider = () => {
  const [products, setProducts] = useState([]);
  // 1. Static Metal Types as per your requirement
  const metals = ['All', 'Gold', 'Silver', 'Diamond', 'Platinum'];
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [loading, setLoading] = useState(true);
  
  // Contexts
  const { addToCart: addToCartContext } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  // 2. Logic: Backend products ko static metals ke mutabiq filter karna
  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => p.metal?.toLowerCase() === activeTab.toLowerCase());

  // Slider controls logic
  const nextSlide = () => {
    if (currentIndex < filteredProducts.length - itemsPerView) setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(Math.max(0, filteredProducts.length - itemsPerView));
  };

  // Add to Cart Logic
  const handleAddToCart = async (product) => {
    try {
      const priceToCharge = product.isOnSale ? product.salePrice : product.price;
      
      // Backend API Call
      await addToCartApi({ product: product._id, quantity: 1, price: priceToCharge });
      
      // Context/UI Update
      addToCartContext(product, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error("Cart update failed");
    }
  };

  if (loading) return (
    <div className="h-[500px] flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg text-gold-light">
      <Loader2 className="animate-spin mb-4" size={40} />
      <span className="font-serif italic tracking-widest text-lg">Curating your vault...</span>
    </div>
  );

  return (
    <section className="py-20 px-4 md:px-10 bg-light-bg dark:bg-dark-bg transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 text-gold-light mb-2">
            <Sparkles size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Masterpieces in Metal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic font-bold text-light-text dark:text-dark-text leading-tight">
            Shop by <span className="text-gold-light">Material</span>
          </h2>
        </div>

        {/* Static Metal Tabs */}
        <div className="flex justify-center gap-6 md:gap-10 mb-12 border-b border-light-section dark:border-dark-border overflow-x-auto no-scrollbar">
          {metals.map((metal) => (
            <button
              key={metal}
              onClick={() => { setActiveTab(metal); setCurrentIndex(0); }}
              className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                activeTab === metal ? 'text-gold-light' : 'text-light-muted dark:text-dark-muted hover:text-light-text'
              }`}
            >
              {metal}
              {activeTab === metal && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold-light rounded-t-full shadow-[0_-4px_10px_rgba(201,162,77,0.4)]" />
              )}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative group px-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32 border border-dashed border-light-section dark:border-dark-border rounded-[3rem] text-light-muted italic text-xl">
              Currently, no {activeTab} pieces are available.
            </div>
          ) : (
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 cubic-bezier(0.2, 0, 0, 1)"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {filteredProducts.map((product) => (
                  <div key={product._id} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerView}%` }}>
                    <div className="group/card relative bg-light-card dark:bg-dark-card rounded-[2.5rem] p-4 border border-light-section dark:border-dark-border shadow-md hover:shadow-2xl transition-all duration-500">
                      
                      {/* Image Area */}
                      <div className="relative overflow-hidden bg-white dark:bg-dark-bg aspect-[4/5] rounded-[2rem]">
                        <img 
                          src={product.images && product.images[0] ? product.images[0] : '/placeholder.jpg'} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                          alt={product.name}
                        />
                        
                        {/* Status Tags */}
                        {product.isOnSale && <span className="absolute top-4 left-4 bg-red-600 text-white text-[8px] px-3 py-1 rounded-full font-black uppercase">Sale</span>}

                        {/* Actions Overlay */}
                        <div className="absolute top-1/2 right-[-60px] group-hover/card:right-4 transform -translate-y-1/2 flex flex-col gap-3 transition-all duration-500">
                          <button 
                            onClick={() => toggleWishlist(product)}
                            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${isInWishlist(product._id) ? 'bg-red-500 text-white' : 'bg-white text-gold-light hover:bg-gold-light hover:text-white'}`}
                          >
                            <FaHeart size={16} />
                          </button>
                          <button 
                            onClick={() => setSelectedProduct(product)}
                            className="w-11 h-11 bg-white text-gold-light rounded-full flex items-center justify-center shadow-lg hover:bg-gold-light hover:text-white transition-all"
                          >
                            <FaEye size={16} />
                          </button>
                        </div>

                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="absolute bottom-[-60px] group-hover/card:bottom-4 left-4 right-4 bg-gold-light text-white py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-gold-hover transition-all duration-500"
                        >
                          Add to Bag
                        </button>
                      </div>

                      {/* Details */}
                      <div className="mt-5 text-center pb-2">
                        <p className="text-gold-light text-[9px] font-black uppercase tracking-[0.3em] mb-1">{product.metal || 'Exclusive'}</p>
                        <h3 className="text-base font-serif italic font-bold text-light-text dark:text-dark-text truncate">{product.name}</h3>
                        <div className="flex justify-center items-center gap-3 mt-1">
                          <span className="text-lg font-bold text-gold-light">${product.isOnSale ? product.salePrice : product.price}</span>
                          {product.isOnSale && <span className="text-xs line-through opacity-40 text-light-text dark:text-dark-text">${product.price}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          {filteredProducts.length > itemsPerView && (
            <>
              <button onClick={prevSlide} className="absolute -left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-dark-card rounded-full flex items-center justify-center shadow-2xl border border-light-section dark:border-dark-border text-gold-light opacity-0 group-hover:opacity-100 transition-opacity z-10"><FaChevronLeft /></button>
              <button onClick={nextSlide} className="absolute -right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-dark-card rounded-full flex items-center justify-center shadow-2xl border border-light-section dark:border-dark-border text-gold-light opacity-0 group-hover:opacity-100 transition-opacity z-10"><FaChevronRight /></button>
            </>
          )}
        </div>
      </div>

      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} onWishlist={toggleWishlist} isWishlisted={isInWishlist(selectedProduct._id)} />}
    </section>
  );
};

// ... (QuickViewModal is expanded with context support below)

const QuickViewModal = ({ product, onClose, onAddToCart, onWishlist, isWishlisted }) => (
  <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
    <div className="bg-light-card dark:bg-dark-card w-full max-w-4xl relative flex flex-col md:row rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
      <button onClick={onClose} className="absolute top-8 right-8 text-light-text dark:text-dark-text hover:text-gold-light transition-colors z-10"><FaTimes size={24} /></button>
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/2 p-12 bg-white flex items-center justify-center">
          <img src={product.images[0] || '/placeholder.jpg'} className="max-h-[400px] object-contain transition-transform duration-1000 hover:scale-105" alt={product.name} />
        </div>
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <span className="text-gold-light text-[10px] font-black uppercase tracking-[0.4em] mb-4">Ref: {product._id.slice(-6)}</span>
          <h2 className="text-4xl font-serif italic font-bold text-light-text dark:text-dark-text mb-2 leading-tight">{product.name}</h2>
          <div className="flex items-center gap-4 mb-8">
            <p className="text-gold-light text-3xl font-bold">${product.isOnSale ? product.salePrice : product.price}</p>
            {product.isOnSale && <p className="text-lg line-through opacity-30 text-light-text dark:text-dark-text">${product.price}</p>}
          </div>
          <p className="text-sm text-light-body dark:text-dark-body mb-8 leading-relaxed font-serif italic">{product.description || "A masterpiece of timeless elegance and craftsmanship."}</p>
          <div className="flex gap-4">
            <button onClick={() => { onAddToCart(product); onClose(); }} className="flex-1 bg-gold-light hover:bg-gold-hover text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all">Add to Cart</button>
            <button onClick={() => onWishlist(product)} className={`w-16 flex items-center justify-center rounded-2xl border transition-all ${isWishlisted ? 'bg-red-500 text-white border-red-500' : 'border-light-section dark:border-dark-border text-gold-light'}`}><FaHeart /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CategorySlider;