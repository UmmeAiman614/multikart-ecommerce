import React, { useState } from 'react';

const ProductSummary = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="bg-light-bg dark:bg-dark-bg py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-dark-card border border-light-section dark:border-dark-border p-4 rounded-lg">
            <img src="https://via.placeholder.com/600" alt="Main Product" className="w-full h-auto" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-light-section dark:border-dark-border cursor-pointer hover:border-gold-light transition-colors">
                <img src={`https://via.placeholder.com/150`} alt="Thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="text-light-text dark:text-dark-text">
          <p className="text-gold-light font-medium">HasTech</p>
          <h1 className="text-3xl font-bold mt-2">Handmade Golden Necklace Full Family Package</h1>
          <div className="flex items-center gap-2 mt-2">
             <span className="text-gold-light">★★★★★</span>
             <span className="text-light-muted dark:text-dark-muted text-sm">(1 Reviews)</span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-gold-light">$70.00</span>
            <span className="text-light-muted dark:text-dark-muted line-through">$90.00</span>
          </div>

          <div className="mt-6 p-4 border border-gold-light/30 rounded bg-light-section/50 dark:bg-dark-card">
            <p className="text-sm font-semibold mb-2">Hurry up! offer ends in:</p>
            <div className="flex gap-4">
              {['00', '00', '00', '00'].map((val, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-bold">00</div>
                  <div className="text-[10px] uppercase">Days</div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-light-body dark:text-dark-body leading-relaxed">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
          </p>

          {/* Controls */}
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-semibold w-12">Qty:</span>
              <div className="flex border border-light-section dark:border-dark-border">
                <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="px-3 py-1">-</button>
                <input type="text" value={quantity} readOnly className="w-12 text-center bg-transparent" />
                <button onClick={() => setQuantity(q => q+1)} className="px-3 py-1">+</button>
              </div>
              <button className="bg-gold-light hover:bg-gold-hover text-white px-8 py-2 rounded-sm transition-all uppercase text-sm font-bold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSummary;