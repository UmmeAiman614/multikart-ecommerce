// src/components/LatestBlogs.jsx
import { useState, useEffect } from 'react';

const LatestBlogs = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Detect system preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
  }, []);

  // Blog data
  const blogs = [
    {
      id: 1,
      title: "The Art of Choosing the Perfect Engagement Ring",
      image: "/images/blog1.jpg",
      description: "Discover expert tips for selecting an engagement ring that perfectly matches your partner's style and personality.",
      author: "Sarah Mitchell",
      date: "May 15, 2026",
      readTime: "4 min read"
    },
    {
      id: 2,
      title: "How to Care for Your Pearl Jewelry",
      image: "/images/blog2.jpg",
      description: "Learn essential maintenance techniques to keep your pearl jewelry looking lustrous for generations to come.",
      author: "Michael Chen",
      date: "April 28, 2026",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "Trending Jewelry Styles for Summer 2026",
      image: "/images/blog3.jpg",
      description: "Explore the hottest jewelry trends this season, from minimalist gold chains to statement gemstone pieces.",
      author: "Emma Rodriguez",
      date: "June 2, 2026",
      readTime: "5 min read"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest From Our Blog
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Expert insights, styling tips, and jewelry care advice
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div 
              key={blog.id}
              className={`group relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/600x400/f1f5f9/64748b?text=Blog+Image";
                    e.target.className = "w-full h-full object-cover bg-gray-200 dark:bg-gray-800";
                  }}
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className={`font-bold text-xl mb-3 line-clamp-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {blog.title}
                </h3>
                
                {/* Description */}
                <p className={`mb-4 line-clamp-3 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {blog.description}
                </p>
                
                {/* Author & Date */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {blog.author}
                    </p>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {blog.date}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {blog.readTime}
                  </span>
                </div>
                
                {/* Read More Link */}
                <a 
                  href={`/blog/${blog.id}`}
                  className={`mt-4 inline-flex items-center text-sm font-bold border-b-2 border-transparent hover:border-accent-500 ${
                    darkMode ? 'text-white hover:text-accent-300' : 'text-gray-900 hover:text-accent-500'
                  } transition-colors`}
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;