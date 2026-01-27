import { useState, useEffect, useRef } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoSlideInterval = useRef(null);

  const testimonials = [
    { 
      id: 1, 
      name: "Aiman Fatima", 
      role: "Verified Bride", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200", 
      quote: "The diamond engagement ring exceeded my expectations! The craftsmanship is impeccable and the customer service was exceptional. It truly made my day special." 
    },
    { 
      id: 2, 
      name: "Eman Zehra", 
      role: "Fashion Designer", 
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200", 
      quote: "I've bought many pieces, but the necklace I got from here is on another level. The way it catches the light is just magical. Timeless and elegant!" 
    },
    { 
      id: 3, 
      name: "Amna Sheikh", 
      role: "Lifestyle Blogger", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", 
      quote: "Sophistication at its best. Their pearl collection is stunning — elegant, and perfect for every occasion. Highly recommended for jewelry lovers." 
    },
    { 
      id: 4, 
      name: "Aafia Malik", 
      role: "Art Director", 
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200", 
      quote: "The attention to detail in their gold chain bracelets is amazing. It feels luxury, looks luxury, and the packaging was just like a dream." 
    }
  ];

  useEffect(() => {
    autoSlideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(autoSlideInterval.current);
  }, [testimonials.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="py-28 px-4 relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold-light/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-rose/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-5xl mx-auto relative">
        
        {/* Header - Center Focused */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex justify-center gap-1 text-gold-light">
            {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
          </div>
          <h2 className="text-5xl md:text-6xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tight">
            Client <span className="text-gold-light">Diaries</span>
          </h2>
          <div className="w-24 h-1 bg-gold-light mx-auto rounded-full"></div>
        </div>

        {/* Main Slider Container */}
        <div className="relative bg-light-card dark:bg-dark-card rounded-[3rem] p-8 md:p-16 shadow-2xl border border-light-section dark:border-dark-border">
          
          {/* Big Quote Icon Background */}
          <FaQuoteLeft className="absolute top-10 left-10 text-8xl text-gold-light/5 pointer-events-none" />

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 -left-6 md:-left-10 flex items-center">
            <button onClick={prevSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-dark-card shadow-xl border border-gold-light/20 flex items-center justify-center text-gold-light hover:bg-gold-light hover:text-white transition-all transform hover:scale-110">
              <FaChevronLeft size={20} />
            </button>
          </div>
          <div className="absolute inset-y-0 -right-6 md:-right-10 flex items-center">
            <button onClick={nextSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-dark-card shadow-xl border border-gold-light/20 flex items-center justify-center text-gold-light hover:bg-gold-light hover:text-white transition-all transform hover:scale-110">
              <FaChevronRight size={20} />
            </button>
          </div>

          {/* Slides Content */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-all duration-1000 ease-[cubic-bezier(0.23, 1, 0.32, 1)]" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0 text-center">
                  <div className="max-w-3xl mx-auto space-y-8">
                    
                    {/* Testimonial Quote */}
                    <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-light-text dark:text-dark-text">
                      "{t.quote}"
                    </p>

                    {/* Customer Info Wrapper */}
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full p-1 border-2 border-gold-light shadow-2xl overflow-hidden">
                           <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gold-light text-white p-2 rounded-full shadow-lg">
                          <FaQuoteLeft size={10} />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text tracking-wide">{t.name}</h3>
                        <p className="text-sm font-black uppercase tracking-[0.3em] text-gold-light mt-1">{t.role}</p>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Indicators */}
        <div className="flex justify-center mt-12 gap-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-500 rounded-full h-1.5 ${
                currentSlide === i ? 'w-12 bg-gold-light' : 'w-4 bg-gold-light/20 hover:bg-gold-light/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;