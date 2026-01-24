import React from 'react';
import CommonTable from '../../components/adminPanel/common/CommonTable';
import { Star } from 'lucide-react';

const TestimonialListPage = () => {
  const testimonials = [
    { id: 1, author: "Sophia Loren", rating: 5, review: "The diamond quality is unmatched. My wedding ring is a masterpiece!", date: "2 mins ago" },
    { id: 2, author: "James Bond", rating: 4, review: "Fast delivery of my watch collection. Excellent packaging.", date: "1 hour ago" },
    { id: 3, author: "Grace Kelly", rating: 5, review: "Simply elegant. The emerald pendant exceeded my expectations.", date: "Yesterday" },
  ];

  const columns = [
    { header: 'Author', render: (row) => <span className="font-bold text-light-text dark:text-dark-text">{row.author}</span> },
    { 
      header: 'Rating', 
      render: (row) => (
        <div className="flex text-gold-light">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} fill={i < row.rating ? "currentColor" : "none"} className={i >= row.rating ? "text-light-muted" : ""} />
          ))}
        </div>
      )
    },
    { header: 'Review Content', render: (row) => <p className="text-xs text-light-body dark:text-dark-body italic max-w-xs break-words">"{row.review}"</p> },
    { header: 'Date', key: 'date' }
  ];

  return (
    <CommonTable 
      title="Customer Reviews"
      addLink="/admin/testimonials/add" 
      addText="Add Review"
      columns={columns}
      data={testimonials}
      onEdit={(item) => console.log("Edit", item)}
      onDelete={(id) => alert(`Deleting Review ID: ${id}`)}
    />
  );
};

export default TestimonialListPage;