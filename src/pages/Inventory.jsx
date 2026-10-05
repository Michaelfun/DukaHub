import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { products as initialProducts } from '../data/products';
import Select from 'react-select';
import { useTheme } from '../context/ThemeContext';

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = useTheme();
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'tools',
    stock: '',
  });

  // React-select custom styles that match the theme
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#e93f6f' : darkMode ? '#2e3a4f' : provided.borderColor,
      boxShadow: state.isFocused ? '0 0 0 1px #e93f6f' : provided.boxShadow,
      borderRadius: '0.375rem',
      padding: '1px',
      backgroundColor: darkMode ? '#1a2333' : provided.backgroundColor,
      color: darkMode ? 'white' : provided.color,
      '&:hover': {
        borderColor: '#e93f6f',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#e93f6f' 
        : state.isFocused 
          ? darkMode ? 'rgba(233, 63, 111, 0.2)' : 'rgba(233, 63, 111, 0.1)' 
          : darkMode ? '#1a2333' : provided.backgroundColor,
      color: state.isSelected ? 'white' : darkMode ? '#9ca3af' : provided.color,
      '&:hover': {
        backgroundColor: state.isSelected ? '#e93f6f' : darkMode ? 'rgba(233, 63, 111, 0.2)' : 'rgba(233, 63, 111, 0.1)',
        color: state.isSelected ? 'white' : darkMode ? 'white' : '#333',
      },
      cursor: 'pointer',
      textTransform: 'capitalize',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      backgroundColor: darkMode ? '#1a2333' : provided.backgroundColor,
      border: darkMode ? '1px solid #2e3a4f' : provided.border,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#e93f6f',
    }),
    input: (provided) => ({
      ...provided,
      color: darkMode ? 'white' : provided.color,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: darkMode ? 'white' : provided.color,
    }),
  };

  // Category options for react-select
  const categoryOptions = [
    { value: 'tools', label: 'Tools' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'paint', label: 'Paint & Supplies' },
    { value: 'garden', label: 'Garden' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setNewProduct({
      ...newProduct,
      [actionMeta.name]: selectedOption.value
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Generate a new ID
    const newId = (products.length + 1).toString();
    
    const productToAdd = {
      ...newProduct,
      id: newId,
      price: parseFloat(newProduct.price) || 0,
      stock: parseInt(newProduct.stock) || 0,
      image: newProduct.image || '/images/products/default.jpg'
    };
    
    setProducts([...products, productToAdd]);
    
    // Reset form
    setNewProduct({
      id: '',
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'tools',
      stock: '',
    });
    
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredProducts = searchQuery 
    ? products.filter(
        product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <Layout title="Inventory Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="w-1/3">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                className={`pl-10 pr-4 py-2 w-full border ${darkMode ? 'bg-dark-card border-dark-border text-white placeholder-gray-400' : 'border-gray-200 text-gray-800'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}
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
            Add New Product
          </button>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-lg p-6 w-full max-w-2xl`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Product</h2>
                <button onClick={() => setShowAddForm(false)} className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddProduct}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Category</label>
                    <Select
                      name="category"
                      value={categoryOptions.find(option => option.value === newProduct.category)}
                      options={categoryOptions}
                      onChange={(option) => handleSelectChange(option, { name: 'category' })}
                      styles={selectStyles}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Price (TSH)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      required
                      min="0"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Description</label>
                    <textarea
                      name="description"
                      required
                      value={newProduct.description}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md h-24 ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={newProduct.image}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : ''}`}
                      placeholder="/images/products/example.jpg"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className={`px-4 py-2 border rounded-md ${darkMode ? 'border-dark-border text-gray-300 hover:bg-dark-hover' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow`}>
          <div className={`p-6 border-b ${darkMode ? 'border-dark-border' : ''}`}>
            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : ''}`}>Products ({filteredProducts.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-dark-hover' : 'bg-gray-50'} text-left`}>
                <tr>
                  <th className={`px-6 py-3 text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Product</th>
                  <th className={`px-6 py-3 text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Category</th>
                  <th className={`px-6 py-3 text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Price</th>
                  <th className={`px-6 py-3 text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Stock</th>
                  <th className={`px-6 py-3 text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'divide-dark-border' : 'divide-gray-200'} divide-y`}>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className={`${darkMode ? 'hover:bg-dark-hover' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-3">
                          <img 
                            className="w-10 h-10 rounded-md object-cover bg-gray-100" 
                            src={product.image} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className={`font-medium ${darkMode ? 'text-white' : ''}`}>{product.name}</span>
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate max-w-xs`}>{product.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 capitalize ${darkMode ? 'text-gray-300' : ''}`}>
                      {product.category}
                    </td>
                    <td className={`px-6 py-4 font-medium ${darkMode ? 'text-primary-400' : ''}`}>
                      TSH {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {product.stock > 10 ? (
                        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'}`}>
                          In Stock ({product.stock})
                        </span>
                      ) : product.stock > 0 ? (
                        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`}>
                          Low Stock ({product.stock})
                        </span>
                      ) : (
                        <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'}`}>
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className={`${darkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-800'}`}>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory; 