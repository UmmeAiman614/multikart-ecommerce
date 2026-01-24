import HeroSection from "../components/home/HeroSection";
import { useEffect, useState } from "react";
// import FeaturedCollections from "../components/home/FeaturedCollections.jsx";
import CategorySlider from "../components/home/CategorySlider.jsx";
import CategoryShowcase from "../components/home/CategoryShowcase.jsx";
import FeaturedProductsSlider from "../components/home/FeaturedProductsSlider.jsx";
import React from "react";
import TestimonialsSlider from "../components/home/TestimonialsSlider.jsx";
import LatestBlogs from "../components/home/LatestBlogs.jsx";
import PromoBanner from "../components/home/PromoBanner.jsx";
import WelcomeModal from "../components/shared/WelcomeModal.jsx";
import API from "../api/api";

const Home = () => {

  const [latestCoupon, setLatestCoupon] = useState(null);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const res = await API.get("/coupons/latest"); // Aapka latest coupon endpoint
        setLatestCoupon(res.data);
      } catch (err) {
        console.log("No active coupons found");
      }
    };
    fetchCoupon();
  }, []);
  return (
    <div>
      <WelcomeModal coupon={latestCoupon} />
      <HeroSection />
      {/* <FeaturedCollections /> */}
      <CategorySlider />
      <CategoryShowcase />
      <FeaturedProductsSlider />
      <TestimonialsSlider />
      <LatestBlogs />
      {/* <PromoBanner /> */}
    </div>
  );
};

export default Home;