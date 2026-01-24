import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/shared/Breadcrumb';
import ProductSummary from '../components/productDetail/ProductSummary';
import ProductTabs from '../components/productDetail/ProductTabs';
import RelatedProducts from '../components/productDetail/RelatedProducts';
import { getSingleProduct } from '../api/api';
import { toast } from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await getSingleProduct(id);
        setProduct(res.data);
      } catch (error) {
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  const breadcrumbPaths = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: (product?.name) || "Product Detail" },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-dark-bg text-gold-light">Opening the Vault...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center dark:bg-dark-bg dark:text-white">Product not found.</div>;

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="bg-light-section dark:bg-dark-card py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <Breadcrumb paths={breadcrumbPaths} />
        </div>
      </div>

      {/* 1. Pass 'product' as a prop */}
      <ProductSummary product={product} />

      {/* 2. Pass 'product' as a prop */}
      <ProductTabs product={product} />

      {/* 3. Pass Category ID and Product ID for filtering */}
      <RelatedProducts 
        currentCategoryId={product.category?._id || product.category} 
        currentProductId={product._id} 
      />
    </main>
  );
};

export default ProductDetailPage;