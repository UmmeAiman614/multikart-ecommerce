import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import "./App.css";
import "./index.css";

// Storefront Components
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import ViewCart from "./pages/ViewCart";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetail";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import MyAccountPage from "./pages/MyAccount";
import AuthPage from "./pages/AuthPage";
import PromoBanner from "./components/home/PromoBanner";

// Admin Components
import AdminLayout from "./components/adminPanel/common/AdminLayout"; // Create this to wrap admin routes
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/shared/ProtectedRoute";
// Form Pages
import ProductFormPage from "./pages/admin/products/ProductFormPage";
import CategoryFormPage from "./pages/admin/categories/CategoryFormPage";
import UserFormPage from "./pages/admin/users/UserFormPage";
import UserListPage from "./pages/admin/users/UserListPage";
import CategoryListPage from "./pages/admin/categories/CategoryListPage";
import ProductListPage from "./pages/admin/products/ProductListPage";
import TestimonialListPage from "./pages/admin/TestimonialListPage";
import OrdersListPage from "./pages/admin/OrdersListPage";
import ReviewsManagement from "./pages/admin/ReviewsPage";
import CouponManagement from "./pages/admin/CouponManagement";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ||
    (!localStorage.getItem("darkMode") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        {/* --- ADMIN ROUTES (No Store Navbar/Footer) --- */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
            <AdminLayout darkMode={darkMode} setDarkMode={setDarkMode}>
              <Routes>
                {/* Main Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Ecommerce / Products */}
                <Route path="ecommerce/product-list" element={<ProductListPage />} />
                <Route path="ecommerce/add-product" element={<ProductFormPage />} />
                <Route path="ecommerce/update-product/:id" element={<ProductFormPage isUpdate={true} />} />

                {/* Categories */}
                <Route path="categories/list" element={<CategoryListPage />} />
                <Route path="categories/add-category" element={<CategoryFormPage />} />
                <Route path="categories/update-category/:id" element={<CategoryFormPage isUpdate={true} />} />

                {/* Orders */}
                <Route path="orders/pending" element={<OrdersListPage type="Pending" />} />
                <Route path="orders/shipped" element={<OrdersListPage type="shipped" />} />
                <Route path="orders/completed" element={<OrdersListPage type="Completed" />} />

                {/* Users */}
                <Route path="users/list" element={<UserListPage />} />
                <Route path="users/add-user" element={<UserFormPage />} />
                <Route path="users/update-user/:id" element={<UserFormPage isUpdate={true} />} />

                {/* Testimonials */}
                <Route path="testimonials" element={<TestimonialListPage />} />
                <Route path="reviews" element={<ReviewsManagement />} />
                <Route path="coupons" element={<CouponManagement />} />
              </Routes>

            </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* --- STOREFRONT ROUTES (With Navbar/Footer) --- */}
        <Route
          path="*"
          element={
            <div className="min-h-screen w-full flex flex-col bg-light-bg dark:bg-dark-bg text-light-body dark:text-dark-body transition-colors duration-300">
              <Toaster />
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
              <PromoBanner />
              <main className="flex-grow w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/viewcart" element={<ViewCart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/myaccount" element={<MyAccountPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;