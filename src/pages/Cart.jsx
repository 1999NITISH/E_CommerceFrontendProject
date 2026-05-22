import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your SmartCart is empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Check today's deals or continue shopping.</p>
        <Link to="/products" className="bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-4">
            <div className="hidden sm:grid grid-cols-6 gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 text-gray-500 text-sm font-medium">
              <div className="col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Subtotal</div>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center py-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                <div className="col-span-1 sm:col-span-3 flex items-center">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 h-24 bg-gray-50 dark:bg-gray-700 rounded-md p-2 mr-4">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
                  </Link>
                  <div>
                    <Link to={`/product/${item.id}`} className="text-base font-medium text-gray-900 dark:text-white hover:text-amazon-orange line-clamp-2">
                      {item.title}
                    </Link>
                    <p className="text-sm text-green-600 mt-1">In Stock</p>
                  </div>
                </div>

                <div className="text-lg font-bold text-gray-900 dark:text-white sm:text-center mt-2 sm:mt-0">
                  ${item.price.toFixed(2)}
                </div>

                <div className="flex items-center sm:justify-center mt-2 sm:mt-0">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-gray-900 dark:text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between sm:block text-right mt-4 sm:mt-0">
                  <span className="sm:hidden font-medium">Subtotal: </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="sm:hidden ml-4 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                
                {/* Desktop remove button */}
                <div className="hidden sm:block col-span-6 text-right mt-2">
                   <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline inline-flex items-center"
                  >
                    <Trash2 size={14} className="mr-1"/> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Items ({getCartCount()}):</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Total before tax:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax to be collected:</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 mb-4" />

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Order total:</span>
              <span className="text-2xl font-bold text-red-700 dark:text-red-500">
                ${(getCartTotal() * 1.08).toFixed(2)}
              </span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-full transition-colors shadow-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
