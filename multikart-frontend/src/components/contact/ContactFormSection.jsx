import React from 'react';

const ContactFormSection = () => {
  return (
    <section className="bg-light-bg dark:bg-dark-bg py-16 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Contact Form */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text uppercase tracking-tight">
            Tell Us Your Project
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name *" 
                className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light rounded-sm"
              />
              <input 
                type="text" 
                placeholder="Phone *" 
                className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light rounded-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="email" 
                placeholder="Email *" 
                className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light rounded-sm"
              />
              <input 
                type="text" 
                placeholder="Subject *" 
                className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light rounded-sm"
              />
            </div>
            <textarea 
              rows="6" 
              placeholder="Message *" 
              className="w-full p-3 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light rounded-sm"
            ></textarea>
            <button 
              type="submit" 
              className="bg-gold-light hover:bg-gold-hover text-white px-10 py-3 uppercase text-sm font-bold transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Information */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text uppercase tracking-tight">
            Contact Us
          </h2>
          <p className="text-light-muted dark:text-dark-muted leading-relaxed">
            Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica.
          </p>
          
          <div className="space-y-6 pt-4">
            <div className="flex items-start gap-4">
              <span className="text-gold-light text-xl mt-1">📍</span>
              <div>
                <p className="font-bold text-light-text dark:text-dark-text">Address :</p>
                <p className="text-light-muted dark:text-dark-muted text-sm mt-1">No 40 Baria Sreet 133/2 NewYork City</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-gold-light text-xl mt-1">📧</span>
              <div>
                <p className="font-bold text-light-text dark:text-dark-text">Email :</p>
                <p className="text-light-muted dark:text-dark-muted text-sm mt-1">info@yourdomain.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-gold-light text-xl mt-1">📞</span>
              <div>
                <p className="font-bold text-light-text dark:text-dark-text">Phone :</p>
                <p className="text-light-muted dark:text-dark-muted text-sm mt-1">+88013245657</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-light-section dark:border-dark-border">
            <h3 className="font-bold text-light-text dark:text-dark-text uppercase mb-2">Working Hours</h3>
            <p className="text-light-muted dark:text-dark-muted text-sm">
              Monday – Saturday: <span className="text-gold-light font-medium">08AM – 22PM</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;