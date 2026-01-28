import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../api/api';

const RelatedProducts = ({ currentCategoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await getAllProducts();

        const filtered = res.data.filter(item => {
          const itemCatId = typeof item.category === 'object' ? item.category?._id : item.category;
          return itemCatId === currentCategoryId && item._id !== currentProductId;
        });

        setRelatedProducts(filtered.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentCategoryId) {
      fetchRelated();
    }
  }, [currentCategoryId, currentProductId]);

  if (loading || relatedProducts.length === 0) return null;

  return (
    <section className="bg-[#FAF9F6] dark:bg-[#0a0a0a] py-20 px-4 md:px-10 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-gold-light text-[10px] uppercase tracking-[0.5em] font-bold mb-2">Curated Selection</span>
            <h2 className="text-4xl font-serif text-dark-bg dark:text-white">You May Also <span className="italic">Like</span></h2>
          </div>
          <Link to="/products" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-dark-bg dark:text-gray-400 hover:text-gold-light transition-all">
            Explore All <div className="w-10 h-[1px] bg-gold-light group-hover:w-16 transition-all"></div>
          </Link>
        </div>

        {/* Product Grid - Mobile par 2 columns kiye hain */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
          {relatedProducts.map((item) => (
            <Link
              to={`/product/${item._id}`}
              key={item._id}
              className="group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Image Container - Mobile par height thori kam ki hai */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-white dark:bg-[#111] mb-3 md:mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                {item.isOnSale && (
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 bg-black text-white text-[7px] md:text-[8px] font-black px-2 py-1 md:px-3 md:py-1.5 uppercase tracking-widest">
                    Sale
                  </div>
                )}

                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : "https://via.placeholder.com/400x500?text=No+Image"}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-1000"
                />

                {/* Golden Overlay - Mobile par hamesha visible rakha hai ya touch friendly banaya hai */}
                <div className="absolute inset-x-0 bottom-0 h-10 md:h-16 bg-gold-light/95 backdrop-blur-md flex items-center justify-center lg:translate-y-full lg:group-hover:translate-y-0 transition-all duration-500 border-t border-gold-dark/20">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-black text-black">
                      Details
                    </span>
                    <div className="w-3 md:w-5 h-[1px] bg-black hidden xs:block"></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1 px-1">
                <h3 className="text-[11px] md:text-sm font-serif text-gray-800 dark:text-gray-200 group-hover:text-gold-light transition-colors duration-300 line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  {item.isOnSale ? (
                    <>
                      <span className="text-gold-light font-bold text-xs md:text-base">${item.salePrice}</span>
                      <span className="text-[9px] text-gray-400 line-through">${item.price}</span>
                    </>
                  ) : (
                    <span className="text-gold-light font-bold text-xs md:text-base">${item.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;