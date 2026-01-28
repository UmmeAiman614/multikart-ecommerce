import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllCategories } from '../../api/api';
import { Loader2, ArrowRight } from 'lucide-react';

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data?.slice(0, 4) || []);
      } catch (err) {
        console.error("Error fetching showcase categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="animate-spin text-gold-light" size={40} />
    </div>
  );

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3 text-gold-light">
              <span className="hidden md:block h-[1px] w-10 bg-gold-light"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Handpicked</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tight">
              Curated <span className="text-gold-light">Collections</span>
            </h2>
          </div>
          <Link 
            to="/categories" 
            className="text-[10px] md:text-sm font-black uppercase tracking-widest text-gold-light border-b-2 border-gold-light pb-1 hover:text-light-text dark:hover:text-dark-text transition-all self-center md:self-end"
          >
            View All Categories
          </Link>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {categories.map((cat, index) => (
            <div 
              key={cat._id}
              onClick={() => navigate(`/products?category=${cat._id}`)}
              className="group relative h-[450px] md:h-[600px] cursor-pointer rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-light-section dark:border-dark-border"
            >
              {/* Massive Image */}
              <img 
                src={cat.image || "/placeholder-jewelry.jpg"} 
                alt={cat.catName}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              
              {/* Darker Gradient Overlay for better contrast on light images */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Text Content */}
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
                <div className="space-y-3 md:space-y-4">
                  
                  {/* Series Tag: Visible & Shadowed */}
                  <span className="text-gold-light text-[10px] md:text-xs font-black uppercase tracking-[0.5em] block drop-shadow-md md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                    Series 0{index + 1}
                  </span>
                  
                  {/* Category Name: Shadow added for white backgrounds */}
                  <h3 className="text-3xl md:text-6xl font-serif italic font-bold text-white tracking-wide drop-shadow-lg">
                    {cat.catName}
                  </h3>
                  
                  {/* Description: Always visible on mobile, hover on desktop */}
                  <p className="text-white/90 text-sm md:text-lg font-medium max-w-sm drop-shadow-md md:opacity-0 md:group-hover:opacity-100 md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700 delay-100">
                    Explore our exquisite range of handcrafted {cat.catName.toLowerCase()} designs.
                  </p>

                  <div className="pt-2 md:pt-4 overflow-hidden">
                    <div className="flex items-center gap-4 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] group-hover:text-gold-light transition-colors duration-300">
                      <span>Discover More</span>
                      <ArrowRight size={18} className="md:group-hover:translate-x-4 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* New Arrival Tag: Darker background for visibility */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 py-2 md:py-3 px-4 md:px-6 rounded-full backdrop-blur-lg bg-black/40 border border-white/30">
                <span className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest">New Arrival</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;