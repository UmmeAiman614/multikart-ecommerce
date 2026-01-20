// src/components/CategoryShowcase.jsx
const CategoryShowcase = () => {
  const categories = [
    {
      id: 'earrings',
      categoryLabel: "EARRINGS",
      name: "Diamond Stud Earrings",
      description: "Timeless elegance for everyday wear",
      image: "/images/16.jpg",
      shopLink: "/products?category=earrings"
    },
    {
      id: 'rings',
      categoryLabel: "RINGS",
      name: "Solitaire Engagement Rings",
      description: "Symbolize your love with perfect brilliance",
      image: "/images/10.jpg",
      shopLink: "/products?category=rings"
    },
    {
      id: 'necklaces',
      categoryLabel: "NECKLACES",
      name: "Pearl Pendant Necklaces",
      description: "Classic sophistication for any occasion",
      image: "/images/4.jpg",
      shopLink: "/products?category=necklaces"
    },
    {
      id: 'bracelets',
      categoryLabel: "BRACELETS",
      name: "Gold Chain Bracelets",
      description: "Layered luxury for your wrist",
      image: "/images/22.jpg",
      shopLink: "/products?category=bracelets"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
            Shop By Category
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-light-muted dark:text-dark-muted">
            Discover our curated collections of fine jewelry
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md bg-light-card dark:bg-dark-card"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden group">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x600/f1f5f9/64748b?text=Jewelry+Collection";
                    e.target.className = "w-full h-full object-cover bg-light-card dark:bg-dark-card";
                  }}
                />
                
                {/* Text Overlay */}
                <div className="absolute top-6 right-6 max-w-[60%]">
                  <div className="mb-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-light-muted dark:text-dark-muted">
                      {category.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-light-text dark:text-light-text">
                    {category.name}
                  </h3>
                  <p className="text-sm mb-4 text-light-body dark:text-light-text">
                    {category.description}
                  </p>
                  <a 
                    href={category.shopLink}
                    className="inline-flex items-center text-sm font-bold border-b-2 border-transparent text-light-text hover:text-gold-glow transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
