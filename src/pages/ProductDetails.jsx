import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Truck, ShieldCheck, ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
        setMainImage(data.images[0]);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-96 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 text-2xl">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-900">
      <Link to="/products" className="inline-flex items-center text-sm text-amazon-blue dark:text-blue-400 hover:text-amazon-orange mb-6">
        <ArrowLeft size={16} className="mr-1" /> Back to results
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Images Section */}
        <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[500px] w-full md:w-20 flex-shrink-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-md overflow-hidden flex-shrink-0 w-16 h-16 ${mainImage === img ? 'border-amazon-orange shadow-md' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain bg-gray-50 dark:bg-gray-800 p-1" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-grow bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
            <img src={mainImage} alt={product.title} className="max-w-full max-h-[500px] object-contain" />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.title}</h1>
          <p className="text-sm text-amazon-blue dark:text-blue-400 mb-4 capitalize">Brand: {product.brand || 'Generic'}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className={i < Math.floor(product.rating) ? "fill-current" : "text-gray-300 dark:text-gray-600"} />
              ))}
            </div>
            <span className="text-sm text-amazon-blue dark:text-blue-400 ml-2">{product.rating} ratings</span>
          </div>

          <hr className="border-gray-200 dark:border-gray-700 mb-4" />

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline">
              {product.discountPercentage > 0 && (
                <span className="text-2xl text-red-500 mr-2">-{Math.round(product.discountPercentage)}%</span>
              )}
              <span className="text-sm align-top mr-1">$</span>
              <span className="text-4xl font-bold text-gray-900 dark:text-white">{Math.floor(product.price)}</span>
              <span className="text-sm align-top">{(product.price % 1).toFixed(2).substring(1)}</span>
            </div>
            {product.discountPercentage > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                Typical price: <span className="line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={() => { addToCart(product); toast.success('Added to Cart!'); }}
              className="flex-1 bg-amazon-yellow hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-full transition-colors flex justify-center items-center"
            >
              <ShoppingCart size={20} className="mr-2" /> Add to Cart
            </button>
            <button 
              onClick={() => {
                toggleWishlist(product);
                toast.success(isInWishlist(product.id) ? 'Removed from Wishlist' : 'Added to Wishlist');
              }}
              className="flex items-center justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Add to Wishlist"
            >
              <Heart size={24} className={isInWishlist(product.id) ? "fill-red-500 text-red-500 border-none" : "text-gray-500"} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
            <div className="flex items-start">
              <Truck size={24} className="text-amazon-orange mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Free Delivery</h4>
                <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />
            <div className="flex items-start">
              <ShieldCheck size={24} className="text-amazon-orange mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Return Delivery</h4>
                <p className="text-sm text-gray-500">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
