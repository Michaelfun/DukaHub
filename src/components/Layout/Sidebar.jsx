import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const SidebarItem = ({ icon, label, to, active, badge, expanded, onClick, children, mobileMode, darkMode }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const hasSubmenu = children && children.length > 0;

  const handleClick = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      setIsSubmenuOpen(!isSubmenuOpen);
    }

    if (onClick) {
      onClick(hasSubmenu); // Pass hasSubmenu to prevent closing sidebar when opening submenu
    }
  };

  return (
    <div className="mb-1">
      <Link
        to={hasSubmenu ? "#" : to}
        onClick={handleClick}
        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${active
          ? darkMode
            ? 'bg-primary-900/20 text-primary-400 font-medium'
            : 'bg-primary-50 text-primary-700 font-medium'
          : darkMode
            ? 'text-gray-300 hover:bg-gray-700 hover:text-primary-400'
            : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
          }`}
      >
        <div className="flex items-center gap-2.5">
          <span className={`flex-shrink-0 ${expanded ? 'w-5 h-5' : 'w-5 h-5'}`}>{icon}</span>
          {expanded && <span className="font-medium truncate">{label}</span>}
        </div>

        {badge && expanded && (
          <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
            {badge}
          </span>
        )}

        {hasSubmenu && expanded && (
          <span className={`transform transition-transform duration-200 flex-shrink-0 ${isSubmenuOpen ? 'rotate-180' : ''}`}>
            <svg className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        )}
      </Link>

      {hasSubmenu && isSubmenuOpen && expanded && (
        <div className={`mt-1 ml-6 pl-3 border-l ${darkMode ? 'border-gray-700' : 'border-gray-200'} space-y-1`}>
          {children.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 ${location.pathname === item.path
                ? darkMode
                  ? 'text-primary-400 font-medium'
                  : 'text-primary-700 font-medium'
                : darkMode
                  ? 'text-gray-300 hover:text-primary-400'
                  : 'text-gray-600 hover:text-primary-600'
                }`}
              onClick={() => onClick && onClick(false)}
            >
              {item.icon && (
                <span className="text-sm flex-shrink-0">{item.icon}</span>
              )}
              <span className="font-medium text-sm truncate">{item.label}</span>
              {item.badge && (
                <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-auto flex-shrink-0">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ expanded = true, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  const { logout } = useAuth();

  const toggleSidebar = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle menu item clicks
  const handleMenuItemClick = (hasSubmenu) => {
    // Only close mobile menu when clicking a regular item (not a submenu parent)
    if (!hasSubmenu && mobileMenuOpen) {
      // Don't close immediately to allow navigation
      setTimeout(() => setMobileMenuOpen(false), 300);
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/landing');
  };

  const menuItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: 'POS',
      path: '/pos'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      label: 'Inventory',
      path: '/inventory',
      children: [
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
            </svg>
          ),
          label: 'Products',
          path: '/inventory'
        },
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          ),
          label: 'Categories',
          path: '/categories'
        }
      ]
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      label: 'Sales',
      path: '/sales'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      label: 'Users',
      path: '/users',
      badge: '3'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      label: 'Permissions',
      path: '/permissions'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Settings',
      path: '/settings'
    },
  ];

  const sidebarClass = expanded ? 'w-60' : 'w-16';

  return (
    <>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile menu floating button - half circle on edge */}
      <button
        className="fixed top-28 -left-1 z-30 lg:hidden bg-primary-600 text-white p-1.5 pl-2 pr-2 rounded-r-full shadow-lg transition-all duration-300 hover:left-0 focus:outline-none focus:ring-0"
        onClick={toggleMobileMenu}
        aria-label="Open menu"
      >
        <svg className="w-3 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar container */}
      <div className={`fixed inset-y-0 left-0 p-3 z-30 transform transition-all duration-300 ease-in-out pointer-events-none
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Actual sidebar */}
        <div className={`${sidebarClass} ${darkMode ? 'bg-dark-sidebar' : 'bg-white'} rounded-xl shadow-md h-full flex flex-col pointer-events-auto overflow-hidden max-w-full relative`}>
          {/* Header with logo */}
          <div className={`p-4 ${darkMode ? 'border-dark-border' : 'border-gray-200'} border-b flex items-center justify-between relative`}>
            <div className="flex items-center min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center mr-2.5 flex-shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {expanded && (
                <div className="min-w-0">
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>Hello 👋</div>
                  <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'} truncate`}>DukaHUB</h1>
                </div>
              )}
            </div>

            {/* Toggle button positioned at top right of header */}
            <button
              onClick={toggleSidebar}
              className={`${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-dark-hover' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'} rounded-full p-1.5 lg:block hidden flex-shrink-0`}
            >
              {expanded ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>

            {/* Close button for mobile */}
            <button
              onClick={toggleMobileMenu}
              className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} rounded-full p-1 lg:hidden flex-shrink-0`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="p-3 flex-1 overflow-y-auto overflow-x-hidden">
            {/* Main Menu Section */}
            <div className="mb-6">
              {/* Section header - shown in both modes with different styles */}
              <div className={`mb-2 px-3 ${expanded
                ? 'text-xs font-semibold text-gray-400 uppercase tracking-wider'
                : 'text-center text-[10px] font-semibold text-gray-400 uppercase py-1'
                }`}>
                {expanded ? 'Main Menu' : 'MAIN'}
              </div>
              <div className="space-y-1">
                {menuItems.slice(0, 5).map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    to={item.path}
                    active={location.pathname === item.path}
                    badge={item.badge}
                    expanded={expanded}
                    onClick={handleMenuItemClick}
                    children={item.children}
                    mobileMode={mobileMenuOpen}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>

            {/* Administration Section */}
            <div className="mb-4">
              {/* Section header - shown in both modes with different styles */}
              <div className={`mb-2 px-3 ${expanded
                ? 'text-xs font-semibold text-gray-400 uppercase tracking-wider'
                : 'text-center text-[10px] font-semibold text-gray-400 uppercase py-1'
                }`}>
                {expanded ? 'Administration' : 'ADMIN'}
              </div>
              <div className="space-y-1">
                {menuItems.slice(5).map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    to={item.path}
                    active={location.pathname === item.path}
                    badge={item.badge}
                    expanded={expanded}
                    onClick={handleMenuItemClick}
                    children={item.children}
                    mobileMode={mobileMenuOpen}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* User Profile & Sign Out */}
          <div className={`p-3 border-t ${darkMode ? 'border-dark-border bg-dark-card' : 'border-gray-200 bg-gray-50'} rounded-b-xl`}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`w-8 h-8 ${darkMode ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-700'} rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0`}>
                JD
              </div>
              {expanded && (
                <div className="min-w-0 flex-1">
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} truncate`}>John Doe</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} truncate`}>Store Manager</div>
                </div>
              )}
              {expanded && (
                <button className={`${darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-400 hover:text-primary-600'} flex-shrink-0`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} transition-colors duration-200 ${expanded ? 'justify-start' : 'justify-center'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {expanded && <span className="font-medium">Sign Out</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 