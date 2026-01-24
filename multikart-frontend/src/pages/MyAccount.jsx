import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { toast } from 'react-hot-toast';
import { Package, MapPin, User, LogOut, LayoutDashboard, Bell, Camera, Clock, CheckCircle, Truck } from 'lucide-react';

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Orders', icon: <Package size={18} /> },
    { name: 'Address', icon: <MapPin size={18} /> },
    { name: 'Account Details', icon: <User size={18} /> },
    { name: 'Logout', icon: <LogOut size={18} /> },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userRes = await API.get('/auth/profile'); 
        setUser(userRes.data);
        const orderRes = await API.get('/order/my-orders');
        setOrders(orderRes.data || []);
      } catch (err) {
        toast.error("Failed to load account data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Stats Logic
  const stats = {
    total: orders.length,
    pending: orders.filter(o => (o.orderStatus || '').toLowerCase() === 'pending').length,
    shipped: orders.filter(o => (o.orderStatus || '').toLowerCase() === 'shipped').length,
    completed: orders.filter(o => (o.orderStatus || '').toLowerCase() === 'completed').length
  };

  // Address Logic
  const lastOrder = orders.length > 0 ? orders[0] : null;
  const shipping = lastOrder?.shippingDetails || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const renderTabContent = () => {
    if (loading) return <div className="py-20 text-center text-gold-light italic animate-pulse tracking-widest">LOADING DATA...</div>;

    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="animate-fadeIn space-y-8">
            <h3 className="text-2xl font-serif font-bold italic border-b border-light-section pb-2 uppercase tracking-tighter">Dashboard Overview</h3>
            
            <div className="bg-gold-light/5 p-6 rounded-2xl border border-gold-light/10">
              <p className="text-lg">Hello, <span className="text-gold-light font-bold">{user?.name}</span>!</p>
              <p className="mt-2 text-sm text-light-muted leading-relaxed">
                From your account dashboard, you can easily track your recent orders, manage your shipping addresses, and edit your profile details.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-light-bg dark:bg-dark-bg border border-light-section rounded-2xl text-center shadow-sm">
                    <p className="text-[10px] uppercase opacity-50 font-bold mb-1 tracking-widest">Total</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-2xl text-center">
                    <p className="text-[10px] uppercase text-orange-600 font-bold mb-1 flex items-center justify-center gap-1"><Clock size={10}/> Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-center">
                    <p className="text-[10px] uppercase text-blue-600 font-bold mb-1 flex items-center justify-center gap-1"><Truck size={10}/> Shipped</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.shipped}</p>
                </div>
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-center">
                    <p className="text-[10px] uppercase text-emerald-600 font-bold mb-1 flex items-center justify-center gap-1"><CheckCircle size={10}/> Completed</p>
                    <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
                </div>
            </div>
          </div>
        );

      case 'Orders':
        return (
          <div className="animate-fadeIn space-y-4">
            <h3 className="text-xl font-bold mb-4 italic font-serif uppercase tracking-tighter">Recent Purchase History</h3>
            {orders.length === 0 ? <p className="text-center opacity-50 py-10 italic">No orders found.</p> : 
              orders.map(order => (
                <div key={order._id} className="border border-light-section dark:border-dark-border p-5 rounded-2xl hover:border-gold-light/40 transition-all">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-gold-light tracking-[0.2em]">ID: #{order._id.slice(-6).toUpperCase()}</span>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                        order.orderStatus === 'completed' ? 'bg-emerald-500 text-white' : 
                        order.orderStatus === 'shipped' ? 'bg-blue-500 text-white' : 'bg-orange-500 text-white'
                    }`}>{order.orderStatus}</span>
                  </div>
                  <div className="bg-light-bg dark:bg-dark-bg p-3 rounded-xl border-l-4 border-gold-light mb-3">
                    <p className="text-[9px] font-bold text-gold-light uppercase flex items-center gap-1 mb-1 tracking-widest"><Bell size={10}/> Tracking Update</p>
                    <p className="text-xs italic opacity-80">
                        {order.notifications?.length > 0 ? order.notifications[order.notifications.length-1].message : "Your order is being processed by our warehouse team."}
                    </p>
                  </div>
                  <div className="flex justify-between items-end text-xs pt-2 border-t border-light-section/50">
                    <span className="opacity-50">{new Date(order.createdAt).toDateString()}</span>
                    <span className="font-bold text-sm text-gold-light">${order.totalAmount}</span>
                  </div>
                </div>
              ))
            }
          </div>
        );

      case 'Address':
        return (
          <div className="animate-fadeIn space-y-6">
            <h3 className="text-xl font-bold mb-4 italic font-serif uppercase tracking-tighter">Default Shipping Address</h3>
            
            {/* Check if address exists in the first order */}
            {orders.length > 0 && orders[0].shippingDetails ? (
                <div className="p-8 border border-gold-light/20 bg-gold-light/5 rounded-[2.5rem] relative overflow-hidden group">
                    <MapPin className="absolute -right-6 -bottom-6 w-32 h-32 opacity-5 text-gold-light group-hover:scale-110 transition-transform" />
                    
                    <p className="text-xs font-bold text-gold-light uppercase mb-6 tracking-[0.3em] border-b border-gold-light/20 pb-2">Primary Destination</p>
                    
                    <div className="space-y-2">
                        {/* Name from Backend */}
                        <p className="text-xl font-bold tracking-tight">
                          {orders[0].shippingDetails.firstName} {orders[0].shippingDetails.lastName}
                        </p>
                        
                        {/* Address and City from Backend */}
                        <p className="text-sm opacity-80 leading-relaxed max-w-[80%]">
                          {orders[0].shippingDetails.address}
                        </p>
                        
                        <p className="text-sm opacity-80 uppercase tracking-wider">
                          {orders[0].shippingDetails.city}
                        </p>
                        
                        {/* Phone from Backend */}
                        <div className="pt-6 flex items-center gap-3 text-sm font-mono text-gold-light">
                            <span className="bg-gold-light text-white text-[9px] px-2 py-1 rounded-md font-sans">CONTACT</span>
                            {orders[0].shippingDetails.phone}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-24 bg-light-bg/50 rounded-3xl border-2 border-dashed border-light-section">
                    <MapPin size={40} className="mx-auto opacity-10 mb-4" />
                    <p className="text-sm opacity-40 uppercase tracking-widest font-bold">No Address Found</p>
                    <p className="text-xs opacity-40 mt-2">Place an order to see your shipping details here.</p>
                </div>
            )}
          </div>
        );

      case 'Account Details':
        return (
          <div className="animate-fadeIn space-y-8">
            <h3 className="text-xl font-bold italic font-serif uppercase tracking-tighter">Profile Information</h3>
            <div className="grid grid-cols-1 gap-6">
                <div className="p-5 bg-light-bg rounded-2xl border border-light-section flex justify-between items-center">
                    <div>
                        <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Full Name</p>
                        <p className="font-bold text-lg">{user?.name}</p>
                    </div>
                    <User size={20} className="opacity-20" />
                </div>
                <div className="p-5 bg-light-bg rounded-2xl border border-light-section flex justify-between items-center">
                    <div>
                        <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest mb-1">Email Address</p>
                        <p className="font-bold italic">{user?.email}</p>
                    </div>
                    <Bell size={20} className="opacity-20" />
                </div>
                <p className="text-[10px] text-center text-light-muted italic tracking-wide uppercase">Profile management is currently under maintenance.</p>
            </div>
          </div>
        );

      case 'Logout':
        return (
          <div className="text-center py-16">
            <h3 className="text-2xl font-serif italic mb-8">Are you sure you want to log out?</h3>
            <button onClick={handleLogout} className="bg-red-500 text-white px-16 py-4 rounded-full font-bold shadow-2xl shadow-red-500/20 hover:bg-red-600 transition-all uppercase tracking-widest text-xs">Confirm Logout</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-1/3">
          <div className="bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border rounded-[3rem] p-10 shadow-2xl shadow-black/5">
            <div className="text-center mb-10">
              <div className="relative w-36 h-36 mx-auto mb-6">
                <img 
                  src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full border-8 border-gold-light/10 p-1 shadow-2xl"
                />
                <div className="absolute bottom-1 right-3 bg-gold-light p-2.5 rounded-full text-white shadow-xl">
                  <Camera size={16} />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-bold uppercase tracking-tighter">{user?.name}</h2>
              <p className="text-[10px] text-gold-light font-black tracking-[0.4em] mt-2 border-y border-gold-light/20 py-1 inline-block">AUTHENTIC MEMBER</p>
            </div>

            <nav className="space-y-3 mt-12">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-5 px-8 py-5 rounded-[1.5rem] font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${
                    activeTab === tab.name 
                      ? 'bg-gold-light text-white shadow-2xl shadow-gold-light/40 translate-x-3' 
                      : 'hover:bg-gold-light/5 text-light-text dark:text-dark-text hover:text-gold-light hover:translate-x-1'
                  }`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="w-full lg:w-2/3">
          <div className="bg-light-card dark:bg-dark-card min-h-[700px] rounded-[3.5rem] p-10 md:p-16 border border-light-section dark:border-dark-border shadow-2xl shadow-black/5">
            {renderTabContent()}
          </div>
        </main>

      </div>
    </div>
  );
};

export default MyAccountPage;