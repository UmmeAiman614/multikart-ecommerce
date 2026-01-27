import React, { useState, useEffect, useMemo } from 'react'; // useMemo add kiya
import { useNavigate, useLocation } from 'react-router-dom';
import CommonTable from '../../../components/adminPanel/common/CommonTable';
import { getAllProducts, deleteProduct } from '../../../api/api';
import { toast } from 'react-hot-toast';

const ProductListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL se search term nikalna
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || "";

  // LOG 3: Har render par check karein URL mein kya hai
  console.log("📍 Page Render - Current Search Term from URL:", searchTerm);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getAllProducts();
      console.log("📦 API: Total products fetched from DB:", data.length); // LOG 4
      setProducts(data);
    } catch (error) {
      console.error("❌ API Error:", error);
      toast.error("Failed to fetch items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter logic with LOGS
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      console.log("ℹ️ No search term, showing all products.");
      return products;
    }
    
    const results = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const sku = product.sku?.toLowerCase() || "";
      const cat = product.category?.catName?.toLowerCase() || "";
      
      const isMatch = name.includes(searchTerm) || sku.includes(searchTerm) || cat.includes(searchTerm);
      return isMatch;
    });

    console.log(`🎯 Filter Result: Found ${results.length} matches for "${searchTerm}"`); // LOG 5
    return results;
  }, [products, searchTerm]);


  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to remove ${item.name} from inventory?`)) {
      try {
        await deleteProduct(item._id);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error(error.response?.data?.message || "Deletion failed");
      }
    }
  };

  const columns = [
    {
      header: 'Product',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden border border-gold-light/20 bg-light-section shadow-sm">
            <img
              src={row.images && row.images.length > 0 ? row.images[0] : "https://via.placeholder.com/100?text=No+Image"}
              alt={row.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-light-text dark:text-dark-text leading-tight">{row.name}</p>
            <p className="text-[10px] text-gold-dark mt-1 font-mono uppercase tracking-widest">{row.sku}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      render: (row) => (
        <span className="text-xs bg-light-section dark:bg-dark-bg px-2 py-1 rounded text-light-muted">
          {row.category?.catName || "Uncategorized"}
        </span>
      )
    },
    {
      header: 'Price',
      render: (row) => (
        <span className="font-bold text-gold-light">
          ${Number(row.price).toLocaleString()}
        </span>
      )
    },
    {
      header: 'Stock Status',
      render: (row) => (
        <div className="flex flex-col">
          <span className={`text-sm font-semibold ${row.stock < 5 ? 'text-accent-rose' : 'text-light-body'}`}>
            {row.stock} in stock
          </span>
          {row.stock < 5 && <span className="text-[9px] text-accent-rose animate-pulse uppercase">Low Stock</span>}
        </div>
      )
    },
    {
      header: 'Status & Tags',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.isFeatured && (
            <span className="flex items-center gap-1 bg-gold-light/10 text-gold-dark text-[10px] px-2 py-1 rounded-full border border-gold-light/20 font-bold uppercase tracking-wider shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-light animate-pulse"></span>
              Featured
            </span>
          )}
          {row.isOnSale && (
            <span className="flex items-center gap-1 bg-accent-rose/10 text-accent-rose text-[10px] px-2 py-1 rounded-full border border-accent-rose/20 font-bold uppercase tracking-wider shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-rose"></span>
              Sale
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="p-6 animate-fadeIn">
      {/* Search status indicator */}
      {searchTerm && (
        <div className="mb-4 flex items-center justify-between bg-gold-light/5 p-3 rounded-lg border border-gold-light/10">
          <p className="text-sm text-light-muted">
            Showing results for: <span className="font-bold text-gold-dark">"{searchTerm}"</span>
          </p>
          <button 
            onClick={() => navigate(location.pathname)} 
            className="text-xs text-accent-rose hover:underline font-bold uppercase"
          >
            Clear Search
          </button>
        </div>
      )}

      <CommonTable
        title="Jewelry Inventory"
        addLink="/admin/ecommerce/add-product"
        addText="Add New Jewel"
        columns={columns}
        data={filteredProducts} // ✅ Ab hum filtered data bhej rahe hain
        loading={loading}
        onEdit={(item) => navigate(`/admin/ecommerce/update-product/${item._id}`)}
        onDelete={(item) => handleDelete(item)}
      />

      {/* No Results State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center p-10 bg-light-card dark:bg-dark-card rounded-xl border border-dashed border-light-section mt-4">
          <p className="text-light-muted italic">No jewelry found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;