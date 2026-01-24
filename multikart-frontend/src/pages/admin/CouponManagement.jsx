import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import API from "../../api/api";
import { FaPlus, FaTrash, FaTicketAlt, FaClock } from "react-icons/fa";

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expiry: "",
    isActive: true,
  });

  const fetchCoupons = async () => {
    try {
      const res = await API.get("/coupons/all");
      setCoupons(res.data);
    } catch (err) {
      toast.error("Failed to load coupons");
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend ko number format mein discount bhejna zaroori hai
      const finalData = { ...formData, discount: Number(formData.discount) };
      await API.post("/coupons/create", finalData);
      toast.success("Coupon Created Successfully!");
      setFormData({ code: "", discount: "", expiry: "", isActive: true });
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating coupon");
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg min-h-screen transition-colors duration-300 font-serif">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-light-text dark:text-dark-text">
          <FaTicketAlt className="text-gold-light" /> 
          Coupon Management
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* FORM: Create Coupon */}
          <div className="bg-light-card dark:bg-dark-card p-6 rounded-2xl shadow-xl border border-light-section dark:border-dark-border h-fit">
            <h3 className="text-xl font-bold mb-6 text-light-text dark:text-dark-text">Create New Offer</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-widest">Coupon Code</label>
                <input 
                  name="code" value={formData.code} onChange={handleChange}
                  placeholder="e.g. GLAM15" 
                  className="w-full p-3 bg-light-section dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gold-light text-light-text dark:text-dark-text transition-all uppercase"
                  required 
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-widest">Discount (%)</label>
                <input 
                  type="number" name="discount" value={formData.discount} onChange={handleChange}
                  placeholder="10" 
                  className="w-full p-3 bg-light-section dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gold-light text-light-text dark:text-dark-text transition-all"
                  required 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-light-muted dark:text-dark-muted uppercase tracking-widest">Expiry Date</label>
                <input 
                  type="date" name="expiry" value={formData.expiry} onChange={handleChange}
                  className="w-full p-3 bg-light-section dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-lg mt-1 outline-none focus:ring-2 focus:ring-gold-light text-light-text dark:text-dark-text transition-all"
                  required 
                />
              </div>

              <button type="submit" className="w-full bg-gold-light text-white py-4 rounded-xl font-bold hover:bg-gold-hover shadow-lg shadow-gold-light/20 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                <FaPlus /> Generate Coupon
              </button>
            </form>
          </div>

          {/* LIST: Coupons */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold mb-6 text-light-muted dark:text-dark-muted uppercase tracking-[0.2em]">Active Promotions</h3>
            
            <div className="space-y-4">
              {coupons.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-light-section dark:border-dark-border rounded-2xl text-light-muted">
                  No coupons found. Create your first offer!
                </div>
              ) : (
                coupons.map((c) => (
                  <div key={c._id} className="group bg-light-card dark:bg-dark-card p-5 rounded-2xl border border-light-section dark:border-dark-border shadow-sm flex flex-col sm:flex-row justify-between items-center transition-all hover:shadow-md hover:border-gold-light/50">
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <span className="bg-gold-light/10 text-gold-light dark:text-gold-glow px-4 py-1 rounded-full text-sm font-black tracking-widest font-mono border border-gold-light/20">
                        {c.code}
                      </span>
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="font-bold text-light-text dark:text-dark-text text-lg">{c.discount}% OFF</span>
                        <span className="flex items-center gap-1 text-light-muted dark:text-dark-muted"><FaClock size={12}/> {new Date(c.expiry).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${c.isActive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {c.isActive ? 'Live' : 'Expired'}
                      </span>
                      <button className="text-light-muted hover:text-red-500 dark:text-dark-muted dark:hover:text-red-400 transition-colors p-2">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CouponManagement;