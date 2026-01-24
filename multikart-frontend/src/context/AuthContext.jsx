import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        // Also check if we have a saved user in localStorage for faster loading
        const savedUser = localStorage.getItem("user");
        
        if (token) {
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
          
          const { data } = await getProfile();
          // Sync with latest data from server
          const userData = data.user || data;
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  /**
   * updateUser handles the response from the profile update API.
   * Since your backend returns { message: "...", user: { image: "..." } },
   * this function extracts the user object and updates both state and storage.
   */
  const updateUser = (userData) => {
    // Extract user from nested response if necessary
    const newUser = userData.user || userData;
    
    // 1. Update React State (This triggers UI change in Topbar/Sidebar)
    setUser(newUser);
    
    // 2. Update LocalStorage (This ensures it stays updated after refresh)
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};