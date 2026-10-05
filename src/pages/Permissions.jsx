import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useTheme } from '../context/ThemeContext';

// Sample roles and permissions data
const initialRoles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Full system access with all privileges',
    permissions: [
      'dashboard_view', 'dashboard_edit',
      'pos_view', 'pos_create', 'pos_edit', 'pos_delete',
      'inventory_view', 'inventory_create', 'inventory_edit', 'inventory_delete',
      'categories_view', 'categories_create', 'categories_edit', 'categories_delete',
      'sales_view', 'sales_create', 'sales_edit', 'sales_delete',
      'users_view', 'users_create', 'users_edit', 'users_delete',
      'permissions_view', 'permissions_edit',
      'settings_view', 'settings_edit'
    ]
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Manage inventory, sales, and limited user access',
    permissions: [
      'dashboard_view',
      'pos_view', 'pos_create', 'pos_edit',
      'inventory_view', 'inventory_create', 'inventory_edit',
      'categories_view', 'categories_create', 'categories_edit',
      'sales_view', 'sales_create',
      'users_view'
    ]
  },
  {
    id: 3,
    name: 'Cashier',
    description: 'Process sales and view inventory',
    permissions: [
      'dashboard_view',
      'pos_view', 'pos_create',
      'inventory_view',
      'categories_view',
      'sales_view', 'sales_create'
    ]
  },
  {
    id: 4,
    name: 'Inventory',
    description: 'Manage inventory and product categories',
    permissions: [
      'dashboard_view',
      'inventory_view', 'inventory_create', 'inventory_edit',
      'categories_view', 'categories_create', 'categories_edit'
    ]
  }
];

// Permission modules and their actions
const permissionModules = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    permissions: [
      { key: 'view', label: 'View Dashboard' },
      { key: 'edit', label: 'Customize Dashboard' }
    ]
  },
  {
    name: 'POS',
    key: 'pos',
    permissions: [
      { key: 'view', label: 'Access POS' },
      { key: 'create', label: 'Create Orders' },
      { key: 'edit', label: 'Edit Orders' },
      { key: 'delete', label: 'Void/Delete Orders' }
    ]
  },
  {
    name: 'Inventory',
    key: 'inventory',
    permissions: [
      { key: 'view', label: 'View Products' },
      { key: 'create', label: 'Add Products' },
      { key: 'edit', label: 'Edit Products' },
      { key: 'delete', label: 'Delete Products' }
    ]
  },
  {
    name: 'Categories',
    key: 'categories',
    permissions: [
      { key: 'view', label: 'View Categories' },
      { key: 'create', label: 'Create Categories' },
      { key: 'edit', label: 'Edit Categories' },
      { key: 'delete', label: 'Delete Categories' }
    ]
  },
  {
    name: 'Sales',
    key: 'sales',
    permissions: [
      { key: 'view', label: 'View Sales Data' },
      { key: 'create', label: 'Record Sales' },
      { key: 'edit', label: 'Edit Sales Records' },
      { key: 'delete', label: 'Delete Sales Records' }
    ]
  },
  {
    name: 'Users',
    key: 'users',
    permissions: [
      { key: 'view', label: 'View Users' },
      { key: 'create', label: 'Add Users' },
      { key: 'edit', label: 'Edit Users' },
      { key: 'delete', label: 'Delete Users' }
    ]
  },
  {
    name: 'Permissions',
    key: 'permissions',
    permissions: [
      { key: 'view', label: 'View Roles & Permissions' },
      { key: 'edit', label: 'Manage Roles & Permissions' }
    ]
  },
  {
    name: 'Settings',
    key: 'settings',
    permissions: [
      { key: 'view', label: 'View Settings' },
      { key: 'edit', label: 'Change Settings' }
    ]
  }
];

