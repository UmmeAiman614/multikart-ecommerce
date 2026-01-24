import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/adminPanel/common/CommonTable';
import { getAllProducts, deleteProduct } from '../../../api/api';
import { toast } from 'react-hot-toast';

const ProductListPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch jewelry items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Handle product deletion
  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to remove ${item.name} from inventory?`)) {
      try {
        await deleteProduct(item._id);
        toast.success("Product deleted successfully");
        fetchProducts(); // Refresh list
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
              src={row.image || "https://via.placeholder.com/100?text=No+Image"}
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
      {!row.isFeatured && !row.isOnSale && (
        <span className="text-[10px] text-light-muted italic">Standard</span>
      )}
    </div>
  )
}
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <CommonTable
        title="Jewelry Inventory"
        addLink="/admin/ecommerce/add-product"
        addText="Add New Jewel"
        columns={columns}
        data={products}
        loading={loading}
        // Using _id for MongoDB compatibility
        onEdit={(item) => navigate(`/admin/ecommerce/update-product/${item._id}`)}
        onDelete={(item) => handleDelete(item)}
      />
    </div>
  );
};

export default ProductListPage;