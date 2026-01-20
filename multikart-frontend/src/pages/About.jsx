import React from 'react';
import AboutIntro from '../components/about/AboutIntro';
import WhyChooseUs from '../components/about/WhyChooseUs';
import TestimonialsSlider from '../components/home/TestimonialsSlider';
import Breadcrumb from '../components/shared/Breadcrumb';

const AboutPage = () => {
    const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "About" },
  ];
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Breadcrumb Area */}
      <div className="bg-light-section dark:bg-dark-card py-4 border-b border-light-section dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>

      <AboutIntro />
      <WhyChooseUs />
        <TestimonialsSlider />
      
      {/* If you wanted to add the Team or Testimonials later, they would go here */}
    </main>
  );
};

export default AboutPage;