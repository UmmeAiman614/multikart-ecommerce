import { useState, useEffect } from "react";
import { FaTimes, FaGift } from "react-icons/fa";

const WelcomeModal = ({ coupon }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("hasSeenWelcome");
    // Agar user ne pehle nahi dekha aur backend se coupon mil gaya hai
    if (!hasSeen && coupon) {
      const timer = setTimeout(() => setShow(true), 2000); 
      return () => clearTimeout(timer); // Cleanup
    }
  }, [coupon]);

  const closeItems = () => {
    setShow(false);
    localStorage.setItem("hasSeenWelcome", "true");
  };

  // Agar coupon data nahi hai ya modal band hai to kuch mat dikhao
  if (!show || !coupon) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-dark-card w-full max-w-md rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative animate-in fade-in zoom-in duration-500 border border-gold-light/20">
        
        {/* Close Button */}
        <button onClick={closeItems} className="absolute top-5 right-5 text-gray-400 hover:text-gold-light transition-colors">
            <FaTimes size={20} />
        </button>
        
        <div className="p-10 text-center">
          {/* Gift Icon with Glow */}
          <div className="w-20 h-20 bg-gold-light/10 text-gold-light rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FaGift size={40} className="animate-bounce" />
          </div>

          <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-white mb-3">
            A Gift for You!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
            Welcome to our luxury collection. Use this exclusive code to sparkle with <span className="text-gold-light font-bold">{coupon.discount}% extra discount.</span>
          </p>
          
          {/* Dynamic Coupon Display */}
          <div className="relative group cursor-pointer mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-light to-gold-dark rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-dark-bg border-2 border-dashed border-gold-light p-5 rounded-xl">
                <span className="text-4xl font-black tracking-[0.2em] text-gold-dark uppercase font-mono">
                    {coupon.code}
                </span>
                <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>Valid until: {new Date(coupon.expiry).toLocaleDateString()}</span>
                    <span>One-time use</span>
                </div>
            </div>
          </div>

          <button 
            onClick={closeItems} 
            className="w-full bg-gradient-to-r from-gold-dark to-gold-light text-white py-4 rounded-xl font-bold hover:shadow-gold-light/40 hover:shadow-xl transition-all duration-300 uppercase tracking-widest text-sm"
          >
            Claim My Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;