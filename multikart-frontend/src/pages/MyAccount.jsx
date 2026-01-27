import React, { useState, useEffect, useRef } from 'react';
import API from '../api/api';
import { toast } from 'react-hot-toast';
import { 
  Package, User, LogOut, LayoutDashboard, 
  CheckCircle, RotateCcw, Camera, ShieldCheck, ShoppingBag, Mail, Crown, FileText
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef(null);
  const { addToCart: addToCartContext } = useCart();

  const tabs = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Orders', icon: <Package size={18} /> },
    { name: 'Account Details', icon: <User size={18} /> },
    { name: 'Logout', icon: <LogOut size={18} /> },
  ];

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [userRes, orderRes] = await Promise.all([
        API.get('/auth/profile'),
        API.get('/order/my-orders')
      ]);
      setUser(userRes.data);
      setNewName(userRes.data.name);
      // Backend populate check: items[0].product should be an object
      setOrders(orderRes.data || []);
    } catch (err) {
      toast.error("Failed to load account data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ THE MASTER EXTRACTOR: Har tarah ke nested data se product details nikalne ke liye
  const getCleanProduct = (item) => {
    // Agar item.product object hai (Populated) to usey lo, warna item ko hi as product treat karo
    const p = item?.product || item?.productId || {};
    
    // Image handling: images array -> single image string -> fallback
    let displayImg = "https://via.placeholder.com/400";
    if (p.images && Array.isArray(p.images) && p.images.length > 0) {
      displayImg = p.images[0];
    } else if (p.image) {
      displayImg = p.image;
    }

    return {
      _id: p._id || "N/A",
      name: p.name || "Exquisite Masterpiece",
      image: displayImg,
      price: item.price || p.price || 0,
      stock: p.stock ?? 1,
      description: p.description || "Crafted with precision, this piece represents the pinnacle of luxury."
    };
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      setUploading(true);
      await API.put("/auth/profile/update", formData);
      toast.success("Profile updated!");
      fetchUserData(); 
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => ['pending', 'shipped'].includes(o.orderStatus?.toLowerCase())).length,
    completed: orders.filter(o => o.orderStatus?.toLowerCase() === 'completed').length,
  };

  const OrderStepper = ({ status }) => {
    const steps = ['pending', 'shipped', 'completed'];
    const currentStatus = (status || 'pending').toLowerCase();
    const currentIndex = steps.indexOf(currentStatus);
    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-[12px] left-0 w-full h-[1px] bg-gray-200 dark:bg-dark-border z-0"></div>
          <div className="absolute top-[12px] left-0 h-[1px] bg-gold-light z-0 transition-all duration-1000" style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}></div>
          {steps.map((step, index) => (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${index <= currentIndex ? 'bg-gold-light border-gold-light text-white' : 'bg-white dark:bg-dark-card border-gray-300'}`}>
                {index <= currentIndex ? <CheckCircle size={10} /> : <div className="w-1 h-1 rounded-full bg-gray-300" />}
              </div>
              <span className={`text-[7px] uppercase font-black mt-2 tracking-tighter ${index <= currentIndex ? 'text-gold-light' : 'opacity-30'}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (loading) return <div className="py-20 text-center text-gold-light animate-pulse font-serif italic">Loading Your Sanctuary...</div>;

    switch (activeTab) {
      case 'Dashboard':
        const latestOrder = orders[0];
        const latestItem = latestOrder?.items?.[0] ? getCleanProduct(latestOrder.items[0]) : null;

        return (
          <div className="animate-fadeIn space-y-10 text-left">
            <header className="flex justify-between items-end border-b border-light-section dark:border-dark-border pb-8">
              <div>
                <h3 className="text-4xl font-serif font-bold italic flex items-center gap-4 text-light-text dark:text-dark-text">
                  <Crown className="text-gold-light" size={32} /> {user?.name}
                </h3>
                <p className="text-xs font-medium opacity-60 mt-3 tracking-wide">Welcome back. Your private collection and status updates are below.</p>
              </div>
            </header>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[{ label: 'Total Acquisitions', value: stats.total, icon: <ShoppingBag size={20}/> },
                 { label: 'In Transit', value: stats.pending, icon: <RotateCcw size={20}/> },
                 { label: 'Secured Pieces', value: stats.completed, icon: <ShieldCheck size={20}/> }
               ].map((stat, i) => (
                 <div key={i} className="bg-light-bg dark:bg-dark-bg p-8 rounded-[2rem] border border-light-section dark:border-dark-border shadow-sm hover:shadow-md transition-shadow">
                   <div className="text-gold-light mb-3">{stat.icon}</div>
                   <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mt-1">{stat.label}</p>
                 </div>
               ))}
            </section>

            {latestOrder && latestItem ? (
              <div className="p-10 bg-gradient-to-br from-gold-light/5 via-transparent to-transparent border border-gold-light/20 rounded-[3rem] shadow-sm">
                <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-light">Latest Acquisition</span>
                    <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Order ID: #{latestOrder._id.slice(-6)}</span>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                   <div className="relative group shrink-0">
                      <img src={latestItem.image} className="w-40 h-40 object-cover rounded-[3rem] border-2 border-gold-light/10 shadow-2xl transition-transform group-hover:scale-105 duration-700" alt={latestItem.name} />
                      <div className="absolute -top-3 -right-3 bg-gold-light text-white text-[8px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-tighter">New</div>
                   </div>
                   
                   <div className="flex-1 space-y-4 text-center lg:text-left">
                     <h4 className="text-3xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tight">{latestItem.name}</h4>
                     <div className="inline-flex items-center gap-2 text-[9px] font-black text-gold-light uppercase tracking-[0.2em] border-b border-gold-light/10 pb-1">
                        <FileText size={14}/> Piece Description
                     </div>
                     <p className="text-sm leading-relaxed opacity-70 italic font-medium max-w-xl mx-auto lg:mx-0">
                        "{latestItem.description}"
                     </p>
                     <p className="text-xl font-black text-gold-light font-serif">${latestItem.price}</p>
                   </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gold-light/10">
                   <OrderStepper status={latestOrder.orderStatus} />
                </div>
              </div>
            ) : (
                <div className="py-24 text-center border-2 border-dashed border-light-section dark:border-dark-border rounded-[4rem]">
                    <p className="opacity-40 italic font-serif text-lg">Your vault awaits its first masterpiece.</p>
                </div>
            )}
          </div>
        );

      case 'Orders':
        return (
          <div className="animate-fadeIn space-y-8 text-left">
            <h3 className="text-2xl font-serif font-bold italic border-b border-light-section pb-5 text-light-text dark:text-dark-text uppercase tracking-tighter">Order History</h3>
            {orders.length === 0 ? <p className="text-center opacity-50 py-20 italic">No acquisitions found.</p> : 
              orders.map(order => (
                <div key={order._id} className="bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border p-8 rounded-[3rem] mb-10 group hover:border-gold-light/30 transition-colors">
                  <div className="flex justify-between items-center mb-8 border-b border-light-section dark:border-dark-border pb-4">
                    <span className="text-[9px] font-black uppercase opacity-40 tracking-widest">Acquisition Date: {new Date(order.createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</span>
                    <span className="text-sm font-black text-gold-light uppercase tracking-tighter">Total Investment: ${order.totalAmount}</span>
                  </div>
                  
                  <div className="space-y-8">
                    {order.items?.map((item, idx) => {
                      const details = getCleanProduct(item);
                      return (
                        <div key={idx} className="space-y-4">
                          <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-dark-card p-6 rounded-[2.5rem] border border-light-section dark:border-dark-border gap-8 shadow-sm group-hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-6 w-full">
                              <img src={details.image} className="w-20 h-20 object-cover rounded-[1.5rem] border border-gold-light/5 shadow-inner" alt={details.name} />
                              <div className="space-y-1">
                                <h4 className="text-sm font-black uppercase tracking-tight text-light-text dark:text-dark-text">{details.name}</h4>
                                <p className="text-xs text-gold-light font-bold">${details.price} <span className="text-gray-400 mx-2">|</span> Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => {
                                  if(details.stock > 0) {
                                      addToCartContext(details, 1);
                                      toast.success("Masterpiece added to cart");
                                  } else toast.error("Currently Sold Out");
                              }} 
                              className="w-full md:w-auto bg-gold-light text-white text-[10px] font-black uppercase px-10 py-4 rounded-full hover:bg-gold-hover transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-light/20"
                            >
                              <RotateCcw size={14} /> Buy Again
                            </button>
                          </div>
                          <div className="px-8 py-2">
                             <p className="text-xs opacity-60 italic leading-relaxed border-l-2 border-gold-light/20 pl-4">
                                {details.description}
                             </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-8 pt-6 border-t border-light-section dark:border-dark-border">
                     <OrderStepper status={order.orderStatus} />
                  </div>
                </div>
              ))
            }
          </div>
        );

      case 'Account Details':
        return (
          <div className="animate-fadeIn space-y-12 text-left">
            <h3 className="text-2xl font-serif font-bold italic border-b border-light-section pb-5 text-light-text dark:text-dark-text uppercase tracking-tighter">Identity Management</h3>
            <div className="space-y-10 max-w-xl">
                <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-gold-light flex items-center gap-2 tracking-[0.2em]"><User size={14}/> Display Name</label>
                    <div className="flex gap-4">
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-2xl px-6 py-4 focus:border-gold-light outline-none text-sm w-full font-bold shadow-inner transition-colors" />
                        <button onClick={async () => {
                            try {
                                await API.put('/auth/update-profile', { name: newName });
                                toast.success("Identity updated");
                                fetchUserData();
                            } catch (e) { toast.error("Update failed"); }
                        }} className="bg-gold-light text-white px-10 rounded-2xl text-[10px] font-black uppercase hover:bg-gold-hover shadow-xl transition-all active:scale-95">Update</button>
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase font-black text-gray-400 flex items-center gap-2 tracking-[0.2em]"><Mail size={14}/> Email Address (Private)</label>
                    <input type="email" value={user?.email || ""} disabled className="bg-gray-100 dark:bg-dark-border border border-light-section dark:border-dark-border rounded-2xl px-6 py-4 text-sm w-full font-bold opacity-40 cursor-not-allowed" />
                </div>
            </div>
          </div>
        );

      case 'Logout':
        return (
          <div className="animate-fadeIn text-center py-24 space-y-8">
            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner"><LogOut size={40} /></div>
            <div className="space-y-2">
                <h3 className="text-3xl font-serif font-bold italic">Secure Sign Out?</h3>
                <p className="text-sm opacity-50 max-w-xs mx-auto">You will need to re-authenticate to access your private collection.</p>
            </div>
            <div className="flex gap-6 justify-center pt-6">
                <button onClick={() => setActiveTab('Dashboard')} className="px-12 py-4 rounded-full border border-light-section dark:border-dark-border font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }} className="bg-red-500 text-white px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-red-600 transition-all shadow-red-500/20">Sign Out</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-24 px-4 md:px-10 transition-colors duration-700">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border rounded-[4rem] p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] sticky top-24 text-center">
            <div className="relative w-44 h-44 mx-auto mb-8 group">
                <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-gold-light/5 shadow-2xl bg-gray-50">
                    <img src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className="w-full h-full object-cover" alt="Profile" />
                    {uploading && <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-[9px] font-black tracking-widest animate-pulse uppercase">Syncing...</div>}
                </div>
                <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-2 right-2 bg-gold-light text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 border-4 border-white dark:border-dark-card"
                >
                    <Camera size={20} />
                </button>
                <input type="file" ref={fileInputRef} hidden onChange={handleImageUpload} accept="image/*" />
            </div>

            <h2 className="text-3xl font-serif font-bold uppercase tracking-tighter mb-2 text-light-text dark:text-dark-text">{user?.name}</h2>
            <span className="text-[10px] text-gold-light font-black tracking-[0.4em] uppercase border-y border-gold-light/10 py-1.5 italic mb-12 inline-block">Exclusive Luxury Client</span>

            <nav className="space-y-4">
              {tabs.map((tab) => (
                <button 
                  key={tab.name} 
                  onClick={() => setActiveTab(tab.name)} 
                  className={`w-full flex items-center gap-6 px-10 py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === tab.name ? 'bg-gold-light text-white shadow-2xl shadow-gold-light/40 translate-x-2' : 'text-light-text dark:text-dark-text hover:bg-gold-light/5 hover:text-gold-light'}`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="w-full lg:w-2/3">
          <div className="bg-light-card dark:bg-dark-card min-h-[700px] rounded-[4rem] p-10 md:p-16 border border-light-section dark:border-dark-border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyAccountPage;