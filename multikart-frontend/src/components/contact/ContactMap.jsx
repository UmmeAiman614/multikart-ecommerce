import React from 'react';

const ContactMap = () => {
  return (
    <section className="w-full h-[450px] bg-light-section dark:bg-dark-card p-4 md:p-10 transition-colors duration-300">
      <div className="w-full h-full rounded-lg overflow-hidden border border-light-section dark:border-dark-border grayscale hover:grayscale-0 transition-all duration-500">
        <iframe
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6173595834!2d-73.9876123!3d40.7516208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a147!2sDiamond%20District!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactMap;