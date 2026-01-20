const RelatedProducts = () => {
  const products = [
    { name: 'Perfect Diamond Jewelry', price: '$99.00', tag: 'New', color: 'bg-accent-emerald' },
    { name: 'Diamond Exclusive Ornament', price: '$55.00', tag: 'Sale', color: 'bg-gold-light' },
    { name: 'Citygold Exclusive Ring', price: '$60.00', tag: 'New', color: 'bg-accent-rose' },
    { name: 'Perfect Diamond Jewelry', price: '$80.00', tag: 'New', color: 'bg-gold-light' },
  ];

  return (
    <section className="bg-light-section dark:bg-dark-card py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Related Products</h2>
          <p className="text-light-muted dark:text-dark-muted mt-2">Add related products to weekly lineup</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-white dark:bg-dark-bg p-6 rounded-md">
                <span className="absolute top-4 left-4 bg-gold-light text-white text-[10px] px-2 py-1 rounded">
                  {item.tag}
                </span>
                <img src="https://via.placeholder.com/300" alt={item.name} className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-light-text dark:text-dark-text font-medium group-hover:text-gold-light transition-colors">
                  {item.name}
                </h3>
                <p className="text-gold-light font-bold mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;