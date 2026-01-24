import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/adminPanel/common/CommonTable';
import { getAllCategories, deleteCategory } from '../../../api/api';
import { toast } from 'react-hot-toast';

const CategoryListPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Categories from Database
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await getAllCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        toast.success("Category deleted successfully");
        // Refresh the list after deletion
        fetchCategories();
      } catch (error) {
        toast.error(error.response?.data?.message || "Delete failed");
      }
    }
  };

  const columns = [
    { 
      header: 'Thumbnail', 
      render: (row) => (
        <div className="h-10 w-10 rounded-lg overflow-hidden border border-gold-light/20 bg-light-section">
          {row.image ? (
            <img src={row.image} alt={row.catName} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-[10px] text-gold-light">No Img</div>
          )}
        </div>
      )
    },
    { header: 'Category Name', key: 'catName' },
    { header: 'Slug', render: (row) => <code className="text-xs text-light-muted">/{row.slug}</code> },
    { header: 'Order', key: 'displayOrder' },
    { 
      header: 'Created At', 
      render: (row) => <span className="text-xs">{new Date(row.createdAt).toLocaleDateString()}</span> 
    }
  ];

  return (
    <div className="p-6">
      <CommonTable 
        title="Product Categories"
        addLink="/admin/categories/add-category"
        addText="New Category"
        columns={columns}
        data={categories}
        loading={loading}
        // MongoDB uses _id, so we pass row._id to the functions
        onEdit={(item) => navigate(`/admin/categories/update-category/${item._id}`)}
        onDelete={(item) => handleDelete(item._id)}
      />
    </div>
  );
};

export default CategoryListPage;