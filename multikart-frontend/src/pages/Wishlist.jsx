import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "../components/shared/Breadcrumb";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { getWishlist, toggleWishlist, addToCart } from "../api/api";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(null);

  const { addToCart: addToCartContext } = useCart();
  const { user } = useContext(AuthContext);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getWishlist();
      setWishlistItems(res.data.products || []);
    } catch (err) {
      toast.error("Could not load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      setCartLoading(product._id);
      const priceToCharge = product.isOnSale ? product.salePrice : product.price;
      
      // Image array handling for Cart
      const cartImage = product.images?.[0] || product.image || "/placeholder.jpg";

      await addToCart({
        product: product._id,
        quantity: 1,
        price: priceToCharge
      });

      addToCartContext({
        _id: product._id,
        name: product.name,
        price: priceToCharge,
        image: cartImage // Correct image sent to context
      }, 1);

      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setCartLoading(null);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId);
      toast.success("Removed from wishlist");
      setWishlistItems(wishlistItems.filter(item => item._id !== productId));
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (loading) return <div className="text-center py-20 text-gold-light uppercase tracking-widest font-bold animate-pulse">Loading Wishlist...</div>;

  return (
    <div className="py-8 px-4 bg-light-bg dark:bg-dark-bg min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb paths={[{ name: "Home", href: "/" }, { name: "Wishlist" }]} />

        <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-8 text-light-text dark:text-dark-text uppercase tracking-wider">
          My <span className="text-gold-light">Wishlist</span>
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-light-card dark:bg-dark-card rounded-xl border border-light-section dark:border-dark-border shadow-inner">
            <p className="text-light-body dark:text-dark-body uppercase tracking-widest text-sm italic opacity-60">Your sanctuary is empty</p>
          </div>
        ) : (
          <>
            {/* DESKTOP VIEW */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-light-section dark:border-dark-border shadow-sm">
              <table className="min-w-full bg-light-card dark:bg-dark-card">
                <thead className="bg-light-section/50 dark:bg-dark-border/30">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-light-text dark:text-dark-text uppercase text-[11px] tracking-widest font-black">Product</th>
                    <th className="px-6 py-4 text-light-text dark:text-dark-text uppercase text-[11px] tracking-widest font-black">Price</th>
                    <th className="px-6 py-4 text-light-text dark:text-dark-text uppercase text-[11px] tracking-widest font-black">Stock</th>
                    <th className="px-6 py-4 text-light-text dark:text-dark-text uppercase text-[11px] tracking-widest font-black">Action</th>
                    <th className="px-6 py-4 text-center text-light-text dark:text-dark-text uppercase text-[11px] tracking-widest font-black">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-section dark:divide-dark-border">
                  {wishlistItems.map((item) => {
                    const isAvailable = item.stock > 0 || item.countInStock > 0;
                    // FIX: Array check for images
                    const displayImg = item.images?.[0] || item.image || "/placeholder.jpg";
                    
                    return (
                      <tr key={item._id} className="hover:bg-gold-light/5 transition-colors group">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img 
                            src={displayImg} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-lg border border-light-section dark:border-dark-border shadow-sm group-hover:scale-105 transition-transform" 
                          />
                          <span className="font-bold text-light-text dark:text-dark-text text-sm uppercase tracking-tight">{item.name}</span>
                        </td>
                        <td className="px-6 py-4 text-gold-light font-black text-sm">${item.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase ${isAvailable ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                            {isAvailable ? "Available" : "Sold Out"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {isAvailable && (
                            <button onClick={() => handleAddToCart(item)} disabled={cartLoading === item._id} className="bg-gold-light text-white px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase flex items-center gap-2 hover:bg-gold-hover transition-all shadow-md active:scale-95 disabled:opacity-50">
                              {cartLoading === item._id ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><FaShoppingCart size={11} /> Move to Cart</>}
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleRemove(item._id)} className="text-red-400 hover:text-red-600 hover:scale-125 transition-all"><FaTrash size={14} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* MOBILE VIEW */}
            <div className="md:hidden space-y-4">
              {wishlistItems.map((item) => {
                const isAvailable = item.stock > 0 || item.countInStock > 0;
                const displayImg = item.images?.[0] || item.image || "/placeholder.jpg";
                
                return (
                  <div key={item._id} className="bg-light-card dark:bg-dark-card p-4 rounded-2xl border border-light-section dark:border-dark-border relative shadow-sm overflow-hidden">
                    <button onClick={() => handleRemove(item._id)} className="absolute top-4 right-4 text-red-400 p-2"><FaTrash size={16} /></button>
                    <div className="flex gap-4 items-center">
                      <img src={displayImg} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-sm" />
                      <div className="flex-1 pr-8">
                        <h3 className="text-light-text dark:text-dark-text font-black text-xs uppercase mb-1 leading-tight">{item.name}</h3>
                        <p className="text-gold-light font-black text-lg mb-2">${item.price}</p>
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${isAvailable ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                          {isAvailable ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                    {isAvailable && (
                      <button onClick={() => handleAddToCart(item)} disabled={cartLoading === item._id} className="w-full mt-4 bg-gold-light text-white py-3.5 rounded-xl text-[11px] font-bold uppercase flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                        {cartLoading === item._id ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><FaShoppingCart size={12} /> Add to Cart</>}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;