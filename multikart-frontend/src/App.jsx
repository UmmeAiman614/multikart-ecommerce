import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
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
function App() {
  useEffect(() => {
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col bg-light-bg dark:bg-dark-bg text-light-body dark:text-dark-body transition-colors duration-300">
        <Navbar />

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
    </Router>
  );
}

export default App;
