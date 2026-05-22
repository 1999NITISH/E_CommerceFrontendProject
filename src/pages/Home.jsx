import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(8, 0),
          getCategories()
        ]);
        setFeaturedProducts(productsData.products);
        setCategories(categoriesData.slice(0, 4)); // Only show top 4 categories
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-10">
      {/* Hero Section */}
      <div className="relative bg-amazon-light text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amazon-light to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero" 
          className="w-full h-[300px] md:h-[400px] object-cover opacity-50"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Welcome to Smart<span className="text-amazon-orange">Cart</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl mb-6 max-w-lg"
          >
            Discover millions of products with fast delivery and great prices.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/products" className="bg-amazon-orange hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full transition-colors inline-block">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 h-64 rounded-lg shadow-md animate-pulse p-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              </div>
            ))
          ) : (
            categories.map((cat, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize mb-4">{cat.name}</h2>
                <div className="flex-grow bg-gray-100 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center p-4">
                  {/* Dummy placeholder for category image */}
                  <span className="text-4xl">🛍️</span>
                </div>
                <Link to={`/products?category=${cat.slug}`} className="text-amazon-blue dark:text-blue-400 hover:text-amazon-orange hover:underline text-sm font-medium">
                  Shop now
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Featured Products */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              ))
            ) : (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
