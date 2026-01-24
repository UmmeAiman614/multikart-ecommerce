import React, { useState } from 'react';
import CommonForm from '../../../components/adminPanel/common/CommonForm';

const UserFormPage = ({ isUpdate = false }) => {
  const [formData, setFormData] = useState({});

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'role', label: 'User Role', type: 'select', options: [
      { label: 'Admin', value: 'admin' }, { label: 'Editor', value: 'editor' }, { label: 'Customer', value: 'customer' }
    ]},
    { name: 'status', label: 'Account Status', type: 'select', options: [
      { label: 'Active', value: 'active' }, { label: 'Suspended', value: 'suspended' }
    ]},
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Leave blank to keep current' }
  ];

  return (
    <CommonForm 
      title={isUpdate ? "Modify User Permissions" : "Register New Admin"}
      fields={fields}
      formData={formData}
      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
      onSubmit={(e) => { e.preventDefault(); console.log(formData); }}
      buttonText={isUpdate ? "Save Changes" : "Create User"}
    />
  );
};

export default UserFormPage;