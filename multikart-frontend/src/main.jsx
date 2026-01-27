import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext' 
import { WishlistProvider } from './context/WishlistContext' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider> {/* 👈 CartProvider ko yahan wrap karein */}
        <WishlistProvider> {/* 👈 WishlistProvider ko yahan wrap karein */}
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)