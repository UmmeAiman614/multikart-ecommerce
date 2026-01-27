import React, { useState, useEffect } from 'react';
// Yahan apna sahi path dein jahan api.js file hai
import { fetchDashboardData } from '../../api/api'; 
import { ShoppingCart, TrendingUp, DollarSign, Package, Users, Eye, MoreVertical, Loader2 } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="rounded-xl bg-light-card p-6 shadow-sm dark:bg-dark-card border border-light-section dark:border-dark-border transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-light-muted dark:text-dark-muted">{title}</p>
        <h3 className="mt-1 text-2xl font-bold text-light-text dark:text-dark-text">{value}</h3>
      </div>
      <div className={`rounded-lg p-3 ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-1 text-xs text-accent-emerald">
      <TrendingUp size={14} />
      <span className="font-semibold">{trend}</span>
      <span className="text-light-muted dark:text-dark-muted ml-1">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({
    stats: null,
    recentOrders: [],
    bestSellers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        console.log("🚀 Requesting Dashboard summary via API instance...");
        setLoading(true);
        
        // Ab hum aapka banaya hua export function use kar rahe hain
        const response = await fetchDashboardData();
        
        console.log("✅ Admin Dashboard Data Loaded:", response.data);
        
        setData({
          stats: response.data.stats,
          recentOrders: response.data.recentOrders,
          bestSellers: response.data.bestSellers
        });
        
        setError(null);
      } catch (err) {
        console.error("❌ Dashboard API Error:", err.response?.data || err.message);
        // Agar 401 hai to iska matlab token expired hai ya galat hai
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    getDashboardData();
  }, []);

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-gold-light" size={40} />
      <p className="text-sm italic text-gold-light">Accessing Secure Records...</p>
    </div>
  );

  if (error) return (
    <div className="p-10 text-center bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 m-6">
      <p className="text-red-600 font-bold mb-2">Access Denied (401/403)</p>
      <p className="text-sm text-red-500 mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Retry</button>
    </div>
  );

  return (
    <div className="space-y-8 p-4 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">Jewelry Gallery Overview</h1>
        <p className="text-light-muted dark:text-dark-muted">Welcome back! Here's the performance of your store.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Sales" value={data.stats?.totalSalesCount || 0} icon={Package} trend={data.stats?.trends?.sales} color="bg-gold-light" />
        <StatCard title="Total Income" value={`$${data.stats?.totalIncome?.toLocaleString() || 0}`} icon={DollarSign} trend={data.stats?.trends?.income} color="bg-accent-emerald" />
        <StatCard title="Total Products" value={data.stats?.totalProducts || 0} icon={ShoppingCart} trend={data.stats?.trends?.orders} color="bg-accent-rose" />
        <StatCard title="Total Visitors" value={data.stats?.totalVisitors || 0} icon={Users} trend={data.stats?.trends?.visitors} color="bg-gold-glow" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl bg-light-card border border-light-section dark:bg-dark-card dark:border-dark-border overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-light-section dark:border-dark-border">
            <h4 className="font-bold text-light-text dark:text-dark-text">Recent Orders</h4>
            <button className="text-sm text-gold-light font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-light-bg dark:bg-dark-bg text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-section dark:divide-dark-border">
                {data.recentOrders.map((order) => (
                  <tr key={order._id} className="text-sm hover:bg-light-bg/50 transition-colors">
                    <td className="px-6 py-4 font-medium uppercase text-gold-light">{order._id.slice(-6)}</td>
                    <td className="px-6 py-4 dark:text-dark-text">{order.shippingDetails?.firstName} {order.shippingDetails?.lastName}</td>
                    <td className="px-6 py-4 font-bold text-light-text dark:text-dark-text">${order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-gold-light/10 text-gold-light'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:text-gold-light transition-colors dark:text-dark-text"><Eye size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl bg-light-card border border-light-section dark:bg-dark-card dark:border-dark-border p-6 shadow-sm">
          <h4 className="font-bold text-light-text dark:text-dark-text mb-6">Best Sellers</h4>
          <div className="space-y-6">
            {data.bestSellers.map((product) => (
              <div key={product._id} className="flex items-center gap-4 group cursor-pointer">
                <div className="h-12 w-12 rounded-lg bg-light-bg dark:bg-dark-bg overflow-hidden border border-light-section">
                  <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold leading-tight dark:text-dark-text">{product.name}</p>
                  <p className="text-[10px] text-light-muted uppercase">SKU: {product.sku || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent-emerald">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;