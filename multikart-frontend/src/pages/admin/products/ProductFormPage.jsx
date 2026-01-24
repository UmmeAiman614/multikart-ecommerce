import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommonForm from '../../../components/adminPanel/common/CommonForm';
import { addProduct, getSingleProduct, updateProduct, getAllCategories } from '../../../api/api';
import { toast } from 'react-hot-toast';

const ProductFormPage = ({ isUpdate = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', price: '', metal: '', stock: '', 
    description: '', isFeatured: false, isOnSale: false, salePrice: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getAllCategories();
        setCategories(catRes.data);

        if (isUpdate && id) {
          const { data } = await getSingleProduct(id);
          
          setFormData({
            ...data,
            // FIXED: Dropdown needs ID string, not the populated object
            category: data.category?._id || data.category || '', 
            // FIXED: Metal will now select if it matches '18kgold', 'platinum', etc.
            metal: data.metal || '', 
            isFeatured: !!data.isFeatured,
            isOnSale: !!data.isOnSale,
            salePrice: data.salePrice || ''
          });
        }
      } catch (error) {
        toast.error("Failed to load product data");
      }
    };
    fetchData();
  }, [isUpdate, id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFile(files[0]);
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 1. Validation Logic ---
    if (!formData.name || !formData.price || !formData.category || !formData.metal) {
      return toast.error("Please fill all required fields: Name, Price, Category, and Metal.");
    }

    if (formData.isOnSale) {
      if (!formData.salePrice || Number(formData.salePrice) <= 0) {
        return toast.error("Please provide a valid Sale Price.");
      }
      if (Number(formData.salePrice) >= Number(formData.price)) {
        return toast.error("Sale price must be lower than the original price.");
      }
    }

    setLoading(true);

    const dataToSend = new FormData();
    // Safely append all fields to FormData
    Object.keys(formData).forEach(key => {
      let value = formData[key];
      // If category is still an object during submission, extract ID
      if (key === 'category' && typeof value === 'object') {
        value = value._id;
      }
      dataToSend.append(key, value);
    });
    
    if (file) dataToSend.append("image", file);

    try {
      if (isUpdate) {
        await updateProduct(id, dataToSend);
        toast.success("Jewelry item updated successfully!");
      } else {
        await addProduct(dataToSend);
        toast.success("New jewelry item published to vault!");
      }
      navigate('/admin/ecommerce/product-list');
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Product Name', type: 'text', placeholder: 'e.g. Diamond Solitaire', required: true },
    { name: 'sku', label: 'SKU', type: 'text', placeholder: 'JW-001' },
    { 
      name: 'category', 
      label: 'Category', 
      type: 'select', 
      options: categories.map(c => ({ label: c.catName, value: c._id })),
      required: true
    },
    { name: 'price', label: 'Price ($)', type: 'number', placeholder: '2500', required: true },
    { 
      name: 'metal', 
      label: 'Metal Type', 
      type: 'select', 
      options: [
        { label: '18k Gold', value: '18kgold' }, 
        { label: 'Platinum', value: 'platinum' },
        { label: 'Silver', value: 'silver' }
      ],
      required: true
    },
    { name: 'stock', label: 'Initial Stock', type: 'number' },
    { name: 'isFeatured', label: 'Featured Product', type: 'checkbox' },
    { name: 'isOnSale', label: 'On Sale', type: 'checkbox' },
    { name: 'salePrice', label: 'Sale Price ($)', type: 'number', placeholder: 'Discounted price' },
    { name: 'image', label: 'Product Image', type: 'file', fullWidth: true },
    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }
  ];

  return (
    <div className="p-6">
      <CommonForm 
        title={isUpdate ? "Update Jewelry Item" : "Add New Jewelry Item"}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText={loading ? "Processing..." : (isUpdate ? "Update Product" : "Publish Product")}
        imagePreview={isUpdate ? formData.image : null}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductFormPage;