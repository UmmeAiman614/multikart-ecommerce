import React from 'react';
import Breadcrumb from '../components/shared/Breadcrumb'; // Assuming your breadcrumb path

const AuthPage = () => {
    const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Login-Register" },
  ];
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Breadcrumb Area */}
      <div className="bg-light-section dark:bg-dark-card py-4 border-b border-light-section dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>

      <section className="py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Sign In Form */}
          <div className="bg-light-card dark:bg-dark-card p-8 border border-light-section dark:border-dark-border shadow-sm rounded-sm animate-fadeIn">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">Sign In</h2>
            <form className="space-y-6">
              <input 
                type="text" 
                placeholder="Email or Username" 
                className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light transition-all"
              />
              <input 
                type="password" 
                placeholder="Enter your Password" 
                className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light transition-all"
              />
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-light-muted dark:text-dark-muted">
                  <input type="checkbox" className="accent-gold-light w-4 h-4" />
                  Remember Me
                </label>
                <button type="button" className="text-gold-light hover:underline italic">Forget Password?</button>
              </div>

              <button 
                type="submit" 
                className="bg-gold-light hover:bg-gold-hover text-white px-10 py-2.5 font-bold uppercase text-sm transition-all"
              >
                Login
              </button>
            </form>
          </div>

          {/* Signup Form */}
          <div className="bg-light-card dark:bg-dark-card p-8 border border-light-section dark:border-dark-border shadow-sm rounded-sm animate-fadeIn">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">Singup Form</h2>
            <form className="space-y-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light transition-all"
              />
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light transition-all"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="password" 
                  placeholder="Enter your Password" 
                  className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light transition-all"
                />
                <input 
                  type="password" 
                  placeholder="Repeat your Password" 
                  className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light transition-all"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-light-muted dark:text-dark-muted text-sm">
                <input type="checkbox" className="accent-gold-light w-4 h-4" />
                Subscribe Our Newsletter
              </label>

              <button 
                type="submit" 
                className="bg-gold-light hover:bg-gold-hover text-white px-10 py-2.5 font-bold uppercase text-sm transition-all"
              >
                Register
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
};

export default AuthPage;