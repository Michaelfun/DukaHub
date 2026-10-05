import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import ProductGrid from '../components/Products/ProductGrid';
import Cart from '../components/Cart/Cart';
import { products } from '../data/products';
import { FaShoppingCart, FaTools, FaBolt, FaTint, FaPaintRoller, FaLeaf, FaListAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const POS = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderCode, setOrderCode] = useState('ORD' + Date.now().toString().slice(-8));
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showCart, setShowCart] = useState(false);
  const [isMobileCartVisible, setIsMobileCartVisible] = useState(false);
  const { darkMode } = useTheme();

  const categories = [
    { id: 'all', name: 'All', icon: <FaListAlt /> },
    { id: 'tools', name: 'Tools', icon: <FaTools /> },
    { id: 'electrical', name: 'Electrical', icon: <FaBolt /> },
    { id: 'plumbing', name: 'Plumbing', icon: <FaTint /> },
    { id: 'paint', name: 'Paint', icon: <FaPaintRoller /> },
    { id: 'garden', name: 'Garden', icon: <FaLeaf /> },
  ];

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    // On mobile, automatically show cart when adding an item
    if (window.innerWidth < 768) {
      setShowCart(true);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.1; // 10% tax
    const discount = 0; // Implement discount logic as needed
    return { subtotal, tax, discount };
  };

  const handleCheckout = () => {
    // Generate receipt content
    const { subtotal, tax, discount } = calculateTotals();
    const total = subtotal + tax - discount;
    
    // Create a hidden iframe for printing
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);
    
    // Generate receipt content optimized for 80mm thermal printer
    printFrame.contentDocument.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Receipt - ${orderCode}</title>
          <style>
            @page {
              size: 80mm auto;
              margin: 0mm;
            }
            body {
              font-family: 'Courier New', monospace;
              width: 76mm;
              padding: 2mm;
              margin: 0;
              font-size: 12px;
              line-height: 1.2;
            }
            .header {
              text-align: center;
              margin-bottom: 10px;
            }
            .store-name {
              font-size: 18px;
              font-weight: bold;
              margin: 5px 0;
            }
            .store-info {
              font-size: 11px;
              margin-bottom: 5px;
            }
            .title {
              font-size: 14px;
              font-weight: bold;
              margin: 10px 0;
              text-align: center;
              border-bottom: 1px dashed #000;
              padding-bottom: 5px;
            }
            .info {
              margin: 10px 0;
              display: flex;
              flex-direction: column;
              gap: 3px;
            }
            .divider {
              border-bottom: 1px dashed #000;
              margin: 5px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              margin: 5px 0;
            }
            .item-name {
              flex: 2;
            }
            .item-qty {
              flex: 0.5;
              text-align: center;
            }
            .item-price {
              flex: 1;
              text-align: right;
            }
            .totals {
              margin-top: 10px;
              text-align: right;
            }
            .total-row {
              display: flex;
              justify-content: space-between;
              margin: 3px 0;
            }
            .grand-total {
              font-weight: bold;
              font-size: 14px;
              margin-top: 5px;
              border-top: 1px dashed #000;
              padding-top: 5px;
            }
            .footer {
              margin-top: 15px;
              text-align: center;
              font-size: 11px;
            }
            .logo {
              font-size: 20px;
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🏪</div>
            <div class="store-name">DukaHUB</div>
            <div class="store-info">123 Main Street, Mbeya</div>
            <div class="store-info">Tel: +255 745 888 937</div>
          </div>
          
          <div class="title">SALES RECEIPT</div>
          
          <div class="info">
            <div>Order: #${orderCode}</div>
            <div>Date: ${new Date().toLocaleString()}</div>
            <div>Cashier: Admin</div>
          </div>
          
          <div class="divider"></div>
          
          <div class="item" style="font-weight: bold;">
            <div class="item-name">Item</div>
            <div class="item-qty">Qty</div>
            <div class="item-price">Amount</div>
          </div>
          
          <div class="divider"></div>
          
          ${cartItems.map(item => `
            <div class="item">
              <div class="item-name">${item.name}</div>
              <div class="item-qty">${item.quantity}</div>
              <div class="item-price">TSH ${(item.quantity * item.price).toFixed(2)}</div>
            </div>
            <div style="font-size: 10px; color: #666; margin-left: 5px;">TSH ${item.price.toFixed(2)} each</div>
          `).join('')}
          
          <div class="divider"></div>
          
          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>TSH ${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Tax (10%):</span>
              <span>TSH ${tax.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Discount:</span>
              <span>TSH ${discount.toFixed(2)}</span>
            </div>
            <div class="total-row grand-total">
              <span>TOTAL:</span>
              <span>TSH ${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="footer">
            <div class="divider"></div>
            <p>Thank you for shopping with us!</p>
            <p>Goods once sold cannot be returned</p>
            <p>Powered by TZ-POS System</p>
          </div>
        </body>
      </html>
    `);
    
    // Print the iframe content and remove it after printing
    printFrame.contentWindow.onafterprint = function() {
      document.body.removeChild(printFrame);
      
      // Log checkout data
      console.log('Proceeding to checkout:', {
        orderCode,
        items: cartItems,
        ...calculateTotals(),
      });
      
      // Reset cart data
      setCartItems([]);
      // Generate new order code without refreshing
      setOrderCode('ORD' + Date.now().toString().slice(-8));
    };
    
    // Trigger print
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();
  };

  // Cart item count badge
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileCart = () => {
    setIsMobileCartVisible(!isMobileCartVisible);
  };

  return (
    <Layout title="Point of Sale">
      <div className="relative min-h-[calc(100vh-64px)] flex flex-col">
        {/* Mobile cart toggle button (only visible on mobile) */}
        <button
          onClick={toggleMobileCart}
          className="fixed bottom-6 right-6 z-30 lg:hidden w-14 h-14 rounded-full bg-primary-600 text-white shadow-lg flex items-center justify-center"
        >
          <FaShoppingCart className="text-xl" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Sticky category header */}
        <div className={`sticky top-0 z-20 pt-2 pb-4 ${darkMode ? 'bg-dark-bg' : 'bg-gray-50'}`}>
          <div className="overflow-x-auto scrollbar-thin">
            <div className="flex space-x-2 min-w-max pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : darkMode
                      ? 'bg-dark-card text-gray-300 hover:bg-dark-hover'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  } shadow-sm`}
                >
                  <span className="mr-2">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Scrollable products area */}
          <div className="w-full lg:w-3/4 xl:w-4/5 overflow-y-auto h-[calc(100vh-150px)] pb-20 pr-0 lg:pr-4">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>

          {/* Cart section */}
          <div className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 h-full sticky top-0">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
              onCheckout={handleCheckout}
              orderCode={orderCode}
              subtotal={calculateTotals().subtotal}
              tax={calculateTotals().tax}
              discount={calculateTotals().discount}
              onBack={() => setIsMobileCartVisible(false)}
            />
          </div>
        </div>
        
        {/* Mobile Cart View - only shown when toggled */}
        {isMobileCartVisible && (
          <div className="lg:hidden">
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
              onCheckout={handleCheckout}
              orderCode={orderCode}
              subtotal={calculateTotals().subtotal}
              tax={calculateTotals().tax}
              discount={calculateTotals().discount}
              onBack={() => setIsMobileCartVisible(false)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default POS; 