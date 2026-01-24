import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../api/api';
import { toast } from 'react-hot-toast';

const RelatedProducts = ({ currentCategoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await getAllProducts();
        
        // Filter logic:
        // 1. Category match honi chahiye
        // 2. Current product khud list mein nahi hona chahiye
        const filtered = res.data.filter(item => {
          const itemCatId = typeof item.category === 'object' ? item.category?._id : item.category;
          return itemCatId === currentCategoryId && item._id !== currentProductId;
        });

        // Sirf top 4 products dikhane ke liye slice use karein
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

  if (loading) return null; // Ya chota sa loader
  if (relatedProducts.length === 0) return null; // Agar koi related product na mile to section hide ho jaye

  return (
    <section className="bg-light-bg dark:bg-dark-bg py-16 px-4 md:px-10 border-t border-light-section dark:border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl font-serif font-bold text-light-text dark:text-dark-text tracking-tight uppercase">You May Also Like</h2>
            <div className="h-1 w-20 bg-gold-light mt-2"></div>
          </div>
          <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-gold-light border-b border-gold-light pb-1 hover:text-gold-hover hover:border-gold-hover transition-all">
            View Collection
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((item) => (
            <Link 
              to={`/product/${item._id}`} 
              key={item._id} 
              className="group cursor-pointer"
              onClick={() => window.scrollTo(0, 0)} // Scroll to top when clicking related product
            >
              <div className="relative overflow-hidden bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm border border-light-section dark:border-dark-border">
                {item.isOnSale && (
                   <span className="absolute top-4 left-4 z-10 bg-accent-rose text-white text-[9px] font-bold px-2 py-1 rounded uppercase">Sale</span>
                )}
                <img 
                  src={item.image || "https://via.placeholder.com/300"} 
                  alt={item.name}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-sm font-medium text-light-text dark:text-dark-text group-hover:text-gold-light transition-colors duration-300 line-clamp-1">
                  {item.name}
                </h3>
                <div className="flex justify-center gap-2 items-center mt-1">
                  {item.isOnSale ? (
                    <>
                      <p className="text-gold-light font-bold font-serif text-lg">${item.salePrice}</p>
                      <p className="text-xs text-light-muted line-through opacity-50">${item.price}</p>
                    </>
                  ) : (
                    <p className="text-gold-light font-bold font-serif text-lg">${item.price}</p>
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