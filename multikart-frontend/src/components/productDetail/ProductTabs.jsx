import React, { useState } from 'react';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('description');

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="animate-fadeIn">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Ipsum metus feugiat sem, quis fermentum turpis eros eget velit.</p>
          </div>
        );
      case 'information':
        return (
          <div className="animate-fadeIn space-y-2">
            <p><strong>Material:</strong> 24K Gold Plated</p>
            <p><strong>Weight:</strong> 15g</p>
            <p><strong>Dimensions:</strong> 18cm x 2cm</p>
          </div>
        );
      case 'reviews (1)':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Existing Reviews */}
            <div>
              <h4 className="text-lg font-bold mb-4">1 review for Handmade Necklace</h4>
              <div className="flex gap-4 p-4 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border rounded">
                <div className="w-12 h-12 bg-gold-light rounded-full flex-shrink-0" />
                <div>
                  <div className="flex text-gold-light text-xs mb-1">★★★★★</div>
                  <p className="font-bold text-sm">Admin <span className="font-normal text-light-muted dark:text-dark-muted">— March 14, 2024</span></p>
                  <p className="text-sm mt-2 italic">Very beautiful piece, worth the price!</p>
                </div>
              </div>
            </div>

            {/* Review Form */}
            <div className="bg-light-card dark:bg-dark-card p-6 border border-light-section dark:border-dark-border rounded">
              <h4 className="text-lg font-bold mb-4">Add a review</h4>
              <form className="space-y-4">
                <div className="flex gap-1 text-light-muted dark:text-dark-muted mb-4">
                   Your Rating: <span className="text-gold-light">☆☆☆☆☆</span>
                </div>
                <textarea 
                  placeholder="Your Review" 
                  className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded focus:outline-gold-light text-sm"
                  rows="4"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" className="p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded focus:outline-gold-light text-sm" />
                  <input type="email" placeholder="Email" className="p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded focus:outline-gold-light text-sm" />
                </div>
                <button type="submit" className="bg-gold-light hover:bg-gold-hover text-white px-6 py-2 rounded text-sm font-bold uppercase transition-colors">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
      <div className="flex justify-center gap-8 border-b border-light-section dark:border-dark-border mb-8">
        {['description', 'information', 'reviews (1)'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 uppercase text-xs tracking-widest font-bold transition-all relative ${
              activeTab === tab 
                ? 'text-gold-light' 
                : 'text-light-muted dark:text-dark-muted hover:text-gold-light'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-light transition-all" />
            )}
          </button>
        ))}
      </div>
      <div className="text-light-body dark:text-dark-body min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductTabs;