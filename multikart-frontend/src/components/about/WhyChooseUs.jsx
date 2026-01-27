import React from 'react';
import { Truck, ShieldCheck, Headphones, Gem } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Complimentary Shipping",
      desc: "Experience seamless luxury with our insured, worldwide delivery service on every order.",
      icon: <Truck size={32} strokeWidth={1.5} />,
      color: "bg-[#F4EBD0]" // Subtle gold tint
    },
    {
      title: "Secured Integrity",
      desc: "Each piece comes with certified authenticity and a lifetime warranty for your peace of mind.",
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      color: "bg-[#EBD0D0]" // Subtle rose tint
    },
    {
      title: "Concierge Support",
      desc: "Our jewelry experts are available 24/7 to assist you with styling and personalized gifting.",
      icon: <Headphones size={32} strokeWidth={1.5} />,
      color: "bg-[#D0E4EB]" // Subtle blue tint
    }
  ];

  return (
    <section className="bg-light-section dark:bg-[#0A0A0A] py-28 px-4 md:px-10 transition-colors duration-500 relative overflow-hidden">
      
      {/* Subtle Background Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[12vw] font-black text-black/[0.02] dark:text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        EXCELLENCE • QUALITY
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header - Minimalist & Elegant */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="h-[1px] w-12 bg-gold-light"></div>
            <Gem className="text-gold-light" size={20} />
            <div className="h-[1px] w-12 bg-gold-light"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tight">
            The <span className="text-gold-light">Elite</span> Experience
          </h2>
          <p className="text-light-muted dark:text-dark-muted max-w-xl mx-auto font-medium text-sm uppercase tracking-[0.2em]">
            Crafting more than just jewelry, we create lasting memories.
          </p>
        </div>

        {/* Features Grid - Modern Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div 
              key={index} 
              className="group relative bg-light-card dark:bg-dark-card p-10 rounded-[2.5rem] border border-transparent hover:border-gold-light/20 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-3"
            >
              {/* Icon Container with Animated Background */}
              <div className="relative w-20 h-20 mb-8 mx-auto flex items-center justify-center rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gold-light opacity-10 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-700"></div>
                <div className="relative text-gold-light group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center space-y-4">
                <h3 className="text-lg font-bold text-light-text dark:text-dark-text uppercase tracking-widest">
                  {item.title}
                </h3>
                <div className="w-8 h-[2px] bg-gold-light/30 mx-auto group-hover:w-16 transition-all duration-500"></div>
                <p className="text-light-body dark:text-dark-body leading-relaxed text-sm opacity-80 font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Subtle Card Numbering */}
              <span className="absolute bottom-6 right-10 text-5xl font-serif italic font-black text-black/[0.03] dark:text-white/[0.03] group-hover:text-gold-light/10 transition-colors">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;