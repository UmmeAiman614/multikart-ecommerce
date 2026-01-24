import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminLayout = ({ children, darkMode, setDarkMode }) => {
  // Logic to control the mobile sidebar drawer
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* 1. Sidebar: Fixed on large screens, Drawer on mobile */}
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* 2. Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
        {/* 3. Topbar: Contains Search, Theme Toggle, and User Profile */}
        <Topbar 
          toggleSidebar={toggleSidebar} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />

        {/* 4. Page Content: This is where your individual admin pages will render */}
        <main className="p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-screen-2xl">
            {children}
          </div>
        </main>

        {/* Overlay for mobile sidebar when open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};

export default AdminLayout;