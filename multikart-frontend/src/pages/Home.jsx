import HeroSection from "../components/home/HeroSection";
import FeaturedCollections from "../components/home/FeaturedCollections.jsx";
import CategorySlider from "../components/home/CategorySlider.jsx";
import CategoryShowcase from "../components/home/CategoryShowcase.jsx";
import FeaturedProductsSlider from "../components/home/FeaturedProductsSlider.jsx";
import React from "react";
import TestimonialsSlider from "../components/home/TestimonialsSlider.jsx";
import LatestBlogs from "../components/home/LatestBlogs.jsx";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedCollections />
      <CategorySlider />
      <CategoryShowcase />
      <FeaturedProductsSlider />
      <TestimonialsSlider />
      <LatestBlogs />
    </div>
  );
};

export default Home;