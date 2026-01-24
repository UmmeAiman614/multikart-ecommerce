import React from 'react';
import { ShoppingCart, TrendingUp, DollarSign, Package, Users, Eye, MoreVertical } from 'lucide-react';

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
  // Mock data based on your screenshot requirements
  const recentOrders = [
    { id: "#ORD-7782", product: "Diamond Solitaire Ring", customer: "Amara Singh", price: "$2,450", status: "Paid", date: "Oct 24, 2025" },
    { id: "#ORD-7781", product: "Gold Hoop Earrings", customer: "Julianne Moore", price: "$850", status: "Pending", date: "Oct 24, 2025" },
    { id: "#ORD-7780", product: "Emerald Pendant", customer: "Kevin Hart", price: "$1,200", status: "Shipped", date: "Oct 23, 2025" },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">Jewelry Gallery Overview</h1>
        <p className="text-light-muted dark:text-dark-muted">Welcome back! Here is what's happening with your store today.</p>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Sales" value="34,945" icon={Package} trend="+12.5%" color="bg-gold-light" />
        <StatCard title="Total Income" value="$37,802" icon={DollarSign} trend="+8.5%" color="bg-accent-emerald" />
        <StatCard title="Orders Paid" value="1,240" icon={ShoppingCart} trend="+5.2%" color="bg-accent-rose" />
        <StatCard title="Total Visitors" value="12.5k" icon={Users} trend="+1.5%" color="bg-gold-glow" />
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Recent Orders Table (Larger Section) */}
        <div className="lg:col-span-2 rounded-xl bg-light-card border border-light-section dark:bg-dark-card dark:border-dark-border overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-light-section dark:border-dark-border">
            <h4 className="font-bold text-light-text dark:text-dark-text">Recent Orders</h4>
            <button className="text-sm text-gold-light font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-light-bg dark:bg-dark-bg text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-section dark:divide-dark-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="text-sm text-light-body dark:text-dark-body hover:bg-light-bg/50 dark:hover:bg-dark-bg/50">
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4 font-semibold text-light-text dark:text-dark-text">{order.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === 'Paid' ? 'bg-accent-emerald/10 text-accent-emerald' : 
                        order.status === 'Pending' ? 'bg-gold-light/10 text-gold-light' : 'bg-light-muted/10 text-light-muted'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:text-gold-light transition-colors"><Eye size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products Sidebar (Smaller Section) */}
        <div className="rounded-xl bg-light-card border border-light-section dark:bg-dark-card dark:border-dark-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-light-text dark:text-dark-text">Best Sellers</h4>
            <MoreVertical size={18} className="text-light-muted cursor-pointer" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-light-bg dark:bg-dark-bg flex items-center justify-center border border-light-section dark:border-dark-border">
                  <Package size={20} className="text-gold-light" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-light-text dark:text-dark-text leading-tight">18k Gold Wedding Band</p>
                  <p className="text-xs text-light-muted dark:text-dark-muted">SKU: JW-9920</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent-emerald">$1,200</p>
                  <p className="text-[10px] text-light-muted uppercase">45 Sold</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-lg border border-gold-light text-gold-light text-sm font-bold hover:bg-gold-light hover:text-white transition-all">
            Inventory Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;