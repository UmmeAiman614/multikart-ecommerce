import React, { useState } from 'react';
import Breadcrumb from '../components/shared/Breadcrumb';
import { useCart } from '../context/CartContext'; 
import { createOrder, applyCoupon as apiApplyCoupon } from '../api/api'; 
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'; // Icons for success and loading

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart, discountPercent, setDiscountPercent } = useCart();
  
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false); // New state for success UI

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', city: '', phone: '', email: '', orderNote: ''
  });

  // Calculations
  const shippingFee = subtotal > 0 && subtotal < 1000 ? 50 : 0; 
  const discountAmount = (subtotal * discountPercent) / 100;
  const totalAmount = subtotal + shippingFee - discountAmount;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return toast.error("Please enter a coupon code");
    try {
      setIsApplying(true);
      const res = await apiApplyCoupon({ code: couponCode.toUpperCase() });
      setDiscountPercent(res.data.discount);
      toast.success(`Coupon Applied! ${res.data.discount}% OFF`);
    } catch (err) {
      setDiscountPercent(0);
      toast.error(err.response?.data?.message || "Invalid Coupon");
    } finally {
      setIsApplying(false);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'phone', 'email'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      return toast.error("Please fill all required fields (*)");
    }

    const orderData = {
      items: cartItems.map(item => ({
        product: item.product?._id || item._id,
        quantity: item.quantity,
        price: item.price
      })),
      shippingDetails: formData,
      totalAmount: totalAmount,
      discountApplied: discountPercent,
      paymentMethod: "Cash On Delivery"
    };

    try {
      setIsPlacingOrder(true);
      await createOrder(orderData);
      
      // Clear Cart first
      clearCart();
      
      // Show Success Message on Screen
      setOrderSuccess(true);

      // Redirect to My Account after 3 seconds
      setTimeout(() => {
        navigate('/myaccount'); // Navigating to your Account page
      }, 3500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Order Failed");
      setIsPlacingOrder(false);
    }
  };

  // SUCCESS OVERLAY UI
  if (orderSuccess) {
    return (
      <div className="fixed inset-0 z-[999] bg-white dark:bg-dark-bg flex items-center justify-center text-center p-6">
        <div className="animate-fadeIn">
          <FaCheckCircle className="text-gold-light text-7xl mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-tighter dark:text-white font-serif">Order Confirmed!</h1>
          <p className="text-light-muted dark:text-dark-muted mb-6 max-w-sm mx-auto italic">
            Your request has been sent to the Admin. You will receive a notification once your order is processed.
          </p>
          <div className="flex items-center justify-center gap-2 text-gold-light font-bold">
            <FaSpinner className="animate-spin" />
            <span>Redirecting to your account...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg pb-20 font-serif text-light-text dark:text-dark-text">
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
        <Breadcrumb paths={[{ name: "Home", href: "/" }, { name: "Checkout" }]} />

        {/* --- TABS --- */}
        <div className="space-y-4 mb-10 mt-6">
          <div className="p-4 bg-light-section dark:bg-dark-card border-t-2 border-gold-light text-sm">
            <p>Returning Customer? <button onClick={() => setShowLogin(!showLogin)} className="text-gold-light font-bold hover:underline">Click Here To Login</button></p>
          </div>
          {showLogin && (
            <div className="p-6 border dark:border-dark-border bg-white dark:bg-dark-card animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <input type="text" placeholder="Username" className="p-3 border dark:border-dark-border bg-transparent outline-none focus:border-gold-light dark:text-white" />
                <input type="password" placeholder="Password" className="p-3 border dark:border-dark-border bg-transparent outline-none focus:border-gold-light dark:text-white" />
                <button className="bg-gold-light text-white px-8 py-3 uppercase text-xs font-bold">Login</button>
              </div>
            </div>
          )}

          <div className="p-4 bg-light-section dark:bg-dark-card border-t-2 border-gold-light text-sm">
            <p>Have A Coupon? <button onClick={() => setShowCoupon(!showCoupon)} className="text-gold-light font-bold hover:underline">Enter Code</button></p>
          </div>
          {showCoupon && (
            <div className="p-6 border dark:border-dark-border bg-white dark:bg-dark-card animate-fadeIn">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input 
                  type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon" className="flex-grow p-3 border dark:border-dark-border bg-transparent outline-none uppercase dark:text-white" 
                />
                <button onClick={handleApplyCoupon} disabled={isApplying} className="bg-gold-light text-white px-8 py-3 uppercase text-xs font-bold">
                  {isApplying ? "..." : "Apply"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* BILLING */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl font-bold border-b dark:border-dark-border pb-4">Billing Details</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="firstName" onChange={handleInputChange} type="text" placeholder="First Name *" className="p-3 bg-white dark:bg-dark-card border dark:border-dark-border outline-none focus:border-gold-light" />
              <input name="lastName" onChange={handleInputChange} type="text" placeholder="Last Name *" className="p-3 bg-white dark:bg-dark-card border dark:border-dark-border outline-none focus:border-gold-light" />
              <input name="address" onChange={handleInputChange} type="text" placeholder="Street Address *" className="md:col-span-2 p-3 bg-white dark:bg-dark-card border dark:border-dark-border outline-none focus:border-gold-light" />
              <input name="city" onChange={handleInputChange} type="text" placeholder="Town / City *" className="md:col-span-2 p-3 bg-white dark:bg-dark-card border dark:border-dark-border outline-none focus:border-gold-light" />
              <input name="phone" onChange={handleInputChange} type="text" placeholder="Phone *" className="p-3 bg-white dark:bg-dark-card border dark:border-dark-border outline-none focus:border-gold-light" />
              <input name="email" onChange={handleInputChange} type="email" placeholder="Email Address *" className="p-3 bg-white dark:bg-dark-card border dark:border-dark-border outline-none focus:border-gold-light" />
              <textarea name="orderNote" onChange={handleInputChange} rows="4" placeholder="Order Notes (Optional)" className="md:col-span-2 p-3 bg-white dark:bg-dark-card border dark:border-dark-border outline-none focus:border-gold-light" />
            </form>
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-5">
            <div className="bg-light-section dark:bg-dark-card p-8 border dark:border-dark-border shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6 italic underline underline-offset-8">Review Order</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.product?._id || item._id} className="flex justify-between text-sm italic">
                    <span>{item.product?.name || item.name} <b className="text-gold-light font-sans ml-1">x{item.quantity}</b></span>
                    <span className="font-bold font-sans">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t dark:border-dark-border text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gold-light"><span>Shipping</span><span className="font-bold">{shippingFee === 0 ? "FREE" : `$${shippingFee}`}</span></div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600 font-bold italic">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-2xl font-bold text-gold-light pt-6 border-t dark:border-dark-border">
                  <span>Total</span>
                  <span className="font-sans">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full mt-8 bg-gold-light hover:bg-gold-hover text-white font-bold py-4 uppercase tracking-widest shadow-xl transition-all disabled:opacity-50 active:scale-95"
              >
                {isPlacingOrder ? "Placing Order..." : "Confirm & Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;