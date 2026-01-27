import React, { useContext, useRef, useState } from 'react';
import { Search, Bell, Moon, Sun, Menu, Camera, Loader2, X } from 'lucide-react'; // X icon for clearing search
import { AuthContext } from '../../../context/AuthContext';
import { updateProfile } from '../../../api/api';
import { useNavigate } from 'react-router-dom'; // Navigation ke liye

const Topbar = ({ toggleSidebar, darkMode, setDarkMode }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // --- SEARCH LOGIC ---
  const handleSearch = (e) => {
  e.preventDefault();
  console.log("🔍 Topbar: Searching for ->", searchQuery); // LOG 1
  if (searchQuery.trim()) {
    const targetUrl = `/admin/ecommerce/product-list?search=${encodeURIComponent(searchQuery.trim())}`;
    console.log("🚀 Topbar: Navigating to ->", targetUrl); // LOG 2
    navigate(targetUrl);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Please choose an image under 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setIsUploading(true);
      const { data } = await updateProfile(formData);
      updateUser(data); 
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const avatarUrl = user?.image 
    ? user.image 
    : `https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=D4AF37&color=fff`;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-light-section bg-white/80 backdrop-blur-md px-4 dark:border-dark-border dark:bg-dark-card/80">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-light-body dark:text-dark-body hover:bg-gold-light/10 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        
        {/* FUNCTIONAL SEARCH BAR */}
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-light/60 hover:text-gold-light transition-colors">
            <Search size={18} />
          </button>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search products, orders..." 
            className="h-10 w-64 rounded-xl bg-light-bg border border-transparent focus:border-gold-light/30 pl-10 pr-10 text-sm outline-none transition-all dark:bg-dark-bg dark:text-dark-text" 
          />
          {searchQuery && (
            <button 
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-light-muted hover:text-red-500"
            >
              <X size={14} />
            </button>
          )}
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 text-light-body hover:bg-light-bg dark:text-dark-body dark:hover:bg-dark-bg rounded-xl transition-all group">
          {darkMode ? <Sun size={20} className="text-gold-light" /> : <Moon size={20} />}
        </button>

        <div className="flex items-center gap-3 border-l border-light-section pl-3 md:pl-5 dark:border-dark-border ml-1">
          <div className="hidden md:flex flex-col items-end text-right">
            <p className="text-sm font-bold text-light-text dark:text-dark-text leading-none">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-gold-light font-bold uppercase tracking-widest mt-1">Master Manager</p>
          </div>
          
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
            <div className={`h-10 w-10 rounded-xl overflow-hidden border-2 transition-all shadow-md ${isUploading ? 'border-gold-light animate-pulse' : 'border-gold-light/20 group-hover:border-gold-light'}`}>
              {isUploading ? (
                <div className="flex items-center justify-center h-full w-full bg-black/10"><Loader2 className="animate-spin text-gold-light" size={18} /></div>
              ) : (
                <img 
                  src={avatarUrl} 
                  alt="DP" 
                  className="h-full w-full object-cover"
                  key={user?.image}
                />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="text-white" size={16} /></div>
            </div>
            {!isUploading && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-dark-card"></span>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;