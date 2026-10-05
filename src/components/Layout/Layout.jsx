import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ title, children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { darkMode } = useTheme();
  
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };
  
  const mainContentClass = sidebarExpanded ? 'lg:ml-64' : 'lg:ml-20';

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? 'bg-dark-bg text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Sidebar expanded={sidebarExpanded} onToggle={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${mainContentClass}`}>
        <div className="z-10">
          <Header title={title} cashierName="John Doe" />
        </div>
        <main className="px-4 sm:px-6 pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 