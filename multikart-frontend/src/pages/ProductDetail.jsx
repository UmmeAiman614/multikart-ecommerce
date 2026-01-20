import React from 'react';
import Breadcrumb from '../components/shared/Breadcrumb'; // Assuming your path
import ProductSummary from '../components/productDetail/ProductSummary'; // Assuming your path
import ProductTabs from '../components/productDetail/ProductTabs';
import RelatedProducts from '../components/productDetail/RelatedProducts';
const ProductDetailPage = () => {
  const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Product Detail" },
  ];
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Breadcrumb Section */}
      <div className="bg-light-section dark:bg-dark-card py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>

      {/* 1. Product Summary & Details Component */}
      <ProductSummary />

      {/* 2. Detailed Info Tabs Component */}
      <ProductTabs />

      {/* 3. Related Products Component */}
      <RelatedProducts />
    </main>
  );
};

export default ProductDetailPage;