import React from 'react';

const AboutIntro = () => {
  return (
    <section className="bg-light-bg dark:bg-dark-bg py-16 px-4 md:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Brand Image */}
        <div className="w-full md:w-1/2">
          <div className="relative p-2 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border rounded-lg shadow-sm">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt="About Our Brand" 
              className="w-full h-auto rounded shadow-inner"
            />
          </div>
        </div>

        {/* Right: Story Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text">
            About Us
          </h1>
          <div className="space-y-4">
            <p className="text-lg font-bold text-light-body dark:text-dark-body">
              Founded in 1986, I.D. Jewelry, LLC, a family owned & operated business 
              has become a household name in states all over the USA.
            </p>
            <p className="text-light-muted dark:text-dark-muted leading-relaxed">
              For those that rather the full immersion of the in-store experience we welcome 
              your company and look forward to meeting you face to face. Being located in the 
              47th street diamond district, known to be the largest diamond hub.
            </p>
            <p className="text-light-muted dark:text-dark-muted leading-relaxed">
              I.D. Jewelry has some of the most competitively priced in the market. 
              It is our goal to supply our clients with quality and value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;