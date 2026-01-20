import React from "react";
import Breadcrumb from "../components/shared/Breadcrumb";
import { FaTrash, FaShoppingCart } from "react-icons/fa";

const Wishlist = () => {
  // Example wishlist data
  const wishlist = [
    {
      id: 1,
      name: "Diamond Pendant",
      price: 299,
      image: "/images/4.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Gold Ring",
      price: 199,
      image: "/images/10.jpg",
      inStock: false,
    },
    {
      id: 3,
      name: "Pearl Earrings",
      price: 249,
      image: "/images/16.jpg",
      inStock: true,
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <Breadcrumb
          paths={[{ name: "Home", href: "/" }, { name: "Wishlist" }]}
        />

        <h2 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">
          My Wishlist
        </h2>

        {/* Wishlist Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-light-card dark:bg-[#2A2A2A] border border-light-section dark:border-dark-border rounded-xl shadow-md">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3 text-light-text dark:text-dark-text">Image</th>
                <th className="px-4 py-3 text-light-text dark:text-dark-text">Description</th>
                <th className="px-4 py-3 text-light-text dark:text-dark-text">Price</th>
                <th className="px-4 py-3 text-light-text dark:text-dark-text">Stock</th>
                <th className="px-4 py-3 text-light-text dark:text-dark-text">Add to Cart</th>
                <th className="px-4 py-3 text-light-text dark:text-dark-text">Delete</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((item) => (
                <tr key={item.id} className="border-t border-light-section dark:border-dark-border">
                  <td className="px-4 py-3">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  </td>
                  <td className="px-4 py-3 text-light-text dark:text-dark-text">{item.name}</td>
                  <td className="px-4 py-3 text-light-body dark:text-dark-body">${item.price}</td>
                  <td className="px-4 py-3 text-light-body dark:text-dark-body">
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </td>
                  <td className="px-4 py-3">
                    {item.inStock && (
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-gold-light dark:bg-gold-dark text-white rounded-full hover:bg-gold-hover dark:hover:bg-gold-light transition">
                        <FaShoppingCart /> Add to Cart
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-red-500 hover:text-red-700 transition">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Wishlist;
