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
        // Hum sirf top 4 categories dikhayenge showcase mein
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
    <section className="py-24 px-4 md:px-10 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gold-light">
              <span className="h-[1px] w-10 bg-gold-light"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Handpicked</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tight">
              Curated <span className="text-gold-light">Collections</span>
            </h2>
          </div>
          <Link 
            to="/categories" 
            className="text-sm font-black uppercase tracking-widest text-gold-light border-b-2 border-gold-light pb-1 hover:text-light-text dark:hover:text-dark-text transition-all"
          >
            View All Categories
          </Link>
        </div>

        {/* 2x2 Grid - Massive Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat, index) => (
            <div 
              key={cat._id}
              onClick={() => navigate(`/products?category=${cat._id}`)}
              className="group relative h-[500px] md:h-[600px] cursor-pointer rounded-[3rem] overflow-hidden bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border"
            >
              {/* Massive Image */}
              <img 
                src={cat.image || "/placeholder-jewelry.jpg"} 
                alt={cat.catName}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              
              {/* Gradient Overlay for Text Clarity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Text Content - Positioned Bottom-Left for Visibility */}
              <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end">
                <div className="space-y-4">
                  <span className="text-gold-light text-xs font-black uppercase tracking-[0.5em] block mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    Series 0{index + 1}
                  </span>
                  
                  {/* Category Name - Huge & Bold */}
                  <h3 className="text-4xl md:text-6xl font-serif italic font-bold text-white tracking-wide">
                    {cat.catName}
                  </h3>
                  
                  <p className="text-white/70 text-lg font-medium max-w-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    Explore our exquisite range of handcrafted {cat.catName.toLowerCase()} designs.
                  </p>

                  <div className="pt-4 overflow-hidden">
                    <div className="flex items-center gap-4 text-white text-xs font-black uppercase tracking-[0.3em] group-hover:text-gold-light transition-colors duration-300">
                      <span>Discover More</span>
                      <ArrowRight size={20} className="group-hover:translate-x-4 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Glass Tag (Top Right) */}
              <div className="absolute top-8 right-8 py-3 px-6 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">New Arrival</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;