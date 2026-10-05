import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Select from 'react-select';
import { useTheme } from '../context/ThemeContext';

// Sample initial users data
const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'admin', 
    status: 'active',
    avatar: null,
    lastLogin: '2023-05-10T08:30:00'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    role: 'manager', 
    status: 'active',
    avatar: null,
    lastLogin: '2023-05-11T15:45:00'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael@example.com', 
    role: 'cashier', 
    status: 'active',
    avatar: null,
    lastLogin: '2023-05-12T10:15:00'
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    role: 'cashier', 
    status: 'inactive',
    avatar: null,
    lastLogin: '2023-04-28T14:20:00'
  },
  { 
    id: 5, 
    name: 'Robert Wilson', 
    email: 'robert@example.com', 
    role: 'inventory', 
    status: 'active',
    avatar: null,
    lastLogin: '2023-05-09T09:45:00'
  }
];

// Get initials from name
const getInitials = (name) => {
  return name.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

// React-select custom styles that match the theme
const getSelectStyles = (darkMode) => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: darkMode ? '#1f2937' : provided.backgroundColor,
    borderColor: state.isFocused ? '#e93f6f' : (darkMode ? '#374151' : provided.borderColor),
    boxShadow: state.isFocused ? '0 0 0 1px #e93f6f' : provided.boxShadow,
    borderRadius: '0.5rem',
    padding: '1px',
    '&:hover': {
      borderColor: '#e93f6f',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#e93f6f' 
      : state.isFocused 
        ? 'rgba(233, 63, 111, 0.1)' 
        : (darkMode ? '#1f2937' : provided.backgroundColor),
    color: state.isSelected 
      ? 'white' 
      : darkMode 
        ? '#e5e7eb' 
        : provided.color,
    '&:hover': {
      backgroundColor: state.isSelected 
        ? '#e93f6f' 
        : darkMode 
          ? '#374151' 
          : 'rgba(233, 63, 111, 0.1)',
      color: state.isSelected 
        ? 'white' 
        : darkMode 
          ? '#e5e7eb' 
          : '#333',
    },
    cursor: 'pointer',
    textTransform: 'capitalize',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#1f2937' : provided.backgroundColor,
    zIndex: 9999,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkMode ? '#e5e7eb' : provided.color,
  }),
  input: (provided) => ({
    ...provided,
    color: darkMode ? '#e5e7eb' : provided.color,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#e93f6f',
  }),
});

