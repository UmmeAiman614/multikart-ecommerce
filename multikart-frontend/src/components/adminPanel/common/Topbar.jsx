import React, { useContext, useRef, useState } from 'react';
import { Search, Bell, Moon, Sun, Menu, Camera, Loader2 } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import { updateProfile } from '../../../api/api';

const Topbar = ({ toggleSidebar, darkMode, setDarkMode }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

 const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Basic validation
  if (file.size > 2 * 1024 * 1024) {
    alert("File is too large. Please choose an image under 2MB.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    setIsUploading(true);
    const { data } = await updateProfile(formData);
    
    // Check your console to see the data structure
    console.log("Response from server:", data);

    // FIX: Use updateUser (which you got from useContext) 
    // instead of setUser (which caused the ReferenceError)
    updateUser(data); 
    
    alert("Profile image updated successfully!");
  } catch (error) {
    console.error("Upload error:", error);
    alert(error.response?.data?.message || "Failed to upload image");
  } finally {
    setIsUploading(false);
  }
};

  // Check if image exists and is a valid URL
  // If backend returns a partial path (e.g. "/uploads/img.jpg"), you must prepend your backend URL
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
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-light/60" size={18} />
          <input type="text" placeholder="Search..." className="h-10 w-64 rounded-xl bg-light-bg border border-transparent focus:border-gold-light/30 pl-10 pr-4 text-sm outline-none transition-all dark:bg-dark-bg dark:text-dark-text" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-4">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 text-light-body hover:bg-light-bg dark:text-dark-body dark:hover:bg-dark-bg rounded-xl transition-all group">
          {darkMode ? <Sun size={20} className="text-gold-light" /> : <Moon size={20} />}
        </button>

        <div className="flex items-center gap-3 border-l border-light-section pl-3 md:pl-5 dark:border-dark-border ml-1">
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm font-bold text-light-text dark:text-dark-text leading-none">{user?.name || 'Admin'}</p>
            <p className="text-[10px] text-gold-light font-bold uppercase tracking-widest mt-1">Master Manager</p>
          </div>
          
          <div className="relative group cursor-pointer" onClick={handleImageClick}>
            <div className={`h-10 w-10 rounded-xl overflow-hidden border-2 transition-all shadow-md ${isUploading ? 'border-gold-light animate-pulse' : 'border-gold-light/20 group-hover:border-gold-light'}`}>
              {isUploading ? (
                <div className="flex items-center justify-center h-full w-full bg-black/10"><Loader2 className="animate-spin text-gold-light" size={18} /></div>
              ) : (
                <img 
                  src={avatarUrl} 
                  alt="DP" 
                  className="h-full w-full object-cover"
                  key={user?.image} // This forces the image to re-render when the URL changes
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