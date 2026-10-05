import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useTheme } from '../context/ThemeContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Chart.js options
const chartOptions = (title, darkMode) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: darkMode ? '#fff' : '#333',
      },
    },
    title: {
      display: true,
      text: title,
      color: darkMode ? '#fff' : '#333',
    },
  },
  scales: {
    x: {
      grid: {
        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        color: darkMode ? '#ccc' : '#333',
      },
    },
    y: {
      grid: {
        color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        color: darkMode ? '#ccc' : '#333',
      },
    },
  },
});

// Sample sales data
const initialSalesData = [
  {
    id: 'S001',
    date: new Date(2023, 4, 1, 9, 30),
    cashier: 'John Doe',
    items: [
      { name: 'Hammer', quantity: 2, price: 15.99 },
      { name: 'Nails (Pack of 100)', quantity: 1, price: 8.99 },
    ],
    subtotal: 40.97,
    tax: 3.68,
    discount: 0,
    total: 44.65,
    paymentMethod: 'Credit Card',
  },
  // ... existing code ...
];

// StatCard component for displaying metrics
const StatCard = ({ title, value, icon, change, isPositive, darkMode }) => {
  const changeColor = isPositive
    ? darkMode ? 'text-green-400' : 'text-green-600'
    : darkMode ? 'text-red-400' : 'text-red-600';

  return (
    <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} mb-1`}>{title}</p>
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{value}</h3>
          <p className={`text-xs ${changeColor} flex items-center`}>
            {isPositive ? '↑' : '↓'} {change}% from last month
          </p>
        </div>
        <div className={`p-3 rounded-full ${darkMode ? 'bg-primary-800/20' : 'bg-primary-50'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// SalesSummary component with charts
const SalesSummary = ({ salesData, darkMode }) => {
  // Data for daily sales chart
  const dailySalesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales (TSH)',
        data: [2100, 3200, 2800, 4900, 5600, 7200, 6100],
        backgroundColor: '#e93f6f',
        borderColor: '#e93f6f',
      },
    ],
  };

  // Data for sales by category
  const categoryData = {
    labels: ['Tools', 'Electrical', 'Plumbing', 'Paint', 'Garden'],
    datasets: [
      {
        label: 'Sales by Category',
        data: [25, 20, 18, 15, 22],
        backgroundColor: [
          '#e93f6f',
          '#f9c74f',
          '#90be6d',
          '#43aa8b',
          '#577590',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for sales trend
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Trend',
        data: [12000, 19000, 15000, 22000, 30000, 35000],
        borderColor: '#e93f6f',
        backgroundColor: 'rgba(233, 63, 111, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64">
          <div className={`h-full ${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md p-4`}>
            <Doughnut 
              data={categoryData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: darkMode ? '#fff' : '#333',
                    },
                  },
                  title: {
                    display: true,
                    text: 'Sales by Category',
                    color: darkMode ? '#fff' : '#333',
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="h-64 md:col-span-2">
          <div className={`h-full ${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md p-4`}>
            <Bar data={dailySalesData} options={chartOptions('Daily Sales', darkMode)} />
          </div>
        </div>
      </div>
      <div className="h-72">
        <div className={`h-full ${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md p-4`}>
          <Line data={trendData} options={chartOptions('Sales Trend', darkMode)} />
        </div>
      </div>
    </div>
  );
};

// SalesTable component for displaying sales data
const SalesTable = ({ salesData, onViewDetails, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${darkMode ? 'bg-dark-hover' : 'bg-gray-50'}`}>
            <tr>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Order ID
              </th>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Date
              </th>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Cashier
              </th>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Items
              </th>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Total
              </th>
              <th scope="col" className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Payment
              </th>
              <th scope="col" className={`px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'divide-dark-border divide-y' : 'divide-y divide-gray-200 bg-white'}`}>
            {salesData.map((sale) => (
              <tr key={sale.id} className={darkMode ? 'hover:bg-dark-hover' : 'hover:bg-gray-50'}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {sale.id}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {sale.date.toLocaleString()}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {sale.cashier}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {sale.items.length}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  TSH {sale.total.toFixed(2)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {sale.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => onViewDetails(sale)}
                    className="text-primary-600 hover:text-primary-800 font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// SaleDetails component for displaying detailed information about a sale
const SaleDetails = ({ sale, onClose, darkMode }) => {
  if (!sale) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-lg p-6 w-full max-w-md`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Order Details</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Order ID: {sale.id}</p>
          </div>
          <button
            onClick={onClose}
            className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className={`border-t border-b py-4 my-4 ${darkMode ? 'border-dark-border' : 'border-gray-200'}`}>
          <div className="flex justify-between">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date:</p>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sale.date.toLocaleString()}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Cashier:</p>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sale.cashier}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Payment Method:</p>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{sale.paymentMethod}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className={`text-md font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Items</h3>
          <div className={`divide-y ${darkMode ? 'divide-dark-border' : 'divide-gray-200'}`}>
            {sale.items.map((item, index) => (
              <div key={index} className="py-2 flex justify-between">
                <div>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quantity: {item.quantity}</p>
                </div>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>TSH {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`border-t pt-4 ${darkMode ? 'border-dark-border' : 'border-gray-200'}`}>
          <div className="flex justify-between">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Subtotal:</p>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>TSH {sale.subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mt-1">
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Tax:</p>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>TSH {sale.tax.toFixed(2)}</p>
          </div>
          {sale.discount > 0 && (
            <div className="flex justify-between mt-1">
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Discount:</p>
              <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>-TSH {sale.discount.toFixed(2)}</p>
            </div>
          )}
          <div className="flex justify-between mt-3 font-bold">
            <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>Total:</p>
            <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>TSH {sale.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to generate select styles based on dark mode
const getSelectStyles = (darkMode) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#1f2937' : provided.backgroundColor,
    borderColor: darkMode ? '#374151' : provided.borderColor,
    boxShadow: provided.boxShadow,
    '&:hover': {
      borderColor: darkMode ? '#4b5563' : provided.borderColor,
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#1f2937' : provided.backgroundColor,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? darkMode ? '#e93f6f' : provided.backgroundColor
      : state.isFocused
      ? darkMode ? '#374151' : provided.backgroundColor
      : darkMode ? '#1f2937' : provided.backgroundColor,
    color: darkMode 
      ? state.isSelected ? 'white' : '#e5e7eb' 
      : provided.color,
    '&:hover': {
      backgroundColor: darkMode ? '#374151' : undefined,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkMode ? '#e5e7eb' : provided.color,
  }),
  input: (provided) => ({
    ...provided,
    color: darkMode ? '#e5e7eb' : provided.color,
  }),
});

// Main Sales component
const Sales = () => {
  const [salesData, setSalesData] = useState(initialSalesData);
  const [selectedSale, setSelectedSale] = useState(null);
  const [startDate, setStartDate] = useState(new Date(2023, 3, 1));
  const [endDate, setEndDate] = useState(new Date());
  const { darkMode } = useTheme();

  // Filter options for payment methods
  const paymentOptions = [
    { value: 'all', label: 'All Payment Methods' },
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Credit Card' },
    { value: 'mobile', label: 'Mobile Money' },
  ];

  // Method to handle viewing sale details
  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
  };

  // Method to close sale details modal
  const handleCloseDetails = () => {
    setSelectedSale(null);
  };

  return (
    <Layout title="Sales Reports">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Today's Sales"
            value="TSH 125,500"
            icon={
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            change="8.2"
            isPositive={true}
            darkMode={darkMode}
          />
          <StatCard
            title="Weekly Sales"
            value="TSH 876,200"
            icon={
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            change="12.5"
            isPositive={true}
            darkMode={darkMode}
          />
          <StatCard
            title="Monthly Sales"
            value="TSH 3,250,000"
            icon={
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            }
            change="5.3"
            isPositive={true}
            darkMode={darkMode}
          />
          <StatCard
            title="Average Order Value"
            value="TSH 45,620"
            icon={
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
            change="2.1"
            isPositive={false}
            darkMode={darkMode}
          />
        </div>

        <SalesSummary salesData={salesData} darkMode={darkMode} />

        <div className={`p-4 ${darkMode ? 'bg-dark-card' : 'bg-white'} rounded-lg shadow-md mb-6`}>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Sales History</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Start Date
              </label>
              <div className={`${darkMode ? 'dark-datepicker' : ''}`}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'}`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                End Date
              </label>
              <div className={`${darkMode ? 'dark-datepicker' : ''}`}>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className={`w-full p-2 border rounded-md ${darkMode ? 'bg-dark-card border-dark-border text-white' : 'border-gray-300'}`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Payment Method
              </label>
              <Select
                options={paymentOptions}
                defaultValue={paymentOptions[0]}
                styles={getSelectStyles(darkMode)}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded-md flex items-center gap-2 hover:bg-primary-700"
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter Sales
            </button>
          </div>
        </div>

        <SalesTable 
          salesData={salesData} 
          onViewDetails={handleViewDetails}
          darkMode={darkMode}
        />

        {selectedSale && (
          <SaleDetails 
            sale={selectedSale} 
            onClose={handleCloseDetails}
            darkMode={darkMode}
          />
        )}
      </div>
    </Layout>
  );
};

export default Sales; 