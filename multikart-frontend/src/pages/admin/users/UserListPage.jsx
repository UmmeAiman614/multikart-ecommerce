import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/adminPanel/common/CommonTable';
import { getAllUsers, deleteUser } from '../../../api/api';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const UserListPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Data Fetching Function
  // Pehle import update karein


// Component ke andar fetching function ko aisa kar dein:
const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await getAllUsers(); // Ab ye api.js wala function use ho raha hai
    setUsers(response.data);
  } catch (err) {
    console.error("❌ Error:", err);
    toast.error("Failed to load users");
  } finally {
    setLoading(false);
  }
};

// Delete function bhi update karein:
const handleDelete = async (id) => {
  if (window.confirm("Are you sure?")) {
    try {
      await deleteUser(id); // API function call
      toast.success("User removed");
      fetchUsers();
    } catch (err) {
      toast.error("Delete failed");
    }
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);


  const columns = [
    { 
      header: 'User Details', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gold-light text-white flex items-center justify-center font-bold uppercase">
            {row.name ? row.name.charAt(0) : 'U'}
          </div>
          <div>
            <p className="font-bold text-light-text dark:text-dark-text">{row.name}</p>
            <p className="text-xs text-light-muted">{row.email}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          row.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {row.role}
        </span>
      )
    },
    { 
      header: 'Joined', 
      render: (row) => new Date(row.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    }
  ];

  if (loading) return (
    <div className="h-64 flex items-center justify-center">
      <Loader2 className="animate-spin text-gold-light" size={32} />
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <CommonTable 
        title="Staff & Customers"
        addLink="/admin/users/add-user"
        addText="Add User"
        columns={columns}
        data={users}
        onEdit={(item) => navigate(`/admin/users/update-user/${item._id}`)} // MongoDB use kar rahe hain to _id use karein
        onDelete={(item) => handleDelete(item._id)}
      />
    </div>
  );
};

export default UserListPage;