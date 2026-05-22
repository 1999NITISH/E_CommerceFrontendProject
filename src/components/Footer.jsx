import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-amazon text-gray-300 mt-auto">
      {/* Back to top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 text-sm transition-colors"
      >
        Back to top
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Blog</Link></li>
              <li><Link to="#" className="hover:underline">About SmartCart</Link></li>
              <li><Link to="#" className="hover:underline">Investor Relations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Make Money with Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Sell products on SmartCart</Link></li>
              <li><Link to="#" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="#" className="hover:underline">Advertise Your Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">SmartCart Payment Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Business Card</Link></li>
              <li><Link to="#" className="hover:underline">Shop with Points</Link></li>
              <li><Link to="#" className="hover:underline">Reload Your Balance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Let Us Help You</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:underline">Your Account</Link></li>
              <li><Link to="#" className="hover:underline">Your Orders</Link></li>
              <li><Link to="#" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link to="#" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link to="#" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-2xl font-bold tracking-tighter text-white">Smart<span className="text-amazon-orange">Cart</span></span>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} SmartCart.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
