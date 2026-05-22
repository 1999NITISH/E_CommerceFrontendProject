import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  if (cart.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  if (!isAuthenticated && step !== 3) {
    navigate('/login?redirect=/checkout');
    toast.error('Please login to checkout');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for order placement
    setTimeout(() => {
      clearCart();
      setStep(3);
      toast.success('Order placed successfully!');
    }, 1500);
  };

  if (step === 3) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Thank you for shopping with SmartCart. Your order is being processed.
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors"
        >
          View Orders in Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          
          {/* Step 1: Shipping Address */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border-2 ${step === 1 ? 'border-amazon-orange' : 'border-transparent'}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
              Shipping Address
            </h2>
            
            {step === 1 ? (
              <form onSubmit={handleAddressSubmit} className="space-y-4 ml-11">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ZIP Code</label>
                    <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                  </div>
                </div>
                <button type="submit" className="bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-md transition-colors mt-4">
                  Use this address
                </button>
              </form>
            ) : (
              <div className="ml-11 text-gray-600 dark:text-gray-400">
                <p>{formData.fullName}</p>
                <p>{formData.address}, {formData.city} {formData.zipCode}</p>
                <button onClick={() => setStep(1)} className="text-amazon-blue hover:text-amazon-orange text-sm mt-2">Change</button>
              </div>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border-2 ${step === 2 ? 'border-amazon-orange' : 'border-transparent'}`}>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
              Payment Method
            </h2>
            
            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-4 ml-11">
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="mr-3 text-amazon-orange focus:ring-amazon-orange" />
                    <CreditCard size={20} className="mr-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">Credit or Debit Card (Mock)</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="mr-3 text-amazon-orange focus:ring-amazon-orange" />
                    <Truck size={20} className="mr-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">Cash on Delivery</span>
                  </label>
                </div>
                
                {formData.paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 space-y-3">
                    <input type="text" placeholder="Card Number (Dummy)" className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required={formData.paymentMethod === 'card'} />
                    <div className="flex gap-4">
                      <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required={formData.paymentMethod === 'card'} />
                      <input type="text" placeholder="CVC" className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" required={formData.paymentMethod === 'card'} />
                    </div>
                  </div>
                )}
                
                <button type="submit" className="w-full mt-6 bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors text-lg shadow-sm">
                  Place your order
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & handling:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Total before tax:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax:</span>
                <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">Order total:</span>
              <span className="text-2xl font-bold text-red-700 dark:text-red-500">
                ${(getCartTotal() * 1.08).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
