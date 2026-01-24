import React, { useState, useEffect, useContext } from 'react'; // Added useContext
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { getSingleProduct, addToCart } from '../../api/api'; // Added addToCart import
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext
import { toast } from 'react-hot-toast';

const ProductSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get user from context
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false); // New loading state for button

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProduct(id);
        setProduct(res.data);
      } catch (error) {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // --- ADD TO CART FUNCTIONALITY ---
  const handleAddToCart = async () => {
    // 1. Check if user is logged in
    if (!user) {
      toast.error("Please login to add items to cart");
      return navigate('/login');
    }

    // 2. Prevent adding if out of stock
    if (product.stock <= 0) {
      return toast.error("Product is currently out of stock");
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
      console.error("Cart error:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gold-light">Loading Vault...</div>;
  if (!product) return <div className="py-20 text-center">Product Not Found</div>;

  return (
    <section className="bg-light-bg dark:bg-dark-bg py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-dark-card border border-light-section dark:border-dark-border p-4 rounded-lg overflow-hidden">
            <img 
              src={product.image || "https://via.placeholder.com/600"} 
              alt={product.name} 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="text-light-text dark:text-dark-text">
          <p className="text-gold-light font-medium uppercase tracking-widest text-sm">
            {product.category?.catName || 'Jewelry'}
          </p>
          <h1 className="text-3xl font-bold mt-2 font-serif">{product.name}</h1>
          
          <div className="flex items-center gap-2 mt-2 text-xs">
             <span className="text-gold-light">★★★★★</span>
             <span className="text-light-muted dark:text-dark-muted">(Verified Product)</span>
             <span className={`ml-4 px-2 py-0.5 rounded text-[10px] font-bold ${
               product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-red-100 text-red-700 dark:bg-red-900/30'
             }`}>
               {product.stock > 0 ? `IN STOCK (${product.stock})` : 'OUT OF STOCK'}
             </span>
          </div>

          <div className="mt-4 flex items-center gap-4 font-serif">
            {product.isOnSale ? (
              <>
                <span className="text-3xl font-bold text-gold-light">${product.salePrice}</span>
                <span className="text-xl text-light-muted dark:text-dark-muted line-through opacity-50">${product.price}</span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gold-light">${product.price}</span>
            )}
          </div>

          <p className="mt-6 text-light-body dark:text-dark-body leading-relaxed text-sm">
            {product.description || "No description available for this exquisite piece."}
          </p>

          <div className="mt-8 pt-6 border-t border-light-section dark:border-dark-border space-y-4">
            <div className="text-sm">
               <strong>SKU:</strong> <span className="text-light-muted dark:text-dark-muted">{product.sku || 'N/A'}</span>
            </div>
            <div className="text-sm">
               <strong>Metal:</strong> <span className="text-light-muted dark:text-dark-muted capitalize">{product.metal || 'Not Specified'}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              {/* Quantity Selector */}
              <div className="flex border border-light-section dark:border-dark-border rounded">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q-1))} 
                  className="px-4 py-2 hover:bg-gold-light hover:text-white transition disabled:opacity-30"
                  disabled={product.stock <= 0}
                >-</button>
                <input type="text" value={quantity} readOnly className="w-12 text-center bg-transparent font-bold" />
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q+1))} 
                  className="px-4 py-2 hover:bg-gold-light hover:text-white transition disabled:opacity-30"
                  disabled={product.stock <= 0}
                >+</button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || addingToCart}
                className="flex-1 bg-gold-light hover:bg-gold-hover text-white px-8 py-3 rounded-sm transition-all uppercase text-xs font-bold tracking-widest disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-gold-light/20 flex items-center justify-center gap-2"
              >
                {addingToCart ? (
                   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  product.stock > 0 ? 'Add to Cart' : 'Out of Stock'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSummary;