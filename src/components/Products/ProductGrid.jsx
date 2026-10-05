import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../context/ThemeContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`${darkMode ? 'bg-dark-card border-dark-border hover:shadow-md shadow-gray-800/10' : 'bg-white border-gray-100 hover:shadow-md'} border rounded-xl shadow-sm p-3 sm:p-4 transition-all duration-200 flex flex-col h-full group`}>
      <div className={`relative aspect-square mb-3 ${darkMode ? 'bg-dark-hover' : 'bg-gray-50'} rounded-lg flex items-center justify-center overflow-hidden ${darkMode ? 'group-hover:bg-gray-800' : 'group-hover:bg-gray-100'} transition-colors`}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-2 transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'} text-base sm:text-lg mb-1 line-clamp-1`}>{product.name}</h3>
        <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3 line-clamp-2 flex-1`}>{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className={`text-base sm:text-lg font-bold ${darkMode ? 'text-primary-400' : 'text-primary-700'}`}>TSH {product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className={`p-2 ${darkMode ? 'bg-dark-hover text-primary-400 hover:bg-gray-800' : 'bg-primary-100 text-primary-600 hover:bg-primary-200'} hover:scale-110 rounded-full transition-all duration-200 shadow-sm`}
            aria-label={`Add ${product.name} to cart`}
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
                strokeWidth={1.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = ({ products, onAddToCart }) => {
  const { darkMode } = useTheme();
  
  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <div className={`w-20 h-20 mx-auto mb-4 ${darkMode ? 'bg-dark-hover' : 'bg-gray-50'} rounded-full flex items-center justify-center`}>
          <svg
            className={`w-10 h-10 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>No products found</p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try selecting a different category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductGrid; 