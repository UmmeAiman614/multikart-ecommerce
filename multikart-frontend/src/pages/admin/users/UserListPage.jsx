import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTable from '../../../components/adminPanel/common/CommonTable';

const UserListPage = () => {
  const navigate = useNavigate();

  const users = [
    { id: 1, name: "Sarah Gold", email: "sarah@jewelry.com", role: "Super Admin", joinDate: "Jan 2024" },
    { id: 2, name: "Michael Stone", email: "mike.s@gmail.com", role: "Customer", joinDate: "Feb 2024" },
    { id: 3, name: "Emma Rose", email: "emma@editor.com", role: "Manager", joinDate: "Mar 2024" },
  ];

  const columns = [
    { 
      header: 'User Details', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gold-light text-white flex items-center justify-center font-bold">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-light-text dark:text-dark-text">{row.name}</p>
            <p className="text-xs text-light-muted">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Role', key: 'role' },
    { header: 'Joined', key: 'joinDate' }
  ];

  return (
    <CommonTable 
      title="Staff & Customers"
      addLink="/admin/users/add-user"
      addText="Add User"
      columns={columns}
      data={users}
      onEdit={(item) => navigate(`/admin/users/update-user/${item.id}`)}
      onDelete={(id) => alert(`Deleting User ID: ${id}`)}
    />
  );
};

export default UserListPage;