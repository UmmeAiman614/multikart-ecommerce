import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { Loader2, ArrowRight, Diamond } from 'lucide-react';
import BreadCrumbs from '../components/shared/Breadcrumb';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/category/all"); 
        setCategories(res.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
      <Loader2 className="animate-spin text-gold-light" size={40} />
    </div>
  );
 const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Categories" },
  ];

  return (
    <>
      <BreadCrumbs paths={breadcrumbPaths} />
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Sabse Pehle Isay Bada Kiya */}
        <div className="mb-20 space-y-4 text-center md:text-left border-l-4 border-gold-light pl-6">
          <div className="flex items-center gap-3 text-gold-light mb-2">
            <Diamond size={20} fill="currentColor" />
            <span className="text-sm font-black uppercase tracking-[0.3em]">Premium Range</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tight">
            Our <span className="text-gold-light">Collections</span>
          </h1>
          <p className="text-lg md:text-xl text-light-body dark:text-dark-body opacity-80 font-medium">
            Discover the finest jewelry pieces, curated for your elegance.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat) => (
            <div 
              key={cat._id}
              onClick={() => navigate(`/products?category=${cat._id}`)}
              className="group relative h-[500px] md:h-[600px] cursor-pointer rounded-[3rem] overflow-hidden shadow-2xl border-4 border-transparent hover:border-gold-light/30 transition-all duration-700"
            >
              {/* Image */}
              <img 
                src={cat.image} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                alt={cat.catName} 
              />

              {/* Darker Gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity" />
              
              {/* Content - Size Increased */}
              <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end">
                <div className="space-y-6">
                  {/* Label Bada Kar Diya */}
                  <span className="inline-block bg-gold-light text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-2">
                    Exclusive
                  </span>

                  {/* Category Name - Isay 4xl Kar Diya Taake Door Se Dikhe */}
                  <h2 className="text-4xl md:text-6xl font-serif italic font-bold text-white leading-tight">
                    {cat.catName}
                  </h2>

                  {/* Description - Agar backend mein hai to dikhegi, readable size mein */}
                  <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                    Explore the unique craftsmanship of our {cat.catName} series.
                  </p>

                  {/* Huge Action Button */}
                  <div className="pt-6">
                    <div className="inline-flex items-center gap-4 text-white text-base md:text-lg font-black uppercase tracking-widest border-b-2 border-gold-light pb-2 group/btn">
                      View Collection 
                      <ArrowRight size={24} className="text-gold-light group-hover/btn:translate-x-3 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Large Index Number for Design */}
              <div className="absolute top-10 right-10">
                <span className="text-white/10 text-8xl font-black italic select-none">
                  {cat.catName.charAt(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CategoriesPage;