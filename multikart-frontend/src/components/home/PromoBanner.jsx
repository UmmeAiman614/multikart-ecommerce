import { useState, useEffect } from "react";
import { FaGem, FaCopy, FaClock } from "react-icons/fa";
import { toast } from "react-hot-toast";
import  API  from "../../api/api"; // Aapka axios instance

const PromoBanner = () => {
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const res = await API.get("/coupons/latest"); // Nayi API call
        setCoupon(res.data);
      } catch (err) {
        console.log("No active coupon found");
      }
    };
    fetchPromo();
  }, []);

  if (!coupon) return null; // Agar koi coupon active nahi hai toh banner nahi dikhega

  const copyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    toast.success("Code copied! Ready for checkout.");
  };

  return (
    <div className="bg-gradient-to-r from-[#B8860B] via-[#FFD700] to-[#B8860B] py-2 px-4 text-black shadow-md border-b border-gold-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        
        <div className="flex items-center gap-2">
          <FaGem className="text-white animate-bounce" />
          <p className="text-xs font-bold uppercase tracking-widest">
            Special Offer: <span className="text-white">{coupon.discount}% OFF</span> 
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-black/10 border border-black/20 rounded px-3 py-1 gap-2 cursor-pointer hover:bg-black/20" onClick={copyCode}>
            <span className="font-mono font-black text-sm">{coupon.code}</span>
            <FaCopy size={12} />
          </div>
          
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase">
            <FaClock /> 
            <span>Expires: {new Date(coupon.expiry).toLocaleDateString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromoBanner;