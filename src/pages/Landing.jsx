import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LandingPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${darkMode 
      ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' 
      : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'}`}>
      {/* Header/Navigation */}
      <header className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary-600 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>DukaHUB</h1>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark mode toggle button */}
            <button 
              onClick={toggleDarkMode}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${darkMode 
                ? 'text-yellow-300 hover:bg-gray-800' 
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
            
            <div className="flex items-center">
              <Link 
                to="/login" 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-lg border transition-colors ${
                  darkMode 
                    ? 'text-primary-400 border-primary-700 hover:bg-primary-900/30' 
                    : 'text-primary-600 border-primary-600 hover:bg-primary-50'
                }`}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className={`ml-2 sm:ml-3 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-lg shadow-sm transition-colors ${
                  darkMode 
                    ? 'bg-primary-700 text-white hover:bg-primary-800' 
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-12 sm:pb-20">
          <div className="lg:flex items-center justify-between gap-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Smart Store Inventory Management System
              </h2>
              <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Streamline your store operations with our all-in-one POS system, inventory management, and analytics platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                <Link 
                  to="/register" 
                  className={`px-5 py-3 font-medium rounded-lg shadow-md transition-colors text-center ${
                    darkMode 
                      ? 'bg-primary-700 text-white hover:bg-primary-800' 
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/" 
                  className={`px-5 py-3 font-medium rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                    darkMode 
                      ? 'text-primary-400 border-primary-700 hover:bg-primary-900/30' 
                      : 'text-primary-600 border-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </Link>
              </div>
              <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No credit card required</span>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className={`p-2 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <img 
                  src={darkMode ? "/images/dashboard-preview-dac.png" : "/images/dashboard-preview.png"}
                  alt="Dashboard Preview" 
                  className="rounded-xl w-full h-auto"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/800x500?text=DukaHUB+Dashboard'}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 z-[-1] w-full h-full rounded-2xl" 
                  style={{
                    backgroundColor: darkMode ? 'rgba(225, 29, 72, 0.3)' : 'rgba(225, 29, 72, 0.2)',
                    boxShadow: darkMode ? '0 0 30px 5px rgba(225, 29, 72, 0.4)' : '0 0 25px 5px rgba(225, 29, 72, 0.3)'
                  }}>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Everything You Need to Run Your Business
              </h2>
              <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Our platform combines powerful inventory management with an intuitive POS system
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? 'bg-primary-900/40 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Point of Sale</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Modern, intuitive POS system that works on any device. Process sales quickly with our user-friendly interface.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? 'bg-primary-900/40 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Inventory Management</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Keep track of your stock levels in real-time. Get alerts when items are running low and manage suppliers.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? 'bg-primary-900/40 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics & Reports</h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Gain insights into your business performance with detailed reports on sales, inventory turnover, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-10 sm:px-6 md:px-12 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to streamline your business?
                </h2>
                <p className="mt-3 max-w-3xl text-base sm:text-lg text-primary-100">
                  Start managing your inventory, sales, and customers more efficiently today.
                </p>
              </div>
              <div className="mt-6 lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  <Link to="/register" className="px-5 py-3 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-50 transition-colors">
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-10 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">DukaHUB</h2>
              </div>
              <p className="text-gray-300 mt-3">
                The modern solution for retail and inventory management. Streamline your business operations with our powerful tools.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Point of Sale</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Inventory Management</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sales Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Customer Management</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Reports & Analytics</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-700'} mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 DukaHub. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 