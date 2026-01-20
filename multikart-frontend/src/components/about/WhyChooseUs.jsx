import React from 'react';
// Note: You can replace these placeholders with Lucide-react or FontAwesome icons
const WhyChooseUs = () => {
  const features = [
    {
      title: "Free Shipping",
      desc: "Amado Shop is a very slick and clean e-commerce template with endless possibilities.",
      icon: "🌐"
    },
    {
      title: "Fast Delivery",
      desc: "Amado Shop is a very slick and clean e-commerce template with endless possibilities.",
      icon: "✈️"
    },
    {
      title: "Customers Support",
      desc: "Amado Shop is a very slick and clean e-commerce template with endless possibilities.",
      icon: "💬"
    }
  ];

  return (
    <section className="bg-light-section dark:bg-dark-card py-20 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text uppercase tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-light-muted dark:text-dark-muted max-w-2xl mx-auto italic">
            Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div key={index} className="text-center group p-6 rounded-xl hover:bg-light-card dark:hover:bg-dark-bg transition-all duration-300">
              <div className="text-5xl mb-6 inline-block text-gold-light group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-light-body dark:text-dark-body leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;