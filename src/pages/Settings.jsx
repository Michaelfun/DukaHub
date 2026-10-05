import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Select from 'react-select';
import { useTheme } from '../context/ThemeContext';

// Custom CSS for checkboxes
const customStyles = `
  /* Cross-browser support for checkboxes */
  input[type="checkbox"] {
    accent-color: #e93f6f !important;
    border-color: #e93f6f !important;
  }
`;

const Settings = () => {
  const { darkMode } = useTheme();
  const [settings, setSettings] = useState({
    storeName: 'My Store',
    address: '123 Main Street, City, Country',
    phone: '+1 234 567 8900',
    email: 'contact@mystore.com',
    currency: 'TSH',
    taxRate: 8.5,
    logo: '',
    darkMode: false,
    enableInventoryAlerts: true,
    lowStockThreshold: 10,
    receiptFooter: 'Thank you for shopping with us!',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    backupFrequency: 'daily',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // React-select custom styles that match the theme
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: darkMode ? '#1f2937' : provided.backgroundColor,
      borderColor: state.isFocused ? '#e93f6f' : (darkMode ? '#374151' : provided.borderColor),
      boxShadow: state.isFocused ? '0 0 0 1px #e93f6f' : provided.boxShadow,
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
  };

  // Inject styles directly into document head
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.setAttribute('id', 'custom-dropdown-styles');
    styleElement.textContent = `
      /* Force dropdown highlighting to match theme */
      select option:hover,
      select option:focus,
      select option:active,
      select option:checked {
        background-color: #e93f6f !important;
        color: white !important;
      }
      
      /* Override browser focus color */
      :root {
        --webkit-focus-ring-color: #e93f6f !important;
      }
    `;
    
    // Add style to document head
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      const existingStyle = document.getElementById('custom-dropdown-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setSettings({
      ...settings,
      [actionMeta.name]: selectedOption.value
    });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      [name]: checked
    });
  };

  const handleSave = () => {
    // Here you would typically save to a database or localStorage
    console.log('Saving settings:', settings);
    localStorage.setItem('storeSettings', JSON.stringify(settings));
    
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Format options for react-select
  const currencies = ['TSH', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'].map(currency => ({
    value: currency,
    label: currency
  }));
  
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' },
  ];
  
  const dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map(format => ({
    value: format,
    label: format
  }));
  
  const backupOptions = ['daily', 'weekly', 'monthly', 'never'].map(option => ({
    value: option,
    label: option.charAt(0).toUpperCase() + option.slice(1)
  }));

  return (
    <Layout title="Settings">
      <style>{customStyles}</style>
      <div className="max-w-7xl mx-auto mt-4 mb-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>Settings</h1>
        </div>
        
        <form className="mt-3">
          <div className="grid grid-cols-1 gap-6">
            {/* Store Information */}
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : ''}`}>Store Information</h2>
              <div className={`border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'} mb-4`}></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Currency</label>
                  <Select
                    name="currency"
                    value={currencies.find(option => option.value === settings.currency)}
                    options={currencies}
                    onChange={(option) => handleSelectChange(option, { name: 'currency' })}
                    styles={selectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Address</label>
                  <textarea
                    rows={3}
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Financial Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow p-6 h-full`}>
                <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : ''}`}>Financial Settings</h2>
                <div className={`border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'} mb-4`}></div>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Tax Rate (%)</label>
                    <input
                      type="number"
                      name="taxRate"
                      value={settings.taxRate}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="0.1"
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Receipt Footer Text</label>
                    <textarea
                      rows={2}
                      name="receiptFooter"
                      value={settings.receiptFooter}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Inventory Settings */}
              <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow p-6 h-full`}>
                <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : ''}`}>Inventory Settings</h2>
                <div className={`border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'} mb-4`}></div>
                
                <div className="space-y-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="enableInventoryAlerts"
                      type="checkbox"
                      name="enableInventoryAlerts"
                      checked={settings.enableInventoryAlerts}
                      onChange={handleSwitchChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableInventoryAlerts" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Enable Low Stock Alerts
                    </label>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Low Stock Threshold</label>
                    <input
                      type="number"
                      name="lowStockThreshold"
                      value={settings.lowStockThreshold}
                      onChange={handleChange}
                      min="1"
                      disabled={!settings.enableInventoryAlerts}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        !settings.enableInventoryAlerts ? 'bg-gray-100 cursor-not-allowed' : ''
                      } ${
                        darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance & Localization */}
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : ''}`}>Appearance & Localization</h2>
              <div className={`border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'} mb-4`}></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    id="darkMode"
                    type="checkbox"
                    name="darkMode"
                    checked={settings.darkMode}
                    onChange={handleSwitchChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="darkMode" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Dark Mode
                  </label>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Language</label>
                  <Select
                    name="language"
                    value={languages.find(option => option.value === settings.language)}
                    options={languages}
                    onChange={(option) => handleSelectChange(option, { name: 'language' })}
                    styles={selectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Date Format</label>
                  <Select
                    name="dateFormat"
                    value={dateFormats.find(option => option.value === settings.dateFormat)}
                    options={dateFormats}
                    onChange={(option) => handleSelectChange(option, { name: 'dateFormat' })}
                    styles={selectStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>

            {/* Backup Settings */}
            <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : ''}`}>Backup Settings</h2>
              <div className={`border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'} mb-4`}></div>
              
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Backup Frequency</label>
                <Select
                  name="backupFrequency"
                  value={backupOptions.find(option => option.value === settings.backupFrequency)}
                  options={backupOptions}
                  onChange={(option) => handleSelectChange(option, { name: 'backupFrequency' })}
                  styles={selectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setSettings({
                storeName: 'My Store',
                address: '123 Main Street, City, Country',
                phone: '+1 234 567 8900',
                email: 'contact@mystore.com',
                currency: 'USD',
                taxRate: 8.5,
                logo: '',
                darkMode: false,
                enableInventoryAlerts: true,
                lowStockThreshold: 10,
                receiptFooter: 'Thank you for shopping with us!',
                language: 'en',
                dateFormat: 'MM/DD/YYYY',
                backupFrequency: 'daily',
              })}
              className={`px-4 py-2 border rounded-md ${
                darkMode 
                  ? 'border-dark-border text-gray-300 hover:bg-dark-hover' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Reset to Default
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Toast notification */}
        {snackbar.open && (
          <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg flex items-center ${
            snackbar.severity === 'success' 
              ? darkMode ? 'bg-green-900/80 text-green-200' : 'bg-green-100 text-green-800'
              : darkMode ? 'bg-red-900/80 text-red-200' : 'bg-red-100 text-red-800'
          }`}>
            <span>{snackbar.message}</span>
            <button 
              onClick={handleCloseSnackbar}
              className={`ml-4 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Settings; 