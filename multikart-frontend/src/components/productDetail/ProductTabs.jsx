import React, { useState, useEffect, useContext } from 'react';
import { getProductReviews, createReview, deleteReview } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaStar, FaTrashAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Success state
  const { user } = useContext(AuthContext);

  // 1. Fetch Approved Reviews
  const fetchReviews = async () => {
    try {
      const res = await getProductReviews(product._id);
      setReviews(res.data);
    } catch (error) {
      console.error("Error loading reviews", error);
    }
  };

  useEffect(() => {
    if (product?._id) fetchReviews();
  }, [product._id]);

  // 2. Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        product: product._id,
        name: user ? user.name : name,
        email: user ? user.email : email,
        rating,
        comment
      };
      await createReview(reviewData);
      
      // Success Handling
      setIsSubmitted(true);
      toast.success("Review submitted! Admin will approve it shortly.");
      
      // Clear form
      setComment('');
      setRating(5);
      setName('');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  // 3. Delete Own Review
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete your review?")) {
      try {
        await deleteReview(reviewId);
        toast.success("Review deleted");
        fetchReviews();
      } catch (error) {
        toast.error("You can only delete your own reviews");
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="animate-fadeIn max-w-4xl">
            <p className="leading-relaxed text-light-body dark:text-dark-body whitespace-pre-line text-sm sm:text-base">
              {product.description || "This exquisite piece is crafted with precision and care, representing the pinnacle of luxury jewelry design."}
            </p>
          </div>
        );

      case 'information':
        return (
          <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {[
              { label: 'Metal Type', value: product.metal || 'Not Specified' },
              { label: 'Category', value: product.category?.catName || 'Jewelry' },
              { label: 'SKU', value: product.sku || 'N/A' },
              { label: 'Stock Status', value: product.stock > 0 ? `${product.stock} units available` : 'Out of Stock' },
            ].map((info, idx) => (
              <div key={idx} className="flex justify-between border-b border-light-section dark:border-dark-border pb-3 px-2">
                <span className="font-bold text-[10px] sm:text-xs text-light-text dark:text-dark-text uppercase tracking-widest">{info.label}:</span>
                <span className="text-xs sm:text-sm text-gold-light capitalize font-medium">{info.value}</span>
              </div>
            ))}
          </div>
        );

      case 'reviews':
        return (
          <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Reviews List */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-light-text dark:text-dark-text border-l-4 border-gold-light pl-4 uppercase tracking-wider">
                Customer Reviews ({reviews.length})
              </h4>
              
              {reviews.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-light-section dark:border-dark-border rounded-xl text-center">
                  <p className="text-light-muted dark:text-dark-muted italic text-sm">No reviews yet. Share your thoughts first!</p>
                </div>
              ) : (
                <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev._id} className="flex gap-4 p-5 bg-light-card dark:bg-dark-card border border-light-section dark:border-dark-border rounded-xl relative group shadow-sm">
                      <div className="w-10 h-10 bg-gold-light/10 rounded-full flex-shrink-0 flex items-center justify-center text-gold-light font-bold text-lg">
                        {rev.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex text-gold-light text-[10px] mb-1 gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < rev.rating ? "text-gold-light" : "text-gray-300"} />
                          ))}
                        </div>
                        <p className="font-bold text-sm text-light-text dark:text-dark-text flex items-center gap-2">
                          {rev.name} 
                          <span className="font-normal text-[10px] text-light-muted dark:text-dark-muted italic">
                            — {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </p>
                        <p className="text-sm mt-2 text-light-body dark:text-dark-body leading-relaxed">
                          {rev.comment}
                        </p>
                      </div>
                      
                      {/* Delete button (Visible on Hover) */}
                      {(user?.email === rev.email || user?.role === 'admin') && (
                        <button 
                          onClick={() => handleDeleteReview(rev._id)}
                          className="absolute top-4 right-4 text-light-muted hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                          title="Delete Review"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Review Form / Success Section */}
            <div className="bg-light-card dark:bg-dark-card p-6 sm:p-8 border border-light-section dark:border-dark-border rounded-2xl h-fit shadow-xl shadow-black/5">
              {!isSubmitted ? (
                <>
                  <h4 className="text-lg font-bold mb-6 text-light-text dark:text-dark-text uppercase tracking-widest">Leave a Review</h4>
                  <form onSubmit={handleSubmitReview} className="space-y-5">
                    {/* Rating Selection */}
                    <div className="flex items-center gap-3 text-sm text-light-body dark:text-dark-body bg-light-bg dark:bg-dark-bg p-3 rounded-lg border border-light-section dark:border-dark-border">
                       <span className="font-medium">Your Rating:</span>
                       <div className="flex gap-1.5">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <FaStar 
                             key={star}
                             className={`cursor-pointer text-lg transition-all transform hover:scale-120 ${rating >= star ? 'text-gold-light' : 'text-gray-300'}`}
                             onClick={() => setRating(star)}
                           />
                         ))}
                       </div>
                    </div>

                    <textarea 
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with this exquisite piece..." 
                      className="w-full p-4 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-xl focus:ring-2 focus:ring-gold-light/20 focus:border-gold-light outline-none text-sm transition-all min-h-[120px]"
                    />

                    {!user && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input required type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-xl focus:border-gold-light outline-none text-sm" />
                        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 bg-light-bg dark:bg-dark-bg border border-light-section dark:border-dark-border rounded-xl focus:border-gold-light outline-none text-sm" />
                      </div>
                    )}

                    <button type="submit" className="w-full bg-gold-light hover:bg-gold-hover text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-lg shadow-gold-light/20 active:scale-95">
                      Submit Review
                    </button>
                  </form>
                </>
              ) : (
                /* Success Message UI */
                <div className="py-12 text-center animate-fadeIn">
                  <div className="w-20 h-20 bg-gold-light/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-gold-light text-5xl" />
                  </div>
                  <h4 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3">Successfully Sent!</h4>
                  <div className="flex items-center justify-center gap-2 text-gold-dark mb-4 bg-gold-light/5 py-2 px-4 rounded-full w-fit mx-auto">
                    <FaClock size={14} />
                    <span className="text-xs font-bold uppercase tracking-tighter">Awaiting Admin Approval</span>
                  </div>
                  <p className="text-sm text-light-body dark:text-dark-body mb-8 leading-relaxed max-w-[280px] mx-auto">
                    Thank you for your feedback! Your review will be visible once it's verified by our team.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-light hover:text-gold-hover border-b-2 border-gold-light pb-1 transition-all"
                  >
                    Write Another Review
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
      {/* Tab Navigation */}
      <div className="flex justify-center gap-2 sm:gap-12 border-b border-light-section dark:border-dark-border mb-12 overflow-x-auto pb-px">
        {[
          { id: 'description', label: 'Description' },
          { id: 'information', label: 'Details' },
          { id: 'reviews', label: `Reviews (${reviews.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if(tab.id === 'reviews') setIsSubmitted(false); // Reset success state when switching back
            }}
            className={`pb-4 px-4 uppercase text-[10px] sm:text-xs tracking-[0.2em] font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-gold-light' : 'text-light-muted dark:text-dark-muted hover:text-gold-light'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold-light rounded-t-full shadow-[0_-4px_10px_rgba(212,175,55,0.4)]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Rendering */}
      <div className="min-h-[300px] transition-all duration-500">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductTabs;