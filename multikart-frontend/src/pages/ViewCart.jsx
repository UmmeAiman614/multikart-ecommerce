import React, { useState, useContext, useMemo } from "react"; // useContext add kiya
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../components/shared/Breadcrumb";
import { FaTrash, FaPlus, FaMinus, FaTicketAlt, FaListUl } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext"; // AuthContext import karein
import { applyCoupon } from "../api/api";
import { toast } from "react-hot-toast";

const ViewCart = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Logged in user ki info
  const { cartItems, updateQuantity, removeFromCart, subtotal, discountPercent, setDiscountPercent } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  // ✅ LOGIC: Sirf is user ke items filter karein
  // Note: Agar aapka backend pehle se sirf user-specific data bhej raha hai toh iski zaroorat nahi, 
  // lekin extra safety ke liye frontend filtering yahan hai:
  const userCartItems = useMemo(() => {
    if (!user) return [];
    // Context mein agar har item ke saath userId save hai toh:
    return cartItems.filter(item => item.userId === user._id || item.user === user._id || !item.userId);
    // Note: Agar aapka cart backend se user-linked hai, toh refresh par context khud update hona chahiye.
  }, [cartItems, user]);

  const handleApplyCoupon = async () => {
    if (!couponCode) return toast.error("Please enter a code");
    try {
      setIsApplying(true);
      const res = await applyCoupon({ code: couponCode });
      setDiscountPercent(res.data.discount); 
      toast.success(res.data.message);
    } catch (error) {
      setDiscountPercent(0);
      toast.error(error.response?.data?.message || "Invalid Coupon");
    } finally {
      setIsApplying(false);
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 0 && subtotal < 1000 ? 50 : 0;
  const total = subtotal - discountAmount + shipping;

  // Agar user login nahi hai toh redirect ya message dikhayein
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="text-center">
          <p className="mb-4 text-light-muted italic">Please login to view your personal cart.</p>
          <button onClick={() => navigate("/auth")} className="px-6 py-2 bg-gold-light text-white rounded-lg">Login Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-light-bg dark:bg-dark-bg min-h-screen font-serif text-light-text dark:text-dark-text">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb paths={[{ name: "Home", href: "/" }, { name: "Cart" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
          {/* LEFT: Items List */}
          <div className="lg:col-span-2 space-y-4">
            {userCartItems.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-dark-card rounded-xl">
                <p className="opacity-50 italic">Your cart is empty.</p>
                <Link to="/products" className="text-gold-light underline mt-4 inline-block font-sans">Continue Shopping</Link>
              </div>
            ) : (
              userCartItems.map((item) => {
                const itemId = item.product?._id || item._id || item.productId;
                const itemName = item.name || item.product?.name || "Premium Jewelry";
                const itemImg = item.image || item.product?.image || item.product?.images?.[0] || "https://via.placeholder.com/150";
                const itemPrice = item.price || item.product?.price || 0;

                return (
                  <div key={itemId} className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-dark-card p-4 rounded-xl border dark:border-dark-border shadow-sm transition-hover hover:shadow-md">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img 
                        src={itemImg} 
                        alt={itemName} 
                        className="w-20 h-20 object-cover rounded-lg bg-gray-100" 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                      />
                      <div>
                        <h3 className="font-bold text-sm uppercase tracking-tight">{itemName}</h3>
                        <p className="text-gold-light text-sm font-sans">${itemPrice}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mt-4 sm:mt-0">
                      <div className="flex items-center border dark:border-dark-border rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(itemId, item.quantity - 1)} className="p-2 hover:bg-gold-light hover:text-white transition"><FaMinus size={10}/></button>
                        <span className="px-4 font-sans text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(itemId, item.quantity + 1)} className="p-2 hover:bg-gold-light hover:text-white transition"><FaPlus size={10}/></button>
                      </div>
                      <p className="font-bold w-20 text-right font-sans">${(itemPrice * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(itemId)} className="text-red-400 hover:text-red-600 transition"><FaTrash /></button>
                    </div>
                  </div>
                );
              })
            )}
            
            {userCartItems.length > 0 && (
              <div className="flex gap-2 pt-6">
                <input
                  type="text" placeholder="HAVE A COUPON?" value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-sm border dark:border-dark-border bg-transparent outline-none uppercase text-xs tracking-widest"
                />
                <button onClick={handleApplyCoupon} disabled={isApplying} className="px-8 py-3 bg-dark-bg text-white text-xs font-bold uppercase tracking-widest hover:bg-gold-light transition disabled:opacity-50">
                  {isApplying ? "..." : "Apply"}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border dark:border-dark-border shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6 uppercase tracking-tighter flex items-center gap-2">
                <FaListUl className="text-gold-light" size={16} /> Summary
              </h3>

              <div className="mb-6 space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold border-b dark:border-dark-border pb-1">Items in your bag</p>
                {userCartItems.map((item) => (
                  <div key={item.product?._id || item._id} className="flex justify-between text-xs italic opacity-80">
                    <span className="truncate pr-4">{item.name || item.product?.name} (x{item.quantity})</span>
                    <span className="font-sans">${((item.price || item.product?.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              {/* Calculations ... */}
              <div className="space-y-4 mb-6 border-t dark:border-dark-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Subtotal</span>
                  <span className="font-bold font-sans">${subtotal.toFixed(2)}</span>
                </div>
                {/* Shipping and Discount UI remains same */}
              </div>

              <div className="flex justify-between mb-8 border-t dark:border-dark-border pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-gold-light font-sans">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="w-full py-4 bg-gold-light text-white rounded-sm hover:bg-gold-hover font-bold transition text-center block uppercase text-[10px] tracking-widest shadow-lg shadow-gold-light/20 active:scale-95">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;