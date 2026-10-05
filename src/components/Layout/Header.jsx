import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import NotificationsPanel from '../Notifications/NotificationsPanel';
import MessagePanel from '../Messages/MessagePanel';

const Header = ({ title = "POS System", cashierName }) => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  
  const handleLogout = () => {
    // Clear authentication from localStorage
    localStorage.removeItem('isAuthenticated');
    
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new Event('authChange'));
    
    // Redirect to landing page
    navigate('/landing');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showMessages) setShowMessages(false);
  };

  const toggleMessages = () => {
    setShowMessages(!showMessages);
    if (showNotifications) setShowNotifications(false);
  };
  
  return (
    <div className="p-3 sm:px-6 sm:py-4 relative">
      <header className={`${darkMode ? 'bg-dark-card shadow-lg border border-dark-border' : 'bg-white shadow-md'} py-2.5 px-4 sm:px-6 flex justify-between items-center rounded-xl h-auto`}>
        <div className="flex items-center gap-4">
          <h1 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-dark-text-primary' : 'text-gray-800'} truncate`}>{title}</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-5">
          <div className="relative hidden sm:block">
            <input
              type="search"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border ${darkMode ? 'bg-dark-card border-dark-border text-dark-text-primary placeholder-dark-text-muted' : 'bg-white border-gray-200 text-gray-800'} rounded-lg w-[240px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm`}
            />
            <svg
              className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-dark-text-secondary' : 'text-gray-400'}`}
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
          
          <div className="flex space-x-2 sm:space-x-4">
            {/* Dark mode toggle button */}
            <button 
              onClick={toggleDarkMode}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${darkMode 
                ? 'text-yellow-300 hover:bg-dark-hover' 
                : 'text-gray-500 hover:bg-gray-100'}`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Notifications button */}
            <button 
              onClick={toggleNotifications}
              className={`relative p-1.5 sm:p-2 ${showNotifications 
                ? 'text-primary-600 bg-primary-100' 
                : darkMode 
                  ? 'text-dark-text-secondary hover:text-primary-500 hover:bg-dark-hover' 
                  : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'} 
                rounded-full transition-colors`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-medium text-white">3</span>
            </button>
            
            {/* Messages button */}
            <button 
              onClick={toggleMessages}
              className={`relative p-1.5 sm:p-2 ${showMessages 
                ? 'text-primary-600 bg-primary-100' 
                : darkMode 
                  ? 'text-dark-text-secondary hover:text-primary-500 hover:bg-dark-hover' 
                  : 'text-gray-500 hover:text-primary-600 hover:bg-primary-50'} 
                rounded-full transition-colors`}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute top-0 right-0 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-medium text-white">2</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className={`hidden sm:flex items-center px-3 py-1.5 ${darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-50 text-red-600 hover:bg-red-100'} rounded-lg transition-colors`}
              title="Logout"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
          
          <div className={`flex items-center gap-2 sm:gap-3 border-l ${darkMode ? 'border-dark-border' : 'border-gray-200'} pl-2 sm:pl-4`}>
            <div 
              className={`w-7 h-7 sm:w-9 sm:h-9 ${darkMode ? 'bg-primary-700/20 text-primary-400' : 'bg-primary-100 text-primary-700'} rounded-full flex items-center justify-center font-medium text-sm cursor-pointer`}
            >
              {cashierName?.charAt(0) || 'U'}
            </div>
            <div className="text-right hidden xs:block">
              <div className={`text-sm font-medium ${darkMode ? 'text-dark-text-primary' : 'text-gray-800'} truncate`}>{cashierName}</div>
              <div className={`text-xs ${darkMode ? 'text-dark-text-secondary' : 'text-gray-500'} truncate`}>Cashier</div>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      {showNotifications && (
        <NotificationsPanel darkMode={darkMode} onClose={() => setShowNotifications(false)} />
      )}

      {/* Messages Panel */}
      {showMessages && (
        <MessagePanel darkMode={darkMode} onClose={() => setShowMessages(false)} />
      )}
    </div>
  );
};

export default Header; 