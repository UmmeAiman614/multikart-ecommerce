import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, Layers, ShoppingCart,
  Users, MessageSquare, ChevronDown, Diamond,
  ArrowLeft, Home, LogOut, Ticket
} from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';

const SidebarItem = ({ icon: Icon, label, children, isOpen, onClick, to }) => {
  const location = useLocation();
  const isActive = to ? location.pathname === to : isOpen;

  const content = (
    <div className="flex items-center gap-3">
      <Icon size={20} className={isActive ? "text-white" : "text-gold-light"} />
      <span className="font-medium">{label}</span>
    </div>
  );

  return (
    <div className="mb-1">
      {to ? (
        <Link
          to={to}
          onClick={onClick}
          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${isActive
              ? 'bg-gradient-to-r from-gold-light to-gold-hover text-white shadow-lg shadow-gold-light/30 scale-[1.02]'
              : 'text-light-body hover:bg-gold-light/10 dark:text-dark-body dark:hover:bg-gold-light/5'
            }`}
        >
          {content}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 ${isActive
              ? 'bg-gold-light/10 text-gold-light border border-gold-light/20'
              : 'text-light-body hover:bg-gold-light/10 dark:text-dark-body dark:hover:bg-gold-light/5'
            }`}
        >
          {content}
          {children && <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
        </button>
      )}

      {isOpen && children && (
        <div className="mt-1 ml-6 flex flex-col gap-1 border-l border-gold-light/20 pl-4 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleTab = (tab) => setActiveTab(activeTab === tab ? '' : tab);

  const SubLink = ({ to, label }) => (
    <Link
      to={to}
      className={`text-sm py-2 px-2 rounded-lg transition-colors hover:text-gold-light ${location.pathname === to ? 'text-gold-light font-bold bg-gold-light/5' : 'text-light-muted dark:text-dark-muted'
        }`}
    >
      {label}
    </Link>
  );

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col transform border-r border-light-section bg-light-card px-4 py-6 transition-transform dark:border-dark-border dark:bg-dark-card lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      {/* 🛠️ UPDATED BRAND LOGO: JewelLux Style */}
      <div className="mb-10 flex items-center gap-3 px-2 flex-shrink-0 cursor-pointer" onClick={() => navigate("/admin")}>
        <div className="w-10 h-10 bg-gradient-to-br from-gold-light to-gold-dark rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
          <span className="text-white font-black text-xl italic">J</span>
        </div>
        <span className="text-xl font-serif font-bold tracking-tighter dark:text-white">
          Jewel<span className="text-gold-light italic">Lux</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 flex-grow overflow-y-auto no-scrollbar relative">
        <div className="flex flex-col gap-1 pb-10">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/admin" onClick={() => setActiveTab('dashboard')} />

          <SidebarItem icon={ShoppingBag} label="Ecommerce" onClick={() => toggleTab('ecommerce')} isOpen={activeTab === 'ecommerce'}>
            <SubLink to="/admin/ecommerce/add-product" label="Add Product" />
            <SubLink to="/admin/ecommerce/product-list" label="Product List" />
          </SidebarItem>

          <SidebarItem icon={Layers} label="Categories" onClick={() => toggleTab('categories')} isOpen={activeTab === 'categories'}>
            <SubLink to="/admin/categories/add-category" label="New Category" />
            <SubLink to="/admin/categories/list" label="All Categories" />
          </SidebarItem>

          <SidebarItem icon={ShoppingCart} label="Orders" onClick={() => toggleTab('orders')} isOpen={activeTab === 'orders'}>
            <SubLink to="/admin/orders/pending" label="Pending Orders" />
            <SubLink to="/admin/orders/shipped" label="Shipped Orders" /> 
            <SubLink to="/admin/orders/completed" label="Completed Orders" />
          </SidebarItem>

          <SidebarItem icon={Users} label="Users" onClick={() => toggleTab('users')} isOpen={activeTab === 'users'}>
            <SubLink to="/admin/users/add-user" label="Add User" />
            <SubLink to="/admin/users/list" label="User List" />
          </SidebarItem>
          
          <SidebarItem icon={MessageSquare} label="Reviews" to="/admin/reviews" onClick={() => setActiveTab('reviews')} />
          <SidebarItem icon={Ticket} label="Coupons" to="/admin/coupons" onClick={() => setActiveTab('coupons')} />
          <SidebarItem icon={MessageSquare} label="Testimonials" to="/admin/testimonials" onClick={() => setActiveTab('testimonials')} />
        </div>
      </nav>

      {/* BOTTOM SECTION */}
      <div className="mt-auto pt-6 border-t border-light-section dark:border-dark-border space-y-4 flex-shrink-0">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gold-light/30 text-gold-light hover:bg-gold-light hover:text-white transition-all duration-300 group shadow-lg shadow-gold-light/5 hover:shadow-gold-light/20"
        >
          <div className="bg-gold-light/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors">
            <Home size={18} className="group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-bold text-xs uppercase tracking-[0.15em]">Back to Store</span>
          <ArrowLeft size={16} className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* User Profile Mini-Card */}
        <div className="p-3 rounded-2xl bg-light-section/50 dark:bg-dark-bg/50 border border-light-section dark:border-dark-border flex items-center gap-3 backdrop-blur-sm">
          <div className="h-10 w-10 rounded-full overflow-hidden shadow-md flex-shrink-0 border-2 border-gold-light/20 relative">
            {user?.image ? (
              <img
                src={user.image}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-tr from-gold-dark to-gold-light flex items-center justify-center text-white font-bold text-lg">
                {user?.name?.charAt(0) || 'A'}
              </div>
            )}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-dark-bg"></span>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate dark:text-white leading-none mb-1">
              {user?.name || 'Admin'}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-light animate-pulse"></span>
              <span className="text-[10px] text-gold-light font-bold uppercase tracking-tighter">
                {user?.role === 'admin' ? 'Super Admin' : 'Manager'}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="ml-auto p-2 text-light-muted hover:text-accent-rose hover:bg-accent-rose/10 rounded-lg transition-all"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;