import React, { useState } from 'react';

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Tab Data for the Sidebar
  const tabs = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Orders', icon: '🛒' },
    { name: 'Download', icon: '☁️' },
    { name: 'Payment Method', icon: '💳' },
    { name: 'Address', icon: '📍' },
    { name: 'Account Details', icon: '👤' },
    { name: 'Logout', icon: '🚪' },
  ];

  // Logic to render the content based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold mb-4 border-b border-light-section dark:border-dark-border pb-2">Dashboard</h3>
            <p className="text-light-body dark:text-dark-body">
              Hello, <span className="text-gold-light font-bold">Erik Jhonson</span> (Not Erik Jhonson? <button className="text-gold-light hover:underline">Log out</button>)
            </p>
            <p className="mt-4 text-light-muted dark:text-dark-muted leading-relaxed">
              From your account dashboard, you can easily check & view your recent orders, manage your shipping and billing addresses and edit your password and account details.
            </p>
          </div>
        );
      case 'Orders':
        return (
          <div className="animate-fadeIn overflow-x-auto">
            <h3 className="text-xl font-bold mb-4 border-b border-light-section dark:border-dark-border pb-2">Recent Orders</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-light-section dark:bg-dark-card text-light-text dark:text-dark-text">
                  <th className="p-3">Order</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-light-body dark:text-dark-body">
                <tr className="border-b border-light-section dark:border-dark-border">
                  <td className="p-3">#1234</td>
                  <td className="p-3">March 10, 2024</td>
                  <td className="p-3">Processing</td>
                  <td className="p-3 font-bold text-gold-light">$120.00</td>
                  <td className="p-3"><button className="text-gold-light hover:underline">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Account Details':
        return (
          <div className="animate-fadeIn">
            <h3 className="text-xl font-bold mb-6 border-b border-light-section dark:border-dark-border pb-2">Account Details</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded focus:outline-gold-light" />
                <input type="text" placeholder="Last Name" className="p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded focus:outline-gold-light" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded focus:outline-gold-light" />
              <button className="bg-gold-light text-white px-6 py-2 font-bold uppercase text-xs">Save Changes</button>
            </form>
          </div>
        );
      default:
        return <div className="p-10 text-center text-light-muted">Content for {activeTab} coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg py-12 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-1/4">
          <nav className="flex flex-col bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-3 p-4 text-left font-bold text-sm uppercase transition-all border-b border-light-section dark:border-dark-border last:border-0 ${
                  activeTab === tab.name 
                    ? 'bg-gold-light text-white' 
                    : 'text-light-text dark:text-dark-text hover:bg-light-section dark:hover:bg-dark-bg'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="w-full lg:w-3/4">
          <div className="bg-light-card dark:bg-dark-card p-8 border border-light-section dark:border-dark-border shadow-sm min-h-[400px]">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyAccountPage;