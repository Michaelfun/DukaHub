import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from '../context/ThemeContext';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Radar } from 'react-chartjs-2';
import Select from 'react-select';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Custom line chart style
ChartJS.defaults.color = '#94a3b8';
ChartJS.defaults.scale.grid.color = 'rgba(226, 232, 240, 0.5)';

// Define consistent colors for all charts
const chartColors = {
  primary: 'rgba(99, 102, 241, 1)',    // Indigo - for Orders
  secondary: 'rgba(251, 191, 36, 1)',  // Amber - for Sales
  tertiary: 'rgba(14, 165, 233, 1)',   // Sky blue - for Customers/Active Orders
  success: 'rgba(16, 185, 129, 1)'     // Emerald - for Order Size/Tracking
};

// React-select custom styles that match the theme
const getSelectStyles = (darkMode) => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: darkMode ? '#1e293b' : provided.backgroundColor,
    borderColor: state.isFocused ? '#e93f6f' : darkMode ? '#475569' : provided.borderColor,
    boxShadow: state.isFocused ? '0 0 0 1px #e93f6f' : provided.boxShadow,
    borderRadius: '0.375rem',
    minHeight: '32px',
    height: '32px',
    padding: '0',
    fontSize: '0.875rem',
    color: darkMode ? 'white' : provided.color,
    '&:hover': {
      borderColor: '#e93f6f',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '30px',
    padding: '0 8px',
  }),
  input: (provided) => ({
    ...provided,
    margin: '0',
    padding: '0',
    color: 'inherit',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: darkMode ? 'white' : provided.color,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#e93f6f' 
      : state.isFocused 
        ? 'rgba(233, 63, 111, 0.1)' 
        : darkMode ? '#1e293b' : provided.backgroundColor,
    color: state.isSelected ? 'white' : darkMode ? 'white' : provided.color,
    '&:hover': {
      backgroundColor: state.isSelected ? '#e93f6f' : 'rgba(233, 63, 111, 0.1)',
      color: state.isSelected ? 'white' : darkMode ? 'white' : '#333',
    },
    cursor: 'pointer',
    fontSize: '0.875rem',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#1e293b' : provided.backgroundColor,
    zIndex: 9999,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0 8px',
    color: '#e93f6f',
  }),
});

const StatCard = ({ title, value, change, changeType, chartData = null, chartColor, darkMode }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
  };

  // Extract the color values from the rgba string
  const colorMatch = chartColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  let backgroundColor;
  
  if (colorMatch) {
    const [_, r, g, b] = colorMatch;
    // Create a darker version of the same color with higher opacity
    backgroundColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
  } else {
    // Fallback to black if color parsing fails
    backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }

  return (
    <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg shadow p-6`}>
      <div className="mb-2">
        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      {chartData && (
        <div className="h-12 mt-2 mb-1">
          <Line
            options={options}
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: chartData,
                  borderColor: chartColor,
                  backgroundColor: backgroundColor,
                  fill: true,
                },
              ],
            }}
          />
        </div>
      )}
      <div className={`text-sm ${
        changeType === 'positive' ? 'text-green-600' : 
        changeType === 'negative' ? 'text-red-600' : darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <span className="flex items-center">
          {changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : ''} {change}
        </span>
      </div>
    </div>
  );
};

const OrderSalesOverview = () => {
  const { darkMode } = useTheme();
  const [timeframe, setTimeframe] = useState('Last Year');
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'start',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          color: darkMode ? '#f8fafc' : '#94a3b8',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          color: darkMode ? '#f8fafc' : '#94a3b8',
        }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: darkMode ? '#f8fafc' : '#94a3b8',
        },
        grid: {
          color: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(226, 232, 240, 0.5)',
        }
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Orders',
        data: [35, 45, 30, 50, 75, 60, 70, 85, 65, 75, 60, 70],
        borderColor: chartColors.primary,
        backgroundColor: `${chartColors.primary}20`,
        fill: false,
      },
      {
        label: 'Sale',
        data: [50, 35, 55, 65, 45, 70, 45, 55, 75, 65, 58, 60],
        borderColor: chartColors.secondary,
        backgroundColor: `${chartColors.secondary}20`,
        fill: false,
      },
      {
        label: 'New Customer',
        data: [30, 40, 35, 40, 45, 30, 35, 40, 30, 40, 45, 35],
        borderColor: chartColors.tertiary,
        backgroundColor: `${chartColors.tertiary}20`,
        fill: false,
      },
    ],
  };

  // Add these options for the timeframe dropdown
  const timeframeOptions = [
    { value: 'lastYear', label: 'Last Year' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'lastQuarter', label: 'Last Quarter' }
  ];

  const handleTimeframeChange = (selectedOption) => {
    setTimeframe(selectedOption.value);
  };

  return (
    <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg shadow p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Order and Sales Overview</h2>
        <div className="flex items-center">
          <Select
            options={timeframeOptions}
            value={timeframeOptions.find(option => option.value === timeframe)}
            onChange={handleTimeframeChange}
            styles={getSelectStyles(darkMode)}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>
      </div>
      <div className="h-80">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

const MarketingChart = () => {
  const { darkMode } = useTheme();
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Clicks',
        data: [65, 75, 85, 80, 56, 55],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderWidth: 1,
      },
      {
        label: 'Subscribers',
        data: [45, 55, 75, 70, 85, 95],
        backgroundColor: 'rgba(45, 212, 191, 0.7)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg shadow p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Marketing</h2>
      </div>
      <div className="h-64">
        <Radar 
          data={data}
          options={{
            scales: {
              r: {
                min: 0,
                max: 100,
                ticks: {
                  display: false,
                },
                pointLabels: {
                  font: {
                    size: 12,
                  },
                  color: darkMode ? '#f8fafc' : '#94a3b8',
                },
                grid: {
                  color: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(226, 232, 240, 0.5)',
                },
                angleLines: {
                  color: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(226, 232, 240, 0.5)',
                },
              },
            },
            plugins: {
              legend: {
                position: 'top',
                align: 'start',
                labels: {
                  usePointStyle: true,
                  boxWidth: 6,
                  boxHeight: 6,
                  color: darkMode ? '#f8fafc' : '#94a3b8',
                },
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

const OrderTracking = () => {
  const { darkMode } = useTheme();
  
  const data = {
    labels: Array.from({ length: 12 }, (_, i) => `Jun ${i + 1}`),
    datasets: [
      {
        data: [
          18, 15, 40, 25, 30, 15, 35, 25, 30, 25, 20, 15
        ],
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === 8 ? 'rgba(99, 102, 241, 1)' : 'rgba(45, 212, 191, 0.7)';
        },
        borderRadius: 4,
        barThickness: 12,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            return context[0].label;
          },
          label: function(context) {
            return `TSH. ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: darkMode ? '#f8fafc' : '#94a3b8',
        }
      },
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 10,
          color: darkMode ? '#f8fafc' : '#94a3b8',
        },
        grid: {
          color: darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(226, 232, 240, 0.5)',
        }
      },
    }
  };

  // Add state for period tracking
  const [period, setPeriod] = useState('last30Days');
  
  // Add these options for the period dropdown
  const periodOptions = [
    { value: 'last30Days', label: 'Last 30 Days' },
    { value: 'lastQuarter', label: 'Last Quarter' },
    { value: 'thisYear', label: 'This Year' }
  ];

  const handlePeriodChange = (selectedOption) => {
    setPeriod(selectedOption.value);
  };

  return (
    <div className={`${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg shadow p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Order Tracking</h2>
        <div className="flex items-center">
          <Select
            options={periodOptions}
            value={periodOptions.find(option => option.value === period)}
            onChange={handlePeriodChange}
            styles={getSelectStyles(darkMode)}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>
      </div>
      <div className="h-64">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

const PaymentStats = ({ title, value, icon, darkMode }) => {
  return (
    <div className={`flex items-center p-4 ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg shadow`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
        title.includes('Transactions') ? 'bg-purple-100 text-purple-600' : 
        title.includes('Confirm') ? 'bg-yellow-100 text-yellow-600' : 
        'bg-emerald-100 text-emerald-600'
      }`}>
        {icon}
      </div>
      <div>
        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{title}</h3>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { darkMode } = useTheme();
  
  // Custom styles for DatePicker, modified for dark mode
  const datePickerCustomStyles = `
    .react-datepicker {
      font-family: inherit;
      border-radius: 0.5rem;
      border: 1px solid ${darkMode ? '#475569' : '#e2e8f0'};
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      ${darkMode ? 'background-color: #1e293b; color: white;' : ''}
    }
    .react-datepicker__header {
      background-color: ${darkMode ? '#0f172a' : '#f8fafc'};
      border-bottom: 1px solid ${darkMode ? '#475569' : '#e2e8f0'};
      ${darkMode ? 'color: white;' : ''}
    }
    .react-datepicker__current-month {
      font-weight: 600;
      font-size: 0.9rem;
      ${darkMode ? 'color: white;' : ''}
    }
    .react-datepicker__day {
      ${darkMode ? 'color: white;' : ''}
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range {
      background-color: #e93f6f !important; /* Primary color */
      color: white !important;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: rgba(233, 63, 111, 0.2) !important;
      color: ${darkMode ? 'white' : '#e93f6f'} !important;
    }
    .react-datepicker__day:hover {
      background-color: rgba(233, 63, 111, 0.1) !important;
    }
    .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range) {
      background-color: rgba(233, 63, 111, 0.5) !important;
    }
    .react-datepicker__navigation {
      top: 8px;
    }
    .react-datepicker__navigation-icon::before {
      border-color: ${darkMode ? 'white' : '#e93f6f'};
    }
    .react-datepicker__day-name {
      color: ${darkMode ? '#94a3b8' : '#64748b'};
    }
  `;
  
  // Date range state for the dashboard
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days as default
    endDate: new Date()
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // Format date to display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
  };
  
  // Handle date changes
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange({
      startDate: start,
      endDate: end
    });
    
    if (end) {
      setIsDatePickerOpen(false);
    }
  };
  
  // Toggle date picker
  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };
  
  return (
    <Layout title="Dashboard">
      <style>{datePickerCustomStyles}</style>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : ''}`}>Order Statistics</h1>
          <div className="relative">
            <button 
              onClick={toggleDatePicker}
              className={`flex items-center ${darkMode ? 'bg-slate-700 text-white' : 'bg-white'} shadow hover:shadow-md transition-shadow duration-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50`}
            >
              <svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(dateRange.startDate)} - {dateRange.endDate ? formatDate(dateRange.endDate) : "Select"}
              <svg className={`w-4 h-4 ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'} transform transition-transform duration-200 ${isDatePickerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDatePickerOpen && (
              <div className="absolute right-0 mt-2 z-10">
                <DatePicker
                  selected={dateRange.startDate}
                  onChange={handleDateChange}
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  selectsRange
                  inline
                  monthsShown={1}
                  showPopperArrow={false}
                  calendarClassName={`rounded-lg shadow-lg ${darkMode ? 'dark-calendar' : ''}`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Orders" 
            value="2765" 
            change="3.2%" 
            changeType="positive"
            chartData={[15, 20, 25, 35, 45, 40]}
            chartColor={chartColors.primary}
            darkMode={darkMode}
          />
          <StatCard 
            title="Total Sales" 
            value="TSH. 65,428" 
            change="21%" 
            changeType="positive"
            chartData={[35, 30, 45, 40, 50, 45]}
            chartColor={chartColors.secondary}
            darkMode={darkMode}
          />
          <StatCard 
            title="Active Order" 
            value="270" 
            change="12%" 
            changeType="positive"
            chartData={[15, 25, 15, 30, 20, 35]}
            chartColor={chartColors.tertiary}
            darkMode={darkMode}
          />
          <StatCard 
            title="Average Order Size" 
            value="TSH. 35.90" 
            change="35%" 
            changeType="positive"
            chartData={[25, 20, 35, 25, 40, 45]}
            chartColor={chartColors.success}
            darkMode={darkMode}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <OrderSalesOverview />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : ''}`}>Payment Statistics</h2>
              <div className="space-y-4">
                <PaymentStats 
                  title="Total Transactions"
                  value="TSH. 8,482.10"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  }
                  darkMode={darkMode}
                />
                <PaymentStats 
                  title="Confirm Orders"
                  value="482"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  darkMode={darkMode}
                />
                <PaymentStats 
                  title="Order Delivered"
                  value="1050"
                  icon={
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MarketingChart />
          <OrderTracking />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 