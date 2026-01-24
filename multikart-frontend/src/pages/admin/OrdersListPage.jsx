import React, { useEffect, useState } from 'react';
import CommonTable from '../../components/adminPanel/common/CommonTable';
import { CheckCircle, Truck, MapPin, Mail, Phone, Trash2 } from 'lucide-react';
import API from '../../api/api'; 
import { toast } from 'react-hot-toast';

const OrdersListPage = ({ type = "pending" }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get('/order/all'); 
      setOrders(res.data || []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [type]);

  // Handle Status Update (Ship or Complete)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await API.put(`/order/update-status/${id}`, { status: newStatus });
      if (res.status === 200) {
        toast.success(`Order moved to ${newStatus}`);
        fetchOrders();
      }
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  // Handle Delete Order
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order record?")) return;
    try {
      await API.delete(`/order/delete/${id}`);
      toast.success("Order deleted");
      fetchOrders();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // Filter orders based on type (pending, shipped, completed)
  const filteredOrders = orders.filter(order => 
    (order.orderStatus || 'pending').toLowerCase() === type.toLowerCase()
  );

  const columns = [
    { 
      header: 'Order ID', 
      render: (row) => <span className="font-bold text-[10px]">#{row._id.slice(-6).toUpperCase()}</span> 
    },
    { 
      header: 'Customer', 
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-sm">{row.shippingDetails?.firstName}</span>
          <div className="flex items-center gap-1 text-[10px] opacity-70 italic"><Mail size={10} /> {row.shippingDetails?.email}</div>
          <div className="flex items-center gap-1 text-[10px] text-gold-light font-bold"><Phone size={10} /> {row.shippingDetails?.phone}</div>
        </div>
      )
    },
    { 
      header: 'Address', 
      render: (row) => <span className="text-[11px] italic max-w-[150px] truncate block">{row.shippingDetails?.address}</span> 
    },
    { 
      header: 'Action', 
      render: (row) => (
        <div className="flex gap-2">
          {/* PENDING PAGE ACTION */}
          {type.toLowerCase() === 'pending' && (
            <button onClick={() => handleUpdateStatus(row._id, 'shipped')} className="bg-blue-500/10 text-blue-600 px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-blue-600 hover:text-white flex items-center gap-1">
              <Truck size={12} /> SHIP ORDER
            </button>
          )}

          {/* SHIPPED PAGE ACTION */}
          {type.toLowerCase() === 'shipped' && (
            <button onClick={() => handleUpdateStatus(row._id, 'completed')} className="bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-emerald-600 hover:text-white flex items-center gap-1">
              <CheckCircle size={12} /> MARK DELIVERED
            </button>
          )}

          {/* COMPLETED PAGE ACTION (DELETE) */}
          {type.toLowerCase() === 'completed' && (
            <button onClick={() => handleDelete(row._id)} className="bg-red-500/10 text-red-600 px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-red-600 hover:text-white flex items-center gap-1">
              <Trash2 size={12} /> DELETE RECORD
            </button>
          )}
        </div>
      )
    }
  ];

  if (loading) return <div className="text-center py-20 text-gold-light font-serif">Syncing Database...</div>;

  return (
    <div className="space-y-6">
      <CommonTable 
        title={`${type} Orders (${filteredOrders.length})`} 
        columns={columns} 
        data={filteredOrders} 
        onEdit={null} 
        onDelete={null} 
      />
    </div>
  );
};

export default OrdersListPage;