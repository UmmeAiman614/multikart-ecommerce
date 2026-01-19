// src/components/TestimonialsSlider.jsx
import { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const TestimonialsSlider = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Emma Thompson",
      role: "Bride-to-be",
      image: "/images/25.jpg", // Circular profile image
      quote: "The diamond engagement ring exceeded my expectations! The craftsmanship is impeccable and the customer service was exceptional. I couldn't be happier with my purchase."
    },
    {
      id: 2,
      name: "James Rodriguez",
      role: "Groom",
      image: "/images/26.jpg", // Circular profile image
      quote: "I bought my wife's anniversary necklace here and she absolutely loves it. The quality is outstanding and the presentation box made it even more special. Will definitely shop here again!"
    },
    {
      id: 3,
      name: "Sophia Chen",
      role: "Fashion Blogger",
      image: "/images/27.jpg", // Circular profile image
      quote: "As someone who reviews luxury accessories, I'm impressed by the attention to detail in every piece. Their pearl collection is particularly stunning - perfect for both casual and formal occasions."
    },
    {
      id: 4,
      name: "Michael Johnson",
      role: "Gift Buyer",
      image: "/images/28.jpg", // Circular profile image
      quote: "I've purchased multiple pieces as gifts and each recipient has been thrilled. The packaging is elegant and the jewelry arrives in perfect condition. Excellent value for the quality."
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    // Start auto-slide
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    // Cleanup on unmount
    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [testimonials.length]);

  // Pause auto-slide when user interacts
  const pauseAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  // Resume auto-slide after interaction
  const resumeAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const nextSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(resumeAutoSlide, 5000);
  };

  const prevSlide = () => {
    pauseAutoSlide();
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(resumeAutoSlide, 5000);
  };

  const goToSlide = (index) => {
    pauseAutoSlide();
    setCurrentSlide(index);
    setTimeout(resumeAutoSlide, 5000);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Real stories from our satisfied customers
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Content */}
          <div 
            ref={sliderRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className={`bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    {/* Quote Icons */}
                    <div className="flex justify-between mb-6">
                      <FaQuoteLeft className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      <FaQuoteRight className={`text-2xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    
                    {/* Testimonial Content */}
                    <div className="mb-6">
                      <p className={`text-lg leading-relaxed ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {testimonial.quote}
                      </p>
                    </div>
                    
                    {/* Customer Info */}
                    <div className="flex items-center">
                      {/* Circular Profile Image */}
                      <div className="relative">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100/f1f5f9/64748b?text=Customer";
                            e.target.className = "w-16 h-16 rounded-full object-cover bg-gray-200 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700";
                          }}
                        />
                        {/* Small decorative dot */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      </div>
                      
                      <div className="ml-4">
                        <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {testimonial.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? 'bg-accent-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;