import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/shared/Breadcrumb";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaTicketAlt, FaListUl } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { removeFromCart as apiRemoveFromCart, applyCoupon } from "../api/api";
import { toast } from "react-hot-toast";

const ViewCart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, discountPercent, setDiscountPercent } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

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

  return (
    <div className="py-8 px-4 bg-light-bg dark:bg-dark-bg min-h-screen font-serif text-light-text dark:text-dark-text">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb paths={[{ name: "Home", href: "/" }, { name: "Cart" }]} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
          {/* LEFT: Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const itemImg = item.product?.image || item.image;
              const itemId = item.product?._id || item._id;
              const itemName = item.product?.name || item.name;

              return (
                <div key={itemId} className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-dark-card p-4 rounded-xl border dark:border-dark-border shadow-sm">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={itemImg} alt={itemName} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                    <div>
                      <h3 className="font-bold">{itemName}</h3>
                      <p className="text-gold-light text-sm">${item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 mt-4 sm:mt-0">
                    <div className="flex items-center border dark:border-dark-border rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(itemId, item.quantity - 1)} className="p-2 hover:bg-gold-light hover:text-white transition"><FaMinus size={10}/></button>
                      <span className="px-4 font-sans text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(itemId, item.quantity + 1)} className="p-2 hover:bg-gold-light hover:text-white transition"><FaPlus size={10}/></button>
                    </div>
                    <p className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(itemId)} className="text-red-400 hover:text-red-600 transition"><FaTrash /></button>
                  </div>
                </div>
              );
            })}
            
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
          </div>

          {/* RIGHT: Order Summary (Updated with Item Names) */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 border dark:border-dark-border shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6 uppercase tracking-tighter flex items-center gap-2">
                <FaListUl className="text-gold-light" size={16} /> Summary
              </h3>

              {/* NEW: Selected Products List */}
              <div className="mb-6 space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold-light">
                <p className="text-[10px] uppercase tracking-widest text-light-muted font-bold border-b dark:border-dark-border pb-1">Items in your bag</p>
                {cartItems.map((item) => (
                  <div key={item.product?._id || item._id} className="flex justify-between text-xs italic opacity-80">
                    <span className="truncate pr-4">{item.product?.name || item.name} (x{item.quantity})</span>
                    <span className="font-sans">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4 mb-6 border-t dark:border-dark-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-light-muted">Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-sm text-green-600 font-medium">
                    <span className="flex items-center gap-1"><FaTicketAlt size={12}/> Discount ({discountPercent}%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-light-muted">Shipping</span>
                  <span className="font-bold">{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 border-t dark:border-dark-border pt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-gold-light font-sans">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="w-full py-4 bg-gold-light text-white rounded-sm hover:bg-gold-hover font-bold transition text-center block uppercase text-xs tracking-widest shadow-lg shadow-gold-light/20 active:scale-95">
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