import React, { useState, useEffect } from 'react';
import CommonForm from '../../../components/adminPanel/common/CommonForm';
import { registerUser, updateUserAdmin, getUserById } from '../../../api/api'; 
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, Eye, EyeOff } from 'lucide-react';

const UserFormPage = ({ isUpdate = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'customer',
    status: 'active',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Eye icon state
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isUpdate && id) {
      const loadUserDetails = async () => {
        try {
          setFetching(true);
          const response = await getUserById(id);
          const userData = response.data;
          
          // Dropdowns ko fill karne ke liye backend ki values ko state mein set karein
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            role: userData.role || 'customer',
            status: userData.status || 'active',
            password: userData.password || '' // Password fill ho jayega (agar backend bhej raha hai)
          });
        } catch (err) {
          toast.error("Failed to load user details");
        } finally {
          setFetching(false);
        }
      };
      loadUserDetails();
    }
  }, [isUpdate, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isUpdate) {
        await updateUserAdmin(id, formData);
        toast.success("User updated successfully!");
      } else {
        await registerUser(formData);
        toast.success("New user registered!");
      }
      navigate('/admin/users/list');
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed!");
    } finally {
      setLoading(false);
    }
  };

  // Eye Icon Toggle Button
  const PasswordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { 
      name: 'password', 
      label: 'Password', 
      type: showPassword ? 'text' : 'password', // Toggle type
      required: !isUpdate,
      suffix: PasswordToggle // Note: CommonForm must support 'suffix' or custom rendering
    },
    { 
      name: 'role', 
      label: 'User Role', 
      type: 'select', 
      options: [
        { label: 'Admin', value: 'admin' }, 
        { label: 'Editor', value: 'editor' }, 
        { label: 'Customer', value: 'customer' }
      ]
    },
    { 
      name: 'status', 
      label: 'Account Status', 
      type: 'select', 
      options: [
        { label: 'Active', value: 'active' }, 
        { label: 'Suspended', value: 'suspended' }
      ]
    }
  ];

  if (fetching) return (
    <div className="flex justify-center p-20">
      <Loader2 className="animate-spin text-gold-light" size={40} />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 animate-in fade-in duration-500">
      <CommonForm 
        title={isUpdate ? `Edit User: ${formData.name}` : "Register New Admin"}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText={loading ? "Processing..." : (isUpdate ? "Update User" : "Create User")}
        disabled={loading}
      />
    </div>
  );
};

export default UserFormPage;