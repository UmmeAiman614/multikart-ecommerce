import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  const navigate = useNavigate();

  // Random High-Quality Luxury Jewelry Images from Unsplash
  const mainImage = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop";
  const detailImage = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative w-full min-h-[95vh] flex items-center overflow-hidden bg-[#FAF9F6] dark:bg-[#0a0a0a] pt-16">
      
      {/* Background Watermark - Background mein halka sa text */}
      <div className="absolute top-20 left-5 text-[12rem] md:text-[18rem] font-serif text-black/[0.03] dark:text-white/[0.03] select-none pointer-events-none tracking-tighter">
        Vogue
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <div className="relative z-10 order-2 lg:order-1 mt-10 lg:mt-0">
          <div className="inline-flex items-center gap-4 mb-8">
             <span className="w-10 h-[1px] bg-gold-light"></span>
             <span className="text-gold-light uppercase tracking-[0.4em] text-[10px] font-bold">
               Pure Craftsmanship
             </span>
          </div>

          <h1 className="text-6xl md:text-[7rem] font-serif text-dark-bg dark:text-white leading-[0.9] mb-10">
            Shine <br />
            <span className="italic text-gold-light md:ml-24 inline-block transform hover:translate-x-4 transition-transform duration-700 cursor-default">
              Bright.
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-md font-light leading-relaxed tracking-wide">
            Experience the fusion of modern art and traditional jewelry making. 
            Each piece is a masterpiece, uniquely curated for the bold and the beautiful.
          </p>

          {/* Action Button */}
          <button 
            onClick={() => navigate('/products')}
            className="group relative flex items-center gap-10 bg-[#1a1a1a] dark:bg-gold-light text-white dark:text-black px-10 py-6 rounded-none transition-all duration-500 hover:bg-black dark:hover:bg-white shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-[0.3em] text-xs font-bold">Shop Collection</span>
            <FaArrowRight className="relative z-10 text-xl transition-transform group-hover:translate-x-3" />
            
            {/* Hover Slide Effect */}
            <div className="absolute inset-0 bg-gold-light dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </div>

        {/* Right Side: Artistic Image Layout */}
        <div className="relative order-1 lg:order-2 flex justify-center items-center py-10">
          
          {/* Main Floating Image (Arch Shape) */}
          <div className="relative w-[280px] h-[380px] md:w-[420px] md:h-[550px] z-20 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-t-full border-[12px] border-white dark:border-[#1a1a1a]">
             <img 
               src={mainImage}
               alt="Luxury Diamond Ring" 
               className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
             />
          </div>

          {/* Golden Decorative Circle Behind */}
          <div className="absolute -top-5 -right-5 w-40 h-40 rounded-full border border-gold-light/20 -z-10 animate-spin-slow"></div>
          
          {/* Secondary Detail Image (Floating Square) */}
          <div className="absolute -bottom-6 -left-6 md:-bottom-12 md:-left-12 w-36 h-36 md:w-52 md:h-52 bg-white dark:bg-[#1a1a1a] p-3 shadow-2xl z-30 hidden sm:block transform -rotate-3 hover:rotate-0 transition-all duration-500">
             <div className="w-full h-full overflow-hidden">
                <img 
                  src={detailImage}
                  alt="Jewelry Detail View" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110"
                />
             </div>
             <p className="text-[7px] uppercase tracking-widest mt-3 text-center text-gray-400 font-bold">The Fine Details</p>
          </div>
        </div>
      </div>

      {/* Decorative Side Elements */}
      <div className="hidden xl:flex absolute left-8 bottom-24 flex-col gap-10 items-center">
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
        <div className="flex flex-col gap-8">
          <a href="#" className="rotate-90 text-[9px] uppercase tracking-[0.3em] text-gray-400 hover:text-gold-light transition-colors font-bold">Instagram</a>
          <a href="#" className="rotate-90 text-[9px] uppercase tracking-[0.3em] text-gray-400 hover:text-gold-light transition-colors font-bold mt-12">Catalog</a>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;