import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Hook import kiya

const AboutIntro = () => {
  const navigate = useNavigate(); // 2. Hook initialize kiya

  return (
    <section className="bg-light-bg dark:bg-dark-bg py-24 px-4 md:px-10 transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left: Brand Image with Decorative Elements */}
        <div className="w-full lg:w-1/2 relative">
          <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gold-light/20 rounded-[2rem] hidden md:block"></div>
          
          <div className="relative z-10 overflow-hidden rounded-[2rem] shadow-2xl transform hover:scale-[1.02] transition-transform duration-700">
            <img 
              src="https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=800" 
              alt="Master Craftsman Jewelry" 
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gold-light/20">
                <p className="text-gold-light text-3xl font-serif font-bold">35+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-light-text dark:text-dark-text">Years of Excellence</p>
            </div>
          </div>
        </div>

        {/* Right: Story Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <span className="text-gold-light font-black uppercase tracking-[0.4em] text-xs block">Our Heritage</span>
            <h1 className="text-5xl md:text-7xl font-serif italic font-bold text-light-text dark:text-dark-text leading-tight">
              Crafting <span className="text-gold-light">Legacies</span> Since 1986
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-xl font-serif italic text-light-text dark:text-dark-text opacity-90 leading-relaxed border-l-4 border-gold-light pl-6">
              Founded in 1986, I.D. Jewelry, LLC, a family owned & operated business 
              has become a household name in states all over the USA.
            </p>
            
            <p className="text-light-body dark:text-dark-body leading-loose opacity-80">
              For those that rather the full immersion of the in-store experience we welcome 
              your company and look forward to meeting you face to face. Being located in the 
              47th street diamond district, known to be the largest diamond hub in the world.
            </p>
          </div>

          {/* Button with Navigation */}
          <div className="pt-6">
             <button 
                onClick={() => navigate('/products')} // 3. Click handle kiya
                className="px-10 py-4 bg-transparent border border-gold-light text-gold-light rounded-full text-xs font-black uppercase tracking-widest hover:bg-gold-light hover:text-white transition-all duration-500 shadow-lg hover:shadow-gold-light/20"
             >
                Explore our Collections
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;