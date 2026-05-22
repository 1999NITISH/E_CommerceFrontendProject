import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success('Added to Cart!');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (isInWishlist(product.id)) {
      toast.success('Removed from Wishlist');
    } else {
      toast.success('Added to Wishlist');
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700 overflow-hidden relative group"
    >
      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm z-10">
          -{Math.round(product.discountPercentage)}%
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-500 hover:text-red-500 hover:bg-white dark:hover:bg-gray-700 transition-colors z-10"
      >
        <Heart size={20} className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} />
      </button>

      <Link to={`/product/${product.id}`} className="flex-grow flex flex-col">
        {/* Image */}
        <div className="h-48 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4 overflow-hidden">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 capitalize">
            {product.category}
          </div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 flex-grow hover:text-amazon-orange transition-colors">
            {product.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300 dark:text-gray-600"} 
                />
              ))}
            </div>
            <span className="text-xs text-amazon-blue dark:text-blue-400 ml-1 hover:underline">
              {product.rating}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline mb-3">
            <span className="text-xs align-top mr-0.5">$</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {Math.floor(product.price)}
            </span>
            <span className="text-xs align-top">
              {(product.price % 1).toFixed(2).substring(1)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-500 line-through ml-2">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full mt-auto bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-full text-sm transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