const UserRow = ({ user, onEdit, onDelete, onToggleStatus, darkMode }) => {
  const statusColor = user.status === 'active' 
    ? darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800' 
    : darkMode ? 'bg-gray-700/30 text-gray-400' : 'bg-gray-100 text-gray-800';
  
  const roleColorMap = {
    'admin': {
      light: 'bg-purple-100 text-purple-800',
      dark: 'bg-purple-900/30 text-purple-400'
    },
    'manager': {
      light: 'bg-blue-100 text-blue-800',
      dark: 'bg-blue-900/30 text-blue-400'
    },
    'cashier': {
      light: 'bg-primary-100 text-primary-800',
      dark: 'bg-primary-900/30 text-primary-400'
    },
    'inventory': {
      light: 'bg-yellow-100 text-yellow-800',
      dark: 'bg-yellow-900/30 text-yellow-400'
    }
  };
  
  const roleColor = roleColorMap[user.role] 
    ? (darkMode ? roleColorMap[user.role].dark : roleColorMap[user.role].light)
    : (darkMode ? 'bg-gray-700/30 text-gray-400' : 'bg-gray-100 text-gray-800');
  
  const lastLoginDate = new Date(user.lastLogin);
  const formattedDate = lastLoginDate.toLocaleDateString();
  const formattedTime = lastLoginDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <tr className={darkMode ? 'hover:bg-dark-hover' : 'hover:bg-gray-50'}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 mr-3">
            {user.avatar ? (
              <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
            ) : (
              <div className={`h-10 w-10 rounded-full ${darkMode ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-700'} flex items-center justify-center font-medium`}>
                {getInitials(user.name)}
              </div>
            )}
          </div>
          <div>
            <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${roleColor}`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {formattedDate} at {formattedTime}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button 
            onClick={() => onToggleStatus(user.id)} 
            className={`p-1 rounded ${
              user.status === 'active' 
                ? darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50' 
                : darkMode ? 'text-green-400 hover:bg-green-900/20' : 'text-green-600 hover:bg-green-50'
            }`}
            title={user.status === 'active' ? 'Deactivate' : 'Activate'}
          >
            {user.status === 'active' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <button 
            onClick={() => onEdit(user)} 
            className={`p-1 ${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} rounded`}
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(user.id)} 
            className={`p-1 ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} rounded`}
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

const UserForm = ({ user, onSubmit, onCancel, darkMode }) => {
  const [formData, setFormData] = useState({
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'cashier',
    status: user?.status || 'active',
    password: '',
    confirmPassword: '',
  });

  // Add these options for the role and status dropdowns
  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'cashier', label: 'Cashier' },
    { value: 'inventory', label: 'Inventory' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({
      ...formData,
      [actionMeta.name]: selectedOption.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }
    
    if (!user && (!formData.password || formData.password !== formData.confirmPassword)) {
      alert('Passwords must match');
      return;
    }
    
    // Submit without password fields in the form data
    const { confirmPassword, ...submitData } = formData;
    
    // If it's an edit and password is empty, don't send it
    if (user && !submitData.password) {
      const { password, ...dataWithoutPassword } = submitData;
      onSubmit(dataWithoutPassword);
    } else {
      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
              darkMode ? 'bg-dark-card border-dark-border text-white' : ''
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
              darkMode ? 'bg-dark-card border-dark-border text-white' : ''
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Role</label>
          <Select
            name="role"
            value={roleOptions.find(option => option.value === formData.role)}
            options={roleOptions}
            onChange={(option) => handleSelectChange(option, { name: 'role' })}
            styles={getSelectStyles(darkMode)}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Status</label>
          <Select
            name="status"
            value={statusOptions.find(option => option.value === formData.status)}
            options={statusOptions}
            onChange={(option) => handleSelectChange(option, { name: 'status' })}
            styles={getSelectStyles(darkMode)}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            {user ? 'New Password (leave empty to keep current)' : 'Password'}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
            className={`w-full p-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
              darkMode ? 'bg-dark-card border-dark-border text-white' : ''
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required={!user}
            className={`w-full p-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
              darkMode ? 'bg-dark-card border-dark-border text-white' : ''
            }`}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className={`px-4 py-2 border rounded-md ${
            darkMode 
              ? 'border-dark-border text-gray-300 hover:bg-dark-hover' 
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          {user ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

const Users = () => {
  const { darkMode } = useTheme();
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Add these options for filter dropdowns
  const roleFilterOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'cashier', label: 'Cashier' },
    { value: 'inventory', label: 'Inventory' }
  ];

  const statusFilterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleFilterChange = (selectedOption, actionMeta) => {
    if (actionMeta.name === 'roleFilter') {
      setRoleFilter(selectedOption.value);
    } else if (actionMeta.name === 'statusFilter') {
      setStatusFilter(selectedOption.value);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const handleSubmit = (userData) => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === userData.id ? userData : user
      ));
      setEditingUser(null);
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id)) + 1,
        avatar: null,
        lastLogin: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    }
    setShowForm(false);
  };

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <Layout title="User Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="w-full sm:w-auto">
            <div className="relative">
              <input
                type="search"
                placeholder="Search users..."
                className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  darkMode ? 'bg-dark-card border-dark-border text-white placeholder-gray-400' : 'border-gray-200'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Select
              name="roleFilter"
              value={roleFilterOptions.find(option => option.value === roleFilter)}
              options={roleFilterOptions}
              onChange={(option) => handleFilterChange(option, { name: 'roleFilter' })}
              styles={getSelectStyles(darkMode)}
              className="react-select-container min-w-[150px]"
              classNamePrefix="react-select"
            />
            <Select
              name="statusFilter"
              value={statusFilterOptions.find(option => option.value === statusFilter)}
              options={statusFilterOptions}
              onChange={(option) => handleFilterChange(option, { name: 'statusFilter' })}
              styles={getSelectStyles(darkMode)}
              className="react-select-container min-w-[150px]"
              classNamePrefix="react-select"
            />
            <button
              onClick={() => { setEditingUser(null); setShowForm(true); }}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700 whitespace-nowrap"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add User
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-lg p-6 w-full max-w-2xl`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : ''}`}>
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <button 
                  onClick={() => { setShowForm(false); setEditingUser(null); }} 
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <UserForm 
                user={editingUser} 
                onSubmit={handleSubmit} 
                onCancel={() => { setShowForm(false); setEditingUser(null); }} 
                darkMode={darkMode}
              />
            </div>
          </div>
        )}

        <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
          <div className={`p-6 ${darkMode ? 'border-dark-border' : ''} border-b`}>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : ''}`}>Users ({filteredUsers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${darkMode ? 'divide-dark-border' : 'divide-gray-200'}`}>
              <thead className={darkMode ? 'bg-dark-hover' : 'bg-gray-50'}>
                <tr>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    User
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Role
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Last Login
                  </th>
                  <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Status
                  </th>
                  <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'bg-dark-card' : 'bg-white'} divide-y ${darkMode ? 'divide-dark-border' : 'divide-gray-200'}`}>
                {filteredUsers.map(user => (
                  <UserRow 
                    key={user.id} 
                    user={user} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    darkMode={darkMode}
                  />
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className={`px-6 py-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users; 