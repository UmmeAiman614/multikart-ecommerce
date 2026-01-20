// src/components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube, FaShoppingCart } from 'react-icons/fa';

const Footer = () => {
  const footerSections = [
    {
      title: "Shop",
      links: [
        { name: "Necklaces", href: "/products?category=necklaces" },
        { name: "Rings", href: "/products?category=rings" },
        { name: "Earrings", href: "/products?category=earrings" },
        { name: "Bracelets", href: "/products?category=bracelets" },
        { name: "New Arrivals", href: "/products?new=true" }
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQs", href: "/faqs" },
        { name: "Shipping Policy", href: "/shipping" },
        { name: "Returns & Exchanges", href: "/returns" },
        { name: "Size Guide", href: "/size-guide" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Story", href: "/story" },
        { name: "Sustainability", href: "/sustainability" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" }
      ]
    }
  ];

  return (
    /* 1. Added a solid 1px top border using your section border color */
    <footer className="mt-20 pt-16 pb-8 bg-light-bg dark:bg-dark-bg text-light-body dark:text-dark-body border-t border-light-section dark:border-dark-border relative">
      
      {/* 2. Simple Flat Gold Line at the very top */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-light dark:bg-gold-dark"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gold-light dark:bg-gold-dark p-3 rounded-2xl shadow-md">
                <FaShoppingCart className="text-2xl text-black" />
              </div>
              <span className="text-2xl font-bold text-light-text dark:text-dark-text">
                Jewel<span className="text-gold-light dark:text-gold-dark">Lux</span>
              </span>
            </div>
            <p className="mb-6 text-sm">
              Crafting timeless jewelry pieces with ethically sourced materials and exceptional craftsmanship since 2010.
            </p>
            <div className="flex space-x-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full flex items-center justify-center
                             bg-light-card dark:bg-dark-card
                             text-light-text dark:text-dark-text
                             hover:bg-gold-light hover:text-white
                             transition-all border border-light-section dark:border-dark-border shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold mb-6 text-light-text dark:text-dark-text uppercase tracking-widest">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-light-body dark:text-dark-body hover:text-gold-light transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold mb-6 text-light-text dark:text-dark-text uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="mb-4 text-sm">
              Subscribe for exclusive offers and jewelry care tips.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 text-sm border bg-light-card dark:bg-dark-card
                           text-light-text dark:text-dark-text border-light-section dark:border-dark-border
                           focus:border-gold-light outline-none transition-all rounded-sm"
              />
              <button
                type="submit"
                className="w-full bg-gold-light hover:bg-gold-hover text-white font-bold py-2 rounded-sm transition-colors uppercase text-xs tracking-widest"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-light-section dark:border-dark-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-light-muted dark:text-dark-muted">
              &copy; {new Date().getFullYear()} Jewellux. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy', 'Terms', 'Shipping'].map((item) => (
                <a key={item} href="#" className="text-xs hover:text-gold-light transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;