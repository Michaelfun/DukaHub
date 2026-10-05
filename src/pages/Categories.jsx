import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useTheme } from '../context/ThemeContext';

const initialCategories = [
  { id: 'tools', name: 'Tools', icon: '🔨', description: 'Hand tools, power tools and accessories' },
  { id: 'electrical', name: 'Electrical', icon: '⚡', description: 'Electrical supplies, wiring, and fixtures' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧', description: 'Pipes, fittings, and plumbing tools' },
  { id: 'paint', name: 'Paint & Supplies', icon: '🎨', description: 'Paint, brushes, rollers, and supplies' },
  { id: 'garden', name: 'Garden', icon: '🌱', description: 'Garden tools, supplies, and outdoor equipment' },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { darkMode } = useTheme();
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    icon: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (editingCategory) {
      setEditingCategory({
        ...editingCategory,
        [name]: value,
      });
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? editingCategory : cat
        )
      );
      setEditingCategory(null);
    } else {
      // Add new category
      const categoryId = newCategory.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
        
      const categoryToAdd = {
        ...newCategory,
        id: categoryId,
      };
      
      setCategories([...categories, categoryToAdd]);
      setNewCategory({
        id: '',
        name: '',
        icon: '',
        description: '',
      });
    }
    
    setShowAddForm(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowAddForm(true);
  };

  const handleDelete = (categoryId) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setShowAddForm(false);
  };

  return (
    <Layout title="Category Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : ''}`}>Categories</h2>
          <button
            onClick={() => setShowAddForm(true)}
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
            Add New Category
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-lg p-6 w-full max-w-md`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : ''}`}>
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button onClick={handleCancelEdit} className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Category Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={editingCategory ? editingCategory.name : newCategory.name}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Icon (Emoji)</label>
                    <input
                      type="text"
                      name="icon"
                      required
                      value={editingCategory ? editingCategory.icon : newCategory.icon}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                      placeholder="🔨, 🔧, 🎨, etc."
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Description</label>
                    <textarea
                      name="description"
                      value={editingCategory ? editingCategory.description : newCategory.description}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md h-24 ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={`px-4 py-2 border rounded-md ${darkMode ? 'border-dark-border text-gray-300 hover:bg-dark-hover' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    {editingCategory ? 'Update Category' : 'Add Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow p-6`}>
              <div className="flex justify-between">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : ''}`}>{category.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className={`p-1 ${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} rounded`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className={`p-1 ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} rounded`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{category.description}</p>
              <div className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ID: {category.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories; 