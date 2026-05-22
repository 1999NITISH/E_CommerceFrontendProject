import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Package, User, Heart, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/dashboard" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <Link to="#" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-start hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
          <Package size={48} className="text-amazon-orange mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">Your Orders</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track, return, or buy things again</p>
          </div>
        </Link>

        <Link to="#" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-start hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
          <User size={48} className="text-amazon-orange mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">Login & Security</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Edit login, name, and mobile number</p>
          </div>
        </Link>

        <Link to="/wishlist" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-start hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
          <Heart size={48} className="text-amazon-orange mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-1">Your Lists</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">View, modify, and share your lists</p>
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 col-span-1 md:col-span-2 lg:col-span-3 mt-8">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Profile Information</h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {new Date().toLocaleDateString()}</p>
            <button onClick={logout} className="mt-4 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md transition-colors font-medium">
              Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
