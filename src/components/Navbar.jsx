import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-amazon-light text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tighter text-white">Smart<span className="text-amazon-orange">Cart</span></span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-8">
            <form onSubmit={handleSearch} className="w-full flex">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-amazon-orange hover:bg-yellow-500 text-gray-900 rounded-r-md transition-colors">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={toggleTheme} className="hover:text-amazon-orange transition-colors">
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Account & Lists Hover Dropdown */}
            <div className="relative group h-full flex items-center">
              {isAuthenticated ? (
                <Link to="/dashboard" className="flex flex-col items-start hover:text-amazon-orange transition-colors py-4">
                  <span className="text-xs text-gray-300">Hello, {user?.name?.split(' ')[0] || 'User'}</span>
                  <span className="text-sm font-bold">Account & Lists</span>
                </Link>
              ) : (
                <Link to="/login" className="flex flex-col items-start hover:text-amazon-orange transition-colors py-4">
                  <span className="text-xs text-gray-300">Hello, sign in</span>
                  <span className="text-sm font-bold">Account & Lists</span>
                </Link>
              )}

              {/* The Dropdown Panel */}
              <div className="absolute top-full right-[-20px] w-64 pt-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                <div className="bg-white dark:bg-gray-800 rounded-md shadow-2xl border border-gray-200 dark:border-gray-700 p-4 relative mt-1">
                  {/* Triangle Pointer */}
                  <div className="absolute top-0 right-[40px] w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45 -translate-y-1/2 border-l border-t border-gray-200 dark:border-gray-700 z-10"></div>
                  
                  {!isAuthenticated ? (
                    <div className="flex flex-col items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-3 relative z-20">
                      <Link to="/login" className="w-full bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md text-center mb-2 shadow-sm">
                        Sign in
                      </Link>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        New customer? <Link to="/register" className="text-amazon-blue hover:text-amazon-orange hover:underline font-medium">Start here.</Link>
                      </p>
                    </div>
                  ) : (
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-3 text-center relative z-20">
                      <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">Who's shopping? {user?.name?.split(' ')[0]}</p>
                      <Link to="/dashboard" className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline">Manage Profiles</Link>
                    </div>
                  )}

                  <div className="flex flex-col space-y-2 relative z-20">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">Your Account</h3>
                    <Link to="/dashboard" className="text-sm text-gray-700 dark:text-gray-300 hover:text-amazon-orange hover:underline">Dashboard</Link>
                    <Link to="/wishlist" className="text-sm text-gray-700 dark:text-gray-300 hover:text-amazon-orange hover:underline">Your Wishlist</Link>
                    <Link to="/dashboard" className="text-sm text-gray-700 dark:text-gray-300 hover:text-amazon-orange hover:underline">Your Orders</Link>
                    
                    {isAuthenticated && (
                      <button onClick={logout} className="text-sm text-left text-gray-700 dark:text-gray-300 hover:text-red-500 hover:underline mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/wishlist" className="relative hover:text-amazon-orange transition-colors">
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amazon-orange text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative flex items-end hover:text-amazon-orange transition-colors">
              <ShoppingCart size={28} />
              <span className="text-sm font-bold ml-1">Cart</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 left-4 bg-amazon-orange text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-white">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amazon-orange text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amazon-light pb-4 px-4 border-t border-gray-700">
          <form onSubmit={handleSearch} className="flex mt-4 mb-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 text-gray-900 rounded-l-md focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-amazon-orange text-gray-900 rounded-r-md">
              <Search size={20} />
            </button>
          </form>
          <div className="flex flex-col space-y-4">
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-amazon-orange">All Products</Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-amazon-orange">Wishlist ({wishlist.length})</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-amazon-orange">Dashboard</Link>
                <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-left text-white hover:text-amazon-orange">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-amazon-orange">Login / Register</Link>
            )}
            <button onClick={toggleTheme} className="flex items-center text-white hover:text-amazon-orange">
              {theme === 'dark' ? <><Sun size={20} className="mr-2"/> Light Mode</> : <><Moon size={20} className="mr-2"/> Dark Mode</>}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
