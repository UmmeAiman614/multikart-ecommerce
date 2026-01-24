import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommonForm from '../../../components/adminPanel/common/CommonForm';
import { addCategory, getCategoryById, updateCategory } from '../../../api/api';
import { toast } from 'react-hot-toast';

const CategoryFormPage = ({ isUpdate = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    catName: '',
    slug: '',
    displayOrder: 0
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper function to create a URL-friendly slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')     // Remove special characters
      .replace(/[\s_-]+/g, '-')     // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
  };

  useEffect(() => {
    if (isUpdate && id) {
      const fetchCategory = async () => {
        try {
          const { data } = await getCategoryById(id);
          setFormData(data);
        } catch (error) {
          toast.error("Failed to load category");
        }
      };
      fetchCategory();
    }
  }, [isUpdate, id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFile(files[0]);
    } else {
      setFormData((prev) => {
        const newData = { ...prev, [name]: value };
        
        // CONDITION: If user is typing in catName, automatically update slug
        if (name === 'catName') {
          newData.slug = generateSlug(value);
        }
        
        return newData;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();
    dataToSend.append("catName", formData.catName);
    dataToSend.append("slug", formData.slug);
    dataToSend.append("displayOrder", formData.displayOrder);
    if (file) dataToSend.append("image", file);

    try {
      if (isUpdate) {
        await updateCategory(id, dataToSend);
        toast.success("Category updated!");
      } else {
        await addCategory(dataToSend);
        toast.success("Category created successfully!");
      }
      navigate('/admin/categories/list');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'catName', label: 'Category Name', type: 'text', placeholder: 'e.g. Luxury Watches', fullWidth: true },
    { 
      name: 'slug', 
      label: 'URL Slug (Auto-generated)', 
      type: 'text', 
      placeholder: 'luxury-watches',
      disabled: false // Keep it false if you want to manually edit, or true to lock it
    },
    { name: 'displayOrder', label: 'Display Order', type: 'number' },
    { name: 'image', label: 'Thumbnail', type: 'file', fullWidth: true }
  ];

  return (
    <div className="p-6">
      <CommonForm 
        title={isUpdate ? "Edit Category" : "Create New Category"}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText={loading ? "Saving..." : "Save Category"}
        imagePreview={isUpdate ? formData.image : null}
      />
    </div>
  );
};

export default CategoryFormPage;