import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

const CartItem = ({ item, onUpdateQuantity, onRemove, darkMode }) => {
  return (
    <div className={`flex items-center gap-3 py-3 border-b ${darkMode ? 'border-dark-border group hover:bg-dark-hover' : 'border-gray-100 group hover:bg-gray-50'} rounded-lg transition-all duration-200 px-2`}>
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className={`w-14 h-14 object-cover rounded-xl ${darkMode ? 'bg-dark-hover border-dark-border' : 'bg-gray-50 border-gray-100'} p-1 border shadow-sm`}
        />
        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
          {item.quantity}
        </span>
      </div>
      <div className="flex-1 min-w-0 pl-1">
        <h4 className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'} truncate`}>{item.name}</h4>
        <div className={`text-xs font-semibold ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>TSH {item.price.toFixed(2)}</div>
      </div>
      <div className="flex items-center gap-1">
        <div className={`flex items-center ${darkMode ? 'bg-dark-hover' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className={`p-1 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} transition-colors focus:outline-none`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className={`w-6 text-center text-xs font-medium ${darkMode ? 'text-gray-300' : ''}`}>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className={`p-1 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'} transition-colors focus:outline-none`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className={`p-1 ${darkMode ? 'text-gray-500 hover:text-red-400 hover:bg-red-900/20' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'} rounded-full transition-all duration-200 focus:outline-none`}
          aria-label="Remove item"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Cart = ({
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  orderCode,
  subtotal,
  tax,
  discount,
  onBack
}) => {
  const { darkMode } = useTheme();
  const total = subtotal + tax - discount;

  return (
    <div className={`
      ${darkMode ? 'bg-dark-card border-dark-border' : 'bg-white border-gray-100'} 
      rounded-2xl shadow-xl w-full max-w-xs flex flex-col overflow-hidden border 
      lg:h-[calc(100vh-80px)] 
      fixed right-6 top-20 z-30
      lg:relative lg:right-auto lg:top-auto lg:z-10
    `}>
      <div className={`p-4 ${darkMode ? 'bg-gradient-to-r from-dark-hover to-dark-card border-dark-border' : 'bg-gradient-to-r from-gray-50 to-white border-b'} flex items-center justify-between sticky top-0 z-20`}>
        <div>
          <h2 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Current Order</h2>
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex gap-3`}>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>#{orderCode}</span>
            </div>
          </div>
        </div>
        {/* Back button for mobile */}
        {onBack && (
          <button 
            onClick={onBack}
            className={`p-2 ${darkMode ? 'text-gray-300 hover:bg-dark-hover' : 'text-gray-500 hover:bg-gray-100'} rounded-full lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-2">
        {items.length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'} flex flex-col items-center justify-center h-full`}>
            <div className={`w-16 h-16 mx-auto mb-3 ${darkMode ? 'bg-dark-hover' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
              <svg
                className={`w-8 h-8 ${darkMode ? 'text-gray-500' : 'text-gray-300'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className={`font-medium text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Your cart is empty</p>
            <p className="text-xs">Add items to start an order</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>

      <div className={`border-t ${darkMode ? 'bg-dark-hover border-dark-border' : 'bg-gray-50'} p-4 sticky bottom-0 z-20`}>
        <div className="space-y-1.5 mb-4">
          <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span>Subtotal</span>
            <span className="font-medium">TSH {subtotal.toFixed(2)}</span>
          </div>
          <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span>Tax (10%)</span>
            <span className="font-medium">TSH {tax.toFixed(2)}</span>
          </div>
          <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span>Discount</span>
            <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>-TSH {discount.toFixed(2)}</span>
          </div>
          <div className={`h-px ${darkMode ? 'bg-dark-border' : 'bg-gray-200'} my-2`}></div>
          <div className="flex justify-between font-bold">
            <span className={`text-base ${darkMode ? 'text-white' : ''}`}>Total</span>
            <span className={`text-base ${darkMode ? 'text-primary-400' : 'text-primary-700'}`}>TSH {total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          disabled={items.length === 0}
          className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
            items.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow'
          }`}
        >
          <span>Continue to Payment</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  darkMode: PropTypes.bool
};

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  orderCode: PropTypes.string.isRequired,
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  onBack: PropTypes.func
};

export default Cart; 