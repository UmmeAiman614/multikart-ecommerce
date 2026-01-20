import { useState, useRef, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);

  const testimonials = [
    { id: 1, name: "Emma Thompson", role: "Bride-to-be", image: "/images/25.jpg", quote: "The diamond engagement ring exceeded my expectations! The craftsmanship is impeccable and the customer service was exceptional." },
    { id: 2, name: "James Rodriguez", role: "Groom", image: "/images/26.jpg", quote: "I bought my wife's anniversary necklace here and she absolutely loves it. Outstanding quality and presentation." },
    { id: 3, name: "Sophia Chen", role: "Fashion Blogger", image: "/images/27.jpg", quote: "Their pearl collection is stunning — elegant, timeless, and perfect for every occasion." },
    { id: 4, name: "Michael Johnson", role: "Gift Buyer", image: "/images/28.jpg", quote: "Elegant packaging, premium feel, and excellent value. Every gift was loved!" }
  ];

  // Auto-slide
  useEffect(() => {
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(autoSlideInterval.current);
  }, [testimonials.length]);

  // Slide functions
  const nextSlide = () => setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-light-body dark:text-dark-body">
            Real stories from our satisfied customers
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
              bg-light-card dark:bg-dark-card border border-gold-light/50
              text-gold-dark shadow-lg hover:bg-gold-dark hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full
              bg-light-card dark:bg-dark-card border border-gold-light/50
              text-gold-dark shadow-lg hover:bg-gold-dark hover:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Content */}
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0 px-4">
                  <div className="group relative overflow-hidden rounded-xl p-8 shadow-sm
                    bg-light-card dark:bg-[#242424] border border-light-section dark:border-dark-border">
                    {/* Quotes */}
                    <div className="flex justify-between mb-6">
                      <FaQuoteLeft className="text-2xl text-gold-dark dark:text-gold-light" />
                      <FaQuoteRight className="text-2xl text-gold-dark dark:text-gold-light" />
                    </div>
                    {/* Text */}
                    <p className="text-lg leading-relaxed mb-6 text-light-text dark:text-dark-text">
                      {t.quote}
                    </p>
                    {/* Customer Info */}
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-light-section dark:border-dark-border"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gold-light rounded-full border-2 border-white dark:border-dark-bg"></div>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-lg text-light-text dark:text-dark-text">{t.name}</h3>
                        <p className="text-sm text-light-body dark:text-dark-body">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === i ? 'bg-gold-light' : 'bg-light-muted dark:bg-dark-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
