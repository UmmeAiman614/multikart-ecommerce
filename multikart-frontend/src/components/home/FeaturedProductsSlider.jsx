// src/components/FeaturedProductsSlider.jsx
import { useState, useEffect, useRef } from "react";
import { FaHeart, FaShoppingCart, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeaturedProductsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideInterval = useRef(null);

  const products = [
    { id: 1, name: "Diamond Stud Earrings", price: "$199", image: "/images/16.jpg", category: "Earrings" },
    { id: 2, name: "Solitaire Engagement Ring", price: "$599", image: "/images/10.jpg", category: "Rings" },
    { id: 3, name: "Pearl Pendant Necklace", price: "$249", image: "/images/4.jpg", category: "Necklaces" },
    { id: 4, name: "Gold Chain Bracelet", price: "$179", image: "/images/22.jpg", category: "Bracelets" },
    { id: 5, name: "Hoop Earrings", price: "$129", image: "/images/17.jpg", category: "Earrings" },
    { id: 6, name: "Vintage Band Ring", price: "$299", image: "/images/11.jpg", category: "Rings" },
    { id: 7, name: "Sapphire Locket", price: "$349", image: "/images/7.jpg", category: "Necklaces" },
    { id: 8, name: "Tennis Bracelet", price: "$449", image: "/images/23.jpg", category: "Bracelets" },
    { id: 9, name: "Chandelier Earrings", price: "$279", image: "/images/19.jpg", category: "Earrings" },
    { id: 10, name: "Diamond Halo Ring", price: "$799", image: "/images/13.jpg", category: "Rings" },
    { id: 11, name: "Emerald Choker", price: "$449", image: "/images/8.jpg", category: "Necklaces" },
    { id: 12, name: "Beaded Gold Bracelet", price: "$159", image: "/images/24.jpg", category: "Bracelets" },
  ];

  const slides = [];
  for (let i = 0; i < products.length; i += 6) {
    slides.push(products.slice(i, i + 6));
  }

  /* ===== AUTO SLIDE ===== */
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [slides.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  const nextSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
    startAutoSlide();
  };

  const prevSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
    startAutoSlide();
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            Featured Products
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-light-body dark:text-dark-body">
            Our most popular jewelry pieces loved by customers worldwide
          </p>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* LEFT ARROW */}
          <button
            onClick={prevSlide}
           className="absolute left-2 top-1/2 -translate-y-1/2 z-10
w-11 h-11 rounded-full
flex items-center justify-center
bg-light-card dark:bg-dark-card
border border-gold-light/50
text-gold-dark
shadow-lg
hover:bg-gold-dark hover:text-white hover:scale-110
transition-all duration-300"

          >
            <FaChevronLeft />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={nextSlide}
           className="absolute right-2 top-1/2 -translate-y-1/2 z-10
w-11 h-11 rounded-full
flex items-center justify-center
bg-light-card dark:bg-dark-card
border border-gold-light/50
text-gold-dark
shadow-lg
hover:bg-gold-dark hover:text-white hover:scale-110
transition-all duration-300"
          >
            <FaChevronRight />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {slide.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index
                    ? "bg-gold-dark"
                    : "bg-light-muted dark:bg-dark-muted"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ================= PRODUCT CARD ================= */

const ProductCard = ({ product }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border
bg-light-card
dark:bg-[#2A2A2A]
border-light-section
dark:border-[#3A3A3A]
shadow-sm transition-all duration-300"
>

      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
          transition-all duration-300 flex flex-col items-center justify-center space-y-4">

          <div className="flex space-x-4">
            <HoverIcon><FaHeart /></HoverIcon>
            <HoverIcon><FaEye /></HoverIcon>
          </div>

          <button className="bg-gold-dark hover:bg-gold-hover
            text-white shadow-md hover:shadow-gold-light/40
            text-xs font-medium py-2 px-4 rounded-full
            transition-all duration-300 flex items-center">
            <FaShoppingCart className="mr-1 text-xs" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <span className="text-xs uppercase tracking-wide text-light-muted dark:text-dark-muted">
          {product.category}
        </span>
        <h3 className="font-semibold text-sm mt-1 text-light-text dark:text-dark-text">
          {product.name}
        </h3>
        <p className="font-bold text-sm text-gold-dark">
          {product.price}
        </p>
      </div>
    </div>
  );
};

const HoverIcon = ({ children }) => (
  <button
    className="w-11 h-11 rounded-full
    flex items-center justify-center
    bg-light-card dark:bg-dark-card
    border border-gold-light/50
    text-gold-dark
    shadow-lg
    hover:scale-110 hover:bg-gold-dark hover:text-white
    transition-all duration-300"
  >
    {children}
  </button>
);


export default FeaturedProductsSlider;
