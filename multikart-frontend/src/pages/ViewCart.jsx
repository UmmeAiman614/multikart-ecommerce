import React, { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/shared/Breadcrumb";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Diamond Pendant",
      price: 299,
      image: "/images/4.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Gold Ring",
      price: 199,
      image: "/images/10.jpg",
      quantity: 2,
    },
    {
      id: 3,
      name: "Pearl Earrings",
      price: 249,
      image: "/images/16.jpg",
      quantity: 1,
    },
  ]);

  const [coupon, setCoupon] = useState("");

  const increment = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <Breadcrumb
          paths={[{ name: "Home", href: "/" }, { name: "View Cart" }]}
        />

        <h2 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">
          My Cart
        </h2>

        {/* Cart Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-card rounded-xl shadow-md">
            <thead>
              <tr className="text-left">
                {["Image", "Name", "Price", "Quantity", "Total", "Delete"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-light-text dark:text-dark-text"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-t border-light-section dark:border-dark-card">
                  <td className="px-4 py-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3 text-light-text dark:text-dark-text">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-light-body dark:text-dark-body">
                    ${item.price}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <button
                      onClick={() => decrement(item.id)}
                      className="p-1 bg-light-section dark:bg-dark-card border border-light-section dark:border-dark-card rounded-full hover:bg-gold-light dark:hover:bg-gold-dark transition"
                    >
                      <FaMinus className="text-sm" />
                    </button>
                    <span className="px-2 text-light-text dark:text-dark-text font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increment(item.id)}
                      className="p-1 bg-light-section dark:bg-dark-card border border-light-section dark:border-dark-card rounded-full hover:bg-gold-light dark:hover:bg-gold-dark transition"
                    >
                      <FaPlus className="text-sm" />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-light-body dark:text-dark-body font-semibold">
                    ${item.price * item.quantity}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Coupon Input - left aligned */}
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-light-section dark:border-dark-card bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text focus:ring-2 focus:ring-gold-light outline-none transition"
          />
          <button className="px-6 py-2 bg-gold-light dark:bg-gold-dark text-white rounded-lg hover:bg-gold-hover dark:hover:bg-gold-light transition">
            Apply Coupon
          </button>
        </div>

        {/* Order Summary - Attractive card */}
        <div className="max-w-md mx-auto bg-light-section dark:bg-dark-card rounded-2xl shadow-lg border border-light-section dark:border-dark-card p-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-light-text dark:text-dark-text">
            Order Summary
          </h3>
          <div className="flex justify-between mb-2 text-light-body dark:text-dark-body">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-2 text-light-body dark:text-dark-body">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className="flex justify-between mb-4 font-bold text-light-text dark:text-dark-text text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <Link to="/checkout" className="w-full py-3 bg-gold-light dark:bg-gold-dark text-white rounded-lg hover:bg-gold-hover dark:hover:bg-gold-light font-semibold transition shadow-md text-center block">
  Proceed to Checkout
</Link>
        </div>

      </div>
    </div>
  );
};

export default ViewCart;
