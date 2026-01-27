import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProduct, addToCart } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProductSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  
  // ✅ Gallery ke liye state
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProduct(id);
        const data = res.data;
        setProduct(data);
        // Pehli image ko default active set karna
        if (data.images && data.images.length > 0) {
          setActiveImg(data.images[0]);
        }
      } catch (error) {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return navigate('/login');
    }

    if (product.stock <= 0) {
      return toast.error("Product is currently out of stock");
    }

    if (quantity > product.stock) {
        return toast.error(`Only ${product.stock} items left in stock`);
    }

    try {
      setAddingToCart(true);
      const cartData = {
        product: product._id,
        quantity: quantity,
        price: product.isOnSale ? product.salePrice : product.price
      };

      await addToCart(cartData);
      toast.success(`${quantity} x ${product.name} added to your cart!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gold-light font-bold animate-pulse">Loading Vault...</div>;
  if (!product) return <div className="py-20 text-center">Product Not Found</div>;

  return (
    <section className="bg-light-bg dark:bg-dark-bg py-10 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* --- LEFT: IMAGE GALLERY --- */}
        <div className="space-y-4">
          {/* Main Large Image */}
          <div className="bg-white dark:bg-dark-card border border-light-section dark:border-dark-border p-2 rounded-xl overflow-hidden shadow-inner">
            <img 
              src={activeImg || "https://via.placeholder.com/600"} 
              alt={product.name} 
              className="w-full h-[400px] md:h-[550px] object-contain transition-all duration-500" 
            />
          </div>

          {/* Thumbnails List */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={`relative min-w-[80px] h-20 rounded-md overflow-hidden border-2 transition-all 
                    ${activeImg === img ? 'border-gold-light scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- RIGHT: PRODUCT DETAILS --- */}
        <div className="text-light-text dark:text-dark-text">
          <p className="text-gold-light font-bold uppercase tracking-[0.2em] text-xs">
            {product.category?.catName || 'Exquisite Collection'}
          </p>
          <h1 className="text-4xl font-bold mt-2 font-serif text-light-text dark:text-dark-text tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-2 mt-4">
             <div className="flex text-gold-light text-sm">★★★★★</div>
             <span className="text-light-muted dark:text-dark-muted text-xs font-medium">| Verified Jewelry</span>
             <div className={`ml-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
               product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-red-100 text-red-700 dark:bg-red-900/30'
             }`}>
               {product.stock > 0 ? `Stock: ${product.stock}` : 'Sold Out'}
             </div>
          </div>

          <div className="mt-6 flex items-baseline gap-4">
            {product.isOnSale ? (
              <>
                <span className="text-4xl font-bold text-gold-light">${product.salePrice}</span>
                <span className="text-xl text-light-muted line-through decoration-accent-rose opacity-40">${product.price}</span>
              </>
            ) : (
              <span className="text-4xl font-bold text-gold-light">${product.price}</span>
            )}
          </div>

          <div className="mt-8 p-4 bg-light-section/30 dark:bg-dark-card rounded-lg border border-light-section dark:border-dark-border">
            <h4 className="text-xs font-bold uppercase mb-2 text-gold-dark">Description</h4>
            <p className="text-light-body dark:text-dark-body leading-relaxed text-sm italic">
              "{product.description || "Crafted with precision, this piece represents the pinnacle of luxury and elegance."}"
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm border-b border-light-section dark:border-dark-border pb-6">
            <div><strong>SKU:</strong> <span className="text-light-muted ml-2">{product.sku || 'JW-UNIQUE'}</span></div>
            <div><strong>Metal:</strong> <span className="text-light-muted ml-2 capitalize">{product.metal || 'Pure Gold'}</span></div>
          </div>

          <div className="mt-8 space-y-4">
             <div className="flex items-center gap-6">
                <span className="text-xs font-bold uppercase tracking-widest">Select Quantity</span>
                {/* Quantity Selector */}
                <div className="flex items-center border border-light-section dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q-1))} 
                    className="px-5 py-2 hover:bg-gold-light hover:text-white transition-colors"
                    disabled={product.stock <= 0}
                  >–</button>
                  <input type="text" value={quantity} readOnly className="w-10 text-center bg-transparent font-bold text-sm" />
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q+1))} 
                    className="px-5 py-2 hover:bg-gold-light hover:text-white transition-colors"
                    disabled={product.stock <= 0}
                  >+</button>
                </div>
             </div>

             <button 
               onClick={handleAddToCart}
               disabled={product.stock <= 0 || addingToCart}
               className="w-full bg-gold-light hover:bg-gold-hover text-white py-4 rounded-lg transition-all uppercase text-xs font-black tracking-[0.3em] shadow-xl shadow-gold-light/20 flex items-center justify-center gap-3 disabled:bg-gray-400 group"
             >
               {addingToCart ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
               ) : (
                 product.stock > 0 ? (
                   <>
                     <span className="group-hover:translate-x-1 transition-transform">Add to Collection</span>
                   </>
                 ) : 'Notify Me'
               )}
             </button>
          </div>

          <p className="text-[10px] text-center mt-4 text-light-muted uppercase tracking-widest">
            Free Insured Shipping & 30-Day Returns
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductSummary;