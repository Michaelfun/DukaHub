import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Sample notifications for low stock items
const generateSampleNotifications = () => {
  return [
    {
      id: 1,
      type: 'lowStock',
      productName: 'LED Light Bulbs',
      stockLevel: 3,
      threshold: 10,
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false
    },
    {
      id: 2,
      type: 'lowStock',
      productName: 'Wire Stripper',
      stockLevel: 2,
      threshold: 10,
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: false
    },
    {
      id: 3,
      type: 'outOfStock',
      productName: 'Hammer',
      stockLevel: 0,
      threshold: 5,
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      read: true
    }
  ];
};

const NotificationsPanel = ({ darkMode, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // In a real app, you'd fetch notifications from an API or state management
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      const sampleNotifications = generateSampleNotifications();
      setNotifications(sampleNotifications);
      localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }
  }, []);

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread' 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.type === activeTab);

  const handleReadAll = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div 
      className={`absolute right-2 top-16 w-80 sm:w-96 ${
        darkMode ? 'bg-dark-card border-dark-border text-white' : 'bg-white border-gray-200 text-gray-800'
      } border shadow-lg rounded-lg z-50 overflow-hidden`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notifications</h3>
        <div className="flex gap-2">
          <button
            onClick={handleReadAll}
            className={`text-xs px-2 py-1 rounded ${
              darkMode 
                ? 'hover:bg-dark-hover text-primary-400' 
                : 'hover:bg-gray-100 text-primary-600'
            }`}
          >
            Mark all as read
          </button>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              darkMode 
                ? 'hover:bg-dark-hover text-gray-400' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex border-b ${darkMode ? 'border-dark-border' : 'border-gray-200'}`}>
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === 'all'
              ? darkMode 
                ? 'text-primary-400 border-b-2 border-primary-400' 
                : 'text-primary-600 border-b-2 border-primary-600'
              : darkMode 
                ? 'text-gray-400 hover:text-gray-300' 
                : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('unread')}
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === 'unread'
              ? darkMode 
                ? 'text-primary-400 border-b-2 border-primary-400' 
                : 'text-primary-600 border-b-2 border-primary-600'
              : darkMode 
                ? 'text-gray-400 hover:text-gray-300' 
                : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => setActiveTab('lowStock')}
          className={`flex-1 py-2 text-xs font-medium ${
            activeTab === 'lowStock'
              ? darkMode 
                ? 'text-primary-400 border-b-2 border-primary-400' 
                : 'text-primary-600 border-b-2 border-primary-600'
              : darkMode 
                ? 'text-gray-400 hover:text-gray-300' 
                : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Low Stock
        </button>
      </div>

      {/* Notifications List */}
      <div className={`max-h-80 overflow-y-auto ${darkMode ? 'scrollbar-dark' : 'scrollbar-light'}`}>
        {filteredNotifications.length === 0 ? (
          <div className={`flex flex-col items-center justify-center p-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-sm">No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 border-b ${darkMode ? 'border-dark-border' : 'border-gray-100'} ${
                !notification.read ? (darkMode ? 'bg-dark-hover' : 'bg-blue-50') : ''
              }`}
            >
              <div className="flex items-start">
                <div className={`mt-0.5 mr-3 p-2 rounded-full ${
                  notification.type === 'outOfStock' 
                    ? darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
                    : darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-600'
                }`}>
                  {notification.type === 'outOfStock' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {notification.type === 'outOfStock' 
                        ? `${notification.productName} is out of stock!` 
                        : `${notification.productName} is running low`}
                    </p>
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {notification.type === 'outOfStock' 
                      ? 'Currently out of stock. Please reorder soon.' 
                      : `Current stock: ${notification.stockLevel} (Threshold: ${notification.threshold})`}
                  </p>
                  
                  {!notification.read && (
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode 
                            ? 'bg-dark-bg text-primary-400 hover:bg-gray-800' 
                            : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                        }`}
                      >
                        Mark as read
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={`p-3 border-t ${darkMode ? 'border-dark-border' : 'border-gray-200'}`}>
        <button
          className={`w-full py-2 text-xs font-medium rounded-lg ${
            darkMode 
              ? 'bg-dark-hover text-white hover:bg-gray-800' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

NotificationsPanel.propTypes = {
  darkMode: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default NotificationsPanel; 