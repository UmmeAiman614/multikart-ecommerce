import React, { useEffect, useState } from 'react';
import CommonTable from '../../components/adminPanel/common/CommonTable';
import { getAllReviewsAdmin, updateReviewStatus, deleteReview } from '../../api/api'; 
import { toast } from 'react-hot-toast';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await getAllReviewsAdmin();
      // Console check taake confirm ho data aa raha hai
      console.log("Fetched Reviews:", data); 
      setReviews(data || []);
    } catch (error) {
      toast.error("Failed to fetch reviews");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleStatusUpdate = async (id, currentStatus) => {
    try {
      await updateReviewStatus(id, { isApproved: !currentStatus });
      toast.success("Status updated!");
      fetchReviews(); 
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Delete review by ${item.name}?`)) {
      try {
        await deleteReview(item._id);
        toast.success("Review deleted");
        fetchReviews();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  // CommonTable ke mutabiq columns ka structure
  const columns = [
    { 
      header: 'Product', 
      render: (row) => <span className="font-medium text-gold-dark">{row.product?.name || 'Deleted Product'}</span> 
    },
    { 
      header: 'User Info', 
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold">{row.name}</span>
          <span className="text-[10px] text-light-muted italic">{row.email}</span>
        </div>
      ) 
    },
    { 
      header: 'Rating', 
      render: (row) => <div className="text-yellow-500">{'★'.repeat(row.rating)}{'☆'.repeat(5-row.rating)}</div> 
    },
    { 
      header: 'Comment', 
      render: (row) => <p className="max-w-xs truncate text-xs" title={row.comment}>{row.comment}</p> 
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${row.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {row.isApproved ? 'APPROVED' : 'PENDING'}
        </span>
      )
    },
    {
      header: 'Approval Action',
      render: (row) => (
        <button 
          onClick={() => handleStatusUpdate(row._id, row.isApproved)}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            row.isApproved 
              ? 'bg-red-50 text-red-600 hover:bg-red-100' 
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
        >
          {row.isApproved ? 'Unapprove' : 'Approve'}
        </button>
      )
    }
  ];

  return (
    <div className="p-6 bg-light-bg dark:bg-dark-bg min-h-screen">
      <CommonTable 
        title="Product Reviews" 
        columns={columns} 
        data={reviews} 
        loading={loading}
        onDelete={handleDelete}
        onEdit={null} // Edit hide karne ke liye
        addLink="#" 
        addText="Review List"
      />
    </div>
  );
};

export default ReviewsManagement;