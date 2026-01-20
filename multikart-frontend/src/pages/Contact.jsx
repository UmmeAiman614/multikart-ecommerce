import React from 'react';
import ContactMap from '../components/contact/ContactMap';
import ContactFormSection from '../components/contact/ContactFormSection';
import Breadcrumb from '../components/shared/Breadcrumb';

const ContactPage = () => {
    const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Contact Us" },
  ];
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="bg-light-section dark:bg-dark-card py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>
      
      <ContactMap />
      <ContactFormSection />
    </main>
  );
};

export default ContactPage;