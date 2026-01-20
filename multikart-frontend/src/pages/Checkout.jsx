import React, { useState } from 'react';
import Breadcrumb from '../components/shared/Breadcrumb';

const CheckoutPage = () => {
  // Toggle states for hidden sections
  const [showLogin, setShowLogin] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  const breadcrumbPaths = [ 
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Checkout" },
  ];

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300 pb-20">
      {/* Breadcrumb Section */}
      <div className="bg-light-section dark:bg-dark-card py-4 border-b border-light-section dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
        {/* top Notification Bars */}
        <div className="space-y-4 mb-10">
          <div className="p-4 bg-light-section dark:bg-dark-card border-t-2 border-gold-light text-sm">
            <p className="text-light-body dark:text-dark-body">
              Returning Customer? <button onClick={() => setShowLogin(!showLogin)} className="text-gold-light font-bold hover:underline">Click Here To Login</button>
            </p>
          </div>
          {showLogin && (
            <div className="p-6 border border-light-section dark:border-dark-border animate-fadeIn space-y-4">
              <p className="text-xs text-light-muted dark:text-dark-muted">If you have shopped with us before, please enter your details in the boxes below.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Username or email" className="p-2 bg-transparent border border-light-section dark:border-dark-border focus:outline-gold-light" />
                <input type="password" placeholder="Password" className="p-2 bg-transparent border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
              <button className="bg-gold-light text-white px-6 py-2 uppercase text-xs font-bold">Login</button>
            </div>
          )}



          {/* Coupon Notification Bar */}
          <div className="space-y-4 mb-10">
            <div className="p-4 bg-light-section dark:bg-dark-card border-t-2 border-gold-light text-sm">
              <p className="text-light-body dark:text-dark-body">
                Have A Coupon? <button
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="text-gold-light font-bold hover:underline"
                >
                  Click Here To Enter Your Code
                </button>
              </p>
            </div>

            {/* Coupon Input Area - Shows when toggled */}
            {showCoupon && (
              <div className="p-6 border border-light-section dark:border-dark-border animate-fadeIn bg-light-card dark:bg-dark-card rounded-sm">
                <p className="text-sm text-light-muted dark:text-dark-muted mb-4">
                  If you have a coupon code, please apply it below.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-grow p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-text dark:text-dark-text focus:outline-gold-light placeholder:text-light-muted dark:placeholder:text-dark-muted"
                  />
                  <button
                    className="bg-gold-light hover:bg-gold-hover text-white px-8 py-3 uppercase text-xs font-bold transition-all duration-300"
                  >
                    Apply Coupon
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Billing Details */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text border-b border-light-section dark:border-dark-border pb-4">Billing Details</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">First Name *</label>
                <input type="text" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">Last Name *</label>
                <input type="text" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">Company Name</label>
                <input type="text" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">Country *</label>
                <select className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light">
                  <option>Afghanistan</option>
                  <option>United States</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">Street Address *</label>
                <input type="text" placeholder="House number and street name" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light mb-4" />
                <input type="text" placeholder="Apartment, suite, unit etc. (optional)" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">Town / City *</label>
                <input type="text" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">Phone *</label>
                <input type="text" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-light-text dark:text-dark-text">Email Address *</label>
                <input type="email" className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>

              <div className="md:col-span-2 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-light-body dark:text-dark-body">
                  <input type="checkbox" className="accent-gold-light w-4 h-4" />
                  Create An Account?
                </label>
              </div>

              <div className="md:col-span-2 space-y-2 pt-6">
                <h3 className="font-bold text-light-text dark:text-dark-text">Order Note</h3>
                <textarea rows="4" placeholder="Notes about your order, e.g. special notes for delivery." className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border focus:outline-gold-light" />
              </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-light-section dark:bg-dark-card p-8 border border-light-section dark:border-dark-border">
              <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">Your Order Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between font-bold border-b border-light-section dark:border-dark-border pb-2 uppercase tracking-wider">
                  <span>Product</span>
                  <span>Total</span>
                </div>

                {/* Product List */}
                <div className="flex justify-between text-light-body dark:text-dark-body italic">
                  <span>Suscipit Vestibulum × 1</span>
                  <span>$165.00</span>
                </div>
                <div className="flex justify-between text-light-body dark:text-dark-body italic border-b border-light-section dark:border-dark-border pb-4">
                  <span>Ami Vestibulum recipit × 4</span>
                  <span>$165.00</span>
                </div>

                <div className="flex justify-between font-bold pt-2">
                  <span>Sub Total</span>
                  <span>$400</span>
                </div>

                <div className="flex justify-between items-center py-4 border-y border-light-section dark:border-dark-border">
                  <span className="font-bold">Shipping</span>
                  <div className="text-right space-y-1">
                    <label className="flex items-center justify-end gap-2">
                      <span className="text-xs">Flat Rate: $20.00</span>
                      <input type="radio" name="shipping" defaultChecked className="accent-gold-light" />
                    </label>
                    <label className="flex items-center justify-end gap-2">
                      <span className="text-xs">Free Shipping</span>
                      <input type="radio" name="shipping" className="accent-gold-light" />
                    </label>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold text-gold-light py-4">
                  <span>Total Amount</span>
                  <span>$420</span>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 pt-4">
                  <div className="bg-light-bg dark:bg-dark-bg p-4 border-l-4 border-gold-light">
                    <label className="flex items-center gap-3 font-bold cursor-pointer">
                      <input type="radio" name="payment" defaultChecked className="accent-gold-light" />
                      Cash On Delivery
                    </label>
                    <p className="text-xs mt-2 text-light-muted dark:text-dark-muted">Pay with cash upon delivery.</p>
                  </div>

                  {['Direct Bank Transfer', 'Pay with Check', 'Paypal'].map((method) => (
                    <label key={method} className="flex items-center gap-3 font-bold p-2 cursor-pointer text-light-text dark:text-dark-text">
                      <input type="radio" name="payment" className="accent-gold-light" />
                      {method}
                    </label>
                  ))}
                </div>

                <div className="pt-6">
                  <button className="w-full bg-gold-light hover:bg-gold-hover text-white font-bold py-4 uppercase tracking-widest transition-all">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;