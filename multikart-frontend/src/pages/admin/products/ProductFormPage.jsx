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
    description: '', isFeatured: false, isOnSale: false, salePrice: '',
    images: [] 
  });
  
  const [files, setFiles] = useState([]); 
  const [deletedImages, setDeletedImages] = useState([]); // ✅ Purani images jo delete karni hain
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
            category: data.category?._id || data.category || '', 
            metal: data.metal || '', 
            isFeatured: !!data.isFeatured,
            isOnSale: !!data.isOnSale,
            salePrice: data.salePrice || '',
            images: data.images || []
          });
        }
      } catch (error) {
        toast.error("Failed to load product data");
      }
    };
    fetchData();
  }, [isUpdate, id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files: selectedFiles } = e.target;
    if (type === 'file') {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Nayi selected file remove karna
  const handleRemoveNewFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Purani database wali image remove karna (Sirf UI se hide hogi aur deletedImages mein jayegi)
  const handleRemoveExistingImage = (imgUrl) => {
    setDeletedImages((prev) => [...prev, imgUrl]);
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imgUrl)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dataToSend = new FormData();

    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        let value = formData[key];
        if (key === 'category' && typeof value === 'object') value = value._id;
        dataToSend.append(key, value);
      }
    });
    
    // Nayi images append karein
    if (files.length > 0) {
      files.forEach((f) => dataToSend.append("images", f));
    }

    // ✅ Backend ko batayein kaunsi purani images delete karni hain
    if (deletedImages.length > 0) {
      dataToSend.append("deletedImages", JSON.stringify(deletedImages));
    }

    try {
      if (isUpdate) {
        await updateProduct(id, dataToSend);
        toast.success("Product updated!");
      } else {
        await addProduct(dataToSend);
        toast.success("Product added!");
      }
      navigate('/admin/ecommerce/product-list');
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', label: 'Product Name', type: 'text', required: true },
    { name: 'sku', label: 'SKU', type: 'text' },
    { 
        name: 'category', label: 'Category', type: 'select', 
        options: categories.map(c => ({ label: c.catName, value: c._id })), required: true
    },
    { name: 'price', label: 'Price ($)', type: 'number', required: true },
    { 
        name: 'metal', label: 'Metal Type', type: 'select', 
        options: [{ label: 'Gold', value: 'gold' }, { label: 'Platinum', value: 'platinum' }, { label: 'Silver', value: 'silver' }, { label: 'Diamond', value: 'diamond' }], required: true
    },
    { name: 'isFeatured', label: 'Featured', type: 'checkbox' },
    { name: 'isOnSale', label: 'On Sale', type: 'checkbox' },
    { name: 'salePrice', label: 'Sale Price', type: 'number' },
    { name: 'images', label: 'Add New Images', type: 'file', fullWidth: true, multiple: true },
    { name: 'description', label: 'Description', type: 'textarea', fullWidth: true }
  ];

  return (
    <div className="p-6">
      <CommonForm 
        title={isUpdate ? "Update Jewelry Item" : "Add New Jewelry Item"}
        fields={fields} formData={formData} onChange={handleChange} onSubmit={handleSubmit}
        buttonText={loading ? "Processing..." : (isUpdate ? "Update Product" : "Publish")}
        isLoading={loading}
      />

      <div className="mt-8 space-y-6">
        {/* 1. EXISTING IMAGES WITH REMOVE BUTTON */}
        {isUpdate && formData.images.length > 0 && (
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-dark-bg">
            <p className="text-sm font-bold text-gold-dark mb-3 uppercase tracking-wider">Current Gallery:</p>
            <div className="flex flex-wrap gap-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <img src={img} className="w-full h-full object-cover rounded-md border" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(img)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg hover:scale-110 transition-transform"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. NEWLY SELECTED IMAGES */}
        {files.length > 0 && (
          <div className="p-4 border border-dashed border-gold-light/50 rounded-lg bg-gold-light/5">
            <p className="text-sm font-bold text-gold-light mb-3 uppercase">Newly Selected:</p>
            <div className="flex flex-wrap gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <img src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded-md border-2 border-white" />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFormPage;