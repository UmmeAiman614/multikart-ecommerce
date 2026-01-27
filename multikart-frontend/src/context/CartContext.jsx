import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext'; // AuthContext import karein

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Current user ki info lein

  // 1. Cart state ko user-specific banayein
  const [cartItems, setCartItems] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(0);

  // 2. Jab bhi User badle (Login/Logout), cart ko handle karein
  useEffect(() => {
    if (user) {
      // Agar user login hai, toh uske naam ki storage check karein
      const savedCart = localStorage.getItem(`cart_${user._id}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      
      const savedDiscount = localStorage.getItem(`discount_${user._id}`);
      setDiscountPercent(Number(savedDiscount) || 0);
    } else {
      // Agar user logout ho gaya, toh context ko foran khali kar dein
      setCartItems([]);
      setDiscountPercent(0);
    }
  }, [user]); // 👈 Yeh sabse important line hai

  // 3. Save to LocalStorage ONLY for specific user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(cartItems));
      localStorage.setItem(`discount_${user._id}`, discountPercent);
    }
  }, [cartItems, discountPercent, user]);

  const updateQuantity = (productId, newQty) => {
    setCartItems(prev => prev.map(item => 
      (item.product?._id === productId || item._id === productId) 
      ? { ...item, quantity: Math.max(1, newQty) } 
      : item
    ));
  };

  const addToCart = (product, quantity = 1) => {
    if (!user) return; // Prevent adding if not logged in
    
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item.product?._id === product._id);
      if (isExist) {
        return prevItems.map((item) =>
          item.product?._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { 
        product, 
        quantity, 
        price: product.isOnSale ? product.salePrice : product.price,
        userId: user._id // User ID attach kar rahe hain safety ke liye
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter((item) => (item.product?._id !== id && item._id !== id)));
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountPercent(0);
    if (user) {
      localStorage.removeItem(`cart_${user._id}`);
      localStorage.removeItem(`discount_${user._id}`);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, 
      clearCart, subtotal, discountPercent, setDiscountPercent 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);