const RoleForm = ({ role, onSubmit, onCancel, darkMode }) => {
  const [formData, setFormData] = useState({
    id: role?.id || '',
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionKey) => {
    setFormData(prev => {
      const newPermissions = [...prev.permissions];
      
      if (newPermissions.includes(permissionKey)) {
        return { 
          ...prev, 
          permissions: newPermissions.filter(p => p !== permissionKey) 
        };
      } else {
        return { 
          ...prev, 
          permissions: [...newPermissions, permissionKey] 
        };
      }
    });
  };

  // Toggle all permissions for a module
  const handleModuleToggle = (moduleKey) => {
    const module = permissionModules.find(m => m.key === moduleKey);
    if (!module) return;
    
    const modulePermissionKeys = module.permissions.map(p => `${moduleKey}_${p.key}`);
    const allModulePermissionsSelected = modulePermissionKeys.every(key => 
      formData.permissions.includes(key)
    );
    
    if (allModulePermissionsSelected) {
      // Remove all module permissions
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !modulePermissionKeys.includes(p))
      }));
    } else {
      // Add all module permissions
      setFormData(prev => {
        const currentPermissions = new Set(prev.permissions);
        modulePermissionKeys.forEach(key => currentPermissions.add(key));
        return {
          ...prev,
          permissions: Array.from(currentPermissions)
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('Role name is required');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Role Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                darkMode ? 'bg-dark-card border-dark-border text-white' : ''
              }`}
              placeholder="e.g., Store Manager"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                darkMode ? 'bg-dark-card border-dark-border text-white' : ''
              }`}
              placeholder="Brief description of this role"
            />
          </div>
        </div>
        
        <div>
          <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Permissions</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>Select the permissions for this role. Use module checkboxes to select all permissions in a group.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {permissionModules.map(module => (
              <div key={module.key} className={`border rounded-lg p-3 ${darkMode ? 'bg-dark-hover border-dark-border' : 'bg-gray-50'}`}>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`module-${module.key}`}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    checked={module.permissions.every(p => 
                      formData.permissions.includes(`${module.key}_${p.key}`)
                    )}
                    onChange={() => handleModuleToggle(module.key)}
                  />
                  <label htmlFor={`module-${module.key}`} className={`ml-2 block text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {module.name}
                  </label>
                </div>
                
                <div className="ml-6 grid grid-cols-1 gap-y-1">
                  {module.permissions.map(permission => (
                    <div key={`${module.key}_${permission.key}`} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${module.key}_${permission.key}`}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        checked={formData.permissions.includes(`${module.key}_${permission.key}`)}
                        onChange={() => handlePermissionChange(`${module.key}_${permission.key}`)}
                      />
                      <label 
                        htmlFor={`${module.key}_${permission.key}`}
                        className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-2">
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
          {role ? 'Update Role' : 'Create Role'}
        </button>
      </div>
    </form>
  );
};

const RoleCard = ({ role, onEdit, onDelete, darkMode }) => {
  // Count total possible permissions
  const totalPermissionsCount = permissionModules.reduce(
    (total, module) => total + module.permissions.length, 
    0
  );
  
  return (
    <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow p-6 relative`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{role.name}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{role.description}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(role)} 
            className={`p-1 ${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} rounded`}
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          {role.name !== 'Admin' && (
            <button 
              onClick={() => onDelete(role.id)} 
              className={`p-1 ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} rounded`}
              title="Delete"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center text-sm mb-1">
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Permissions</span>
          <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>{role.permissions.length}/{totalPermissionsCount}</span>
        </div>
        <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
          <div 
            className="bg-primary-600 h-2 rounded-full" 
            style={{ width: `${(role.permissions.length / totalPermissionsCount) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-2">
        {permissionModules.map(module => {
          const modulePermissions = module.permissions.map(p => `${module.key}_${p.key}`);
          const activePermissionsCount = modulePermissions.filter(p => 
            role.permissions.includes(p)
          ).length;
          
          if (activePermissionsCount === 0) return null;
          
          return (
            <div key={module.key} className="flex items-center">
              <span className={`w-20 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{module.name}</span>
              <div className="flex-1 flex flex-wrap gap-1">
                {module.permissions.map(permission => {
                  const permissionKey = `${module.key}_${permission.key}`;
                  const isActive = role.permissions.includes(permissionKey);
                  
                  if (!isActive) return null;
                  
                  return (
                    <span 
                      key={permissionKey}
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        darkMode ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-800'
                      }`}
                    >
                      {permission.key}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Permissions = () => {
  const { darkMode } = useTheme();
  const [roles, setRoles] = useState(initialRoles);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const handleEdit = (role) => {
    setEditingRole(role);
    setShowForm(true);
  };

  const handleDelete = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const handleSubmit = (roleData) => {
    if (editingRole) {
      // Update existing role
      setRoles(roles.map(role => 
        role.id === roleData.id ? roleData : role
      ));
      setEditingRole(null);
    } else {
      // Add new role
      const newRole = {
        ...roleData,
        id: Math.max(...roles.map(r => r.id)) + 1
      };
      setRoles([...roles, newRole]);
    }
    setShowForm(false);
  };

  return (
    <Layout title="Permissions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : ''}`}>Roles & Permissions</h2>
            {/* <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage user roles and their access permissions
            </p> */}
          </div>
          <button
            onClick={() => { setEditingRole(null); setShowForm(true); }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg flex items-center gap-2 hover:bg-primary-700"
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
            Create Role
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col`}>
              <div className={`flex justify-between items-center p-4 ${darkMode ? 'border-dark-border' : ''} border-b`}>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : ''}`}>
                  {editingRole ? 'Edit Role' : 'Create New Role'}
                </h2>
                <button 
                  onClick={() => { setShowForm(false); setEditingRole(null); }} 
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <RoleForm 
                  role={editingRole} 
                  onSubmit={handleSubmit} 
                  onCancel={() => { setShowForm(false); setEditingRole(null); }} 
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map(role => (
            <RoleCard 
              key={role.id} 
              role={role} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Permissions; 