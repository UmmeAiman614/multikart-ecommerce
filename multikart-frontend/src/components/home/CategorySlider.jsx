import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaHeart, FaRetweet, FaTimes, FaMinus, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategorySlider = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  
  // Ref for touch/swipe support
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const allProducts = [
    { id: 1, category: 'Diamond', name: 'Perfect Diamond Jewelry', price: 99.00, oldPrice: 120.00, tag: 'New', img: '/images/1.jpg' },
    { id: 2, category: 'Silver', name: 'Diamond Exclusive Ornament', price: 55.00, oldPrice: 75.00, tag: 'Sale', img: '/images/2.jpg' },
    { id: 3, category: 'Gold', name: 'Citygold Exclusive Ring', price: 60.00, oldPrice: 80.00, tag: 'New', img: '/images/3.jpg' },
    { id: 4, category: 'Diamond', name: 'Handmade Golden Necklace', price: 70.00, oldPrice: 90.00, tag: '10%', img: '/images/4.jpg' },
    { id: 5, category: 'Gold', name: 'Royal Wedding Ring', price: 150.00, oldPrice: 200.00, tag: 'Hot', img: '/images/5.jpg' },
     { id: 6, category: 'Diamond', name: 'Perfect Diamond Jewelry', price: 99.00, oldPrice: 120.00, tag: 'New', img: '/images/6.jpg' },
    { id: 7, category: 'Silver', name: 'Diamond Exclusive Ornament', price: 55.00, oldPrice: 75.00, tag: 'Sale', img: '/images/7.jpg' },
    { id: 8, category: 'Gold', name: 'Citygold Exclusive Ring', price: 60.00, oldPrice: 80.00, tag: 'New', img: '/images/8.jpg' },
    { id: 9, category: 'Diamond', name: 'Handmade Golden Necklace', price: 70.00, oldPrice: 90.00, tag: '10%', img: '/images/9.jpg' },
    { id: 10, category: 'Gold', name: 'Royal Wedding Ring', price: 150.00, oldPrice: 200.00, tag: 'Hot', img: '/images/10.jpg' },
  ];

  const filteredProducts = activeTab === 'All' ? allProducts : allProducts.filter(p => p.category === activeTab);

  // Responsive logic: update itemsPerView on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1); // 1 product on Mobile
      else if (window.innerWidth < 1024) setItemsPerView(2); // 2 on Tablet
      else setItemsPerView(4); // 4 on Desktop
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < filteredProducts.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Reset to start
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredProducts.length - itemsPerView);
    }
  };

  // Swipe logic for Mobile
  const onTouchStart = (e) => (touchStart.current = e.targetTouches[0].clientX);
  const onTouchMove = (e) => (touchEnd.current = e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStart.current = null;
    touchEnd.current = null;
  };

  return (
    <section className="py-16 px-4 md:px-10 bg-light-bg dark:bg-dark-bg transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-10 border-b border-light-section dark:border-dark-border">
          {['All', 'Diamond', 'Silver', 'Gold'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentIndex(0); }}
              className={`pb-3 text-sm font-bold uppercase transition-all relative ${
                activeTab === tab ? 'text-gold-light' : 'text-light-muted dark:text-dark-muted'
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-light" />}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden" 
             onTouchStart={onTouchStart} 
             onTouchMove={onTouchMove} 
             onTouchEnd={onTouchEnd}>
          
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerView}%` }} // Dynamic width
              >
                <div className="group relative bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border p-4">
                  <div className="relative overflow-hidden bg-white dark:bg-dark-bg p-4 aspect-square flex items-center justify-center">
                    <img src={product.img} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Hover Buttons */}
                    <div className="absolute top-1/2 right-[-60px] group-hover:right-4 transform -translate-y-1/2 flex flex-col gap-2 transition-all duration-300">
                      <ActionBtn icon={<FaHeart />} />
                      <ActionBtn icon={<FaEye />} onClick={() => setSelectedProduct(product)} />
                    </div>

                    <button className="absolute bottom-[-60px] group-hover:bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-gold-light text-white py-2 text-[10px] font-bold uppercase transition-all">
                      Add to Cart
                    </button>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-sm font-medium text-light-text dark:text-dark-text truncate">{product.name}</h3>
                    <p className="text-gold-light font-bold mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Arrows */}
          <button onClick={prevSlide} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-dark-card rounded-full items-center justify-center shadow-lg"><FaChevronLeft /></button>
          <button onClick={nextSlide} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-dark-card rounded-full items-center justify-center shadow-lg"><FaChevronRight /></button>
        </div>
      </div>

      {/* Popup with Details */}
      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </section>
  );
};

const ActionBtn = ({ icon, onClick }) => (
  <button onClick={onClick} className="w-10 h-10 bg-white dark:bg-dark-card border border-light-section dark:border-dark-border flex items-center justify-center text-light-text dark:text-dark-text hover:bg-gold-light hover:text-white transition-all rounded-full">{icon}</button>
);

const QuickViewModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-light-card dark:bg-dark-card w-full max-w-4xl relative flex flex-col md:flex-row rounded-sm overflow-hidden shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-light-text dark:text-dark-text hover:text-gold-light z-10"><FaTimes size={20} /></button>
        <div className="md:w-1/2 p-6 bg-white dark:bg-dark-bg flex items-center justify-center">
          <img src={product.img} alt={product.name} className="max-h-[300px] object-contain" />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">{product.name}</h2>
          <p className="text-gold-light text-2xl font-bold my-4">${product.price.toFixed(2)}</p>
          <p className="text-sm text-light-body dark:text-dark-body mb-6 leading-relaxed">
            This premium jewelry piece is part of our {product.category} collection. Crafted with the highest quality materials, it features a timeless design suitable for both formal events and daily elegance.
          </p>
          <div className="text-[11px] uppercase tracking-widest font-bold text-light-muted dark:text-dark-muted mb-6">
            <p>SKU: LUX-{product.id}00</p>
            <p>Category: {product.category}</p>
          </div>
          <button className="bg-gold-light hover:bg-gold-hover text-white py-3 px-8 uppercase text-xs font-bold transition-all">Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;