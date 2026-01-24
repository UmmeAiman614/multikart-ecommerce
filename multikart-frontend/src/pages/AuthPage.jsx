import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons
import Breadcrumb from '../components/shared/Breadcrumb';
import { loginUser, registerUser, getProfile } from '../api/api';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  
  // State for toggling password visibility
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegisterPass, setShowRegisterPass] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const breadcrumbPaths = [{ name: "Home", href: "/" }, { name: "Login-Register" }];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginUser(loginData);
      localStorage.setItem("token", data.token);
      const profile = await getProfile();
      setUser(profile.data);
      profile.data.role === 'admin' ? navigate('/admin') : navigate('/myaccount');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (signupData.password !== signupData.confirmPassword) return setError("Passwords do not match");
    try {
      await registerUser({ 
        name: signupData.name, 
        email: signupData.email, 
        password: signupData.password 
      });
      alert("Registration successful! Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="bg-light-section dark:bg-dark-card py-4 border-b border-light-section dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>

      <section className="py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-accent-rose/10 border border-accent-rose text-accent-roseDark rounded text-center font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Sign In Form */}
            <div className="bg-light-card dark:bg-dark-card p-8 border border-light-section dark:border-dark-border shadow-sm rounded-sm">
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8 tracking-tight">Sign In</h2>
              <form className="space-y-6" onSubmit={handleLogin}>
                <input 
                  type="email" required placeholder="Email Address" 
                  className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light"
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />
                <div className="relative">
                  <input 
                    type={showLoginPass ? "text" : "password"} 
                    required placeholder="Enter your Password" 
                    className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light"
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-3 top-3.5 text-light-muted dark:text-dark-muted hover:text-gold-light"
                  >
                    {showLoginPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button type="submit" className="bg-gold-light hover:bg-gold-hover text-white px-10 py-3 font-bold uppercase text-sm transition-all w-full tracking-widest shadow-lg shadow-gold-light/20">
                  Login
                </button>
              </form>
            </div>

            {/* Signup Form */}
            <div className="bg-light-card dark:bg-dark-card p-8 border border-light-section dark:border-dark-border shadow-sm rounded-sm">
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8 tracking-tight">Create Account</h2>
              <form className="space-y-6" onSubmit={handleSignup}>
                <input 
                  type="text" required placeholder="Full Name" 
                  className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light"
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                />
                <input 
                  type="email" required placeholder="Enter your Email" 
                  className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light"
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      type={showRegisterPass ? "text" : "password"} 
                      required placeholder="Password" 
                      className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light"
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowRegisterPass(!showRegisterPass)}
                      className="absolute right-3 top-3.5 text-light-muted dark:text-dark-muted"
                    >
                      {showRegisterPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <input 
                    type="password" required placeholder="Repeat Password" 
                    className="w-full p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border text-light-body dark:text-dark-body focus:outline-gold-light"
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                  />
                </div>
                <button type="submit" className="bg-gold-light hover:bg-gold-hover text-white px-10 py-3 font-bold uppercase text-sm transition-all w-full tracking-widest shadow-lg shadow-gold-light/20">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AuthPage;