import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: "The Art of Choosing the Perfect Engagement Ring",
      image: "https://images.unsplash.com/photo-1535633302704-b02f4f129532?q=80&w=600", // New URL
      description: "Discover expert tips for selecting an engagement ring that perfectly matches your partner's style and personality.",
      author: "Sarah Mitchell",
      date: "May 15, 2026",
      readTime: "4 min read",
      category: "Guides"
    },
    {
      id: 2,
      title: "How to Care for Your Pearl Jewelry",
      // Elegant Pearl Necklace Image
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600",
      description: "Learn essential maintenance techniques to keep your pearl jewelry looking lustrous for generations to come.",
      author: "Michael Chen",
      date: "April 28, 2026",
      readTime: "3 min read",
      category: "Care"
    },
    {
      id: 3,
      title: "Trending Jewelry Styles for Summer 2026",
      // Trendy Gold/Gemstone Jewelry Image
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600",
      description: "Explore the hottest jewelry trends this season, from minimalist gold chains to statement gemstone pieces.",
      author: "Emma Rodriguez",
      date: "June 2, 2026",
      readTime: "5 min read",
      category: "Trends"
    }
  ];

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-light-bg dark:bg-dark-bg transition-colors duration-500">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-light-section dark:border-dark-border pb-10">
          <div className="max-w-2xl">
            <span className="text-gold-light font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Journal</span>
            <h2 className="text-5xl md:text-7xl font-serif italic font-bold text-light-text dark:text-dark-text tracking-tighter leading-tight">
              Stories & <span className="text-gold-light">Refinement</span>
            </h2>
          </div>
          <p className="text-light-body dark:text-dark-body max-w-xs font-serif italic text-lg opacity-80">
            Dive into the world of high-end jewelry and timeless elegance.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group cursor-pointer"
            >
              {/* Image Container with Floating Category */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl bg-light-section dark:bg-dark-card">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Badge */}
                <span className="absolute top-6 left-6 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md text-light-text dark:text-dark-text text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg border border-gold-light/20">
                  {blog.category}
                </span>
              </div>

              {/* Blog Content */}
              <div className="space-y-4 px-2">
                {/* Meta Info */}
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gold-light">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {blog.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-light-text dark:text-dark-text group-hover:text-gold-light transition-colors duration-300 leading-snug">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-light-body dark:text-dark-body line-clamp-2 leading-relaxed opacity-70">
                  {blog.description}
                </p>

                {/* Author & Read More Combined */}
                <div className="pt-4 flex items-center justify-between border-t border-light-section dark:border-dark-border">
                  <div className="flex items-center gap-3">
                    {/* Golden Circle for User Icon */}
                    <div className="w-8 h-8 rounded-full bg-gold-light/10 flex items-center justify-center text-gold-light border border-gold-light/20">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-light-text dark:text-dark-text opacity-80">{blog.author}</span>
                  </div>

                  <a
                    href={`/blog/${blog.id}`}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-light-text dark:text-dark-text hover:text-gold-light transition-colors"
                  >
                    Read More <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button - Centered */}
        <div className="mt-20 text-center">
          <button className="px-12 py-5 rounded-full border border-gold-light/30 text-light-text dark:text-dark-text text-xs font-black uppercase tracking-[0.3em] hover:bg-gold-light hover:text-white dark:hover:text-black transition-all duration-500 shadow-xl">
            Explore All Journal Entries
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;