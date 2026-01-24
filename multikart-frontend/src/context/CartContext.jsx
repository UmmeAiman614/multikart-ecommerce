import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Discount ko bhi localStorage mein rakhenge taake refresh par na jaye
  const [discountPercent, setDiscountPercent] = useState(() => {
    return Number(localStorage.getItem('discount')) || 0;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('discount', discountPercent);
  }, [cartItems, discountPercent]);

  // Quantity Update Function
  const updateQuantity = (productId, newQty) => {
    setCartItems(prev => prev.map(item => 
      item.product?._id === productId ? { ...item, quantity: newQty } : item
    ));
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item.product?._id === product._id);
      if (isExist) {
        return prevItems.map((item) =>
          item.product?._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { product, quantity, price: product.isOnSale ? product.salePrice : product.price }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.product?._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountPercent(0);
    localStorage.removeItem('cart');
    localStorage.removeItem('discount');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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