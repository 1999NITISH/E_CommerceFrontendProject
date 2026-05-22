import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    login({ name: formData.name, email: formData.email });
    toast.success('Account created successfully!');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amazon-blue/20 dark:bg-amazon-blue/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amazon-orange/20 dark:bg-amazon-orange/10 blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-4 border border-gray-100 dark:border-gray-700">
            <UserPlus className="text-amazon-orange w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join SmartCart today for exclusive deals
          </p>
        </div>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name Input */}
            <div className="relative">
              <input 
                type="text" 
                name="name"
                id="name"
                required 
                className="peer w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-amazon-orange focus:ring-0 transition-colors placeholder-transparent"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
              />
              <label 
                htmlFor="name" 
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-amazon-orange bg-white dark:bg-gray-800 px-1 rounded-sm"
                style={{ backgroundColor: focusedInput === 'name' || formData.name ? 'inherit' : 'transparent' }}
              >
                Full Name
              </label>
            </div>

            {/* Email Input */}
            <div className="relative">
              <input 
                type="email" 
                name="email"
                id="email"
                required 
                className="peer w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-amazon-orange focus:ring-0 transition-colors placeholder-transparent"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
              <label 
                htmlFor="email" 
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-amazon-orange bg-white dark:bg-gray-800 px-1 rounded-sm"
                style={{ backgroundColor: focusedInput === 'email' || formData.email ? 'inherit' : 'transparent' }}
              >
                Email Address
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                id="password"
                required 
                minLength="6"
                className="peer w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-amazon-orange focus:ring-0 transition-colors placeholder-transparent pr-12"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
              <label 
                htmlFor="password" 
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-amazon-orange bg-white dark:bg-gray-800 px-1 rounded-sm"
                style={{ backgroundColor: focusedInput === 'password' || formData.password ? 'inherit' : 'transparent' }}
              >
                Password
              </label>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-amazon-orange transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                name="confirmPassword"
                id="confirmPassword"
                required 
                className="peer w-full px-4 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-amazon-orange focus:ring-0 transition-colors placeholder-transparent pr-12"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput(null)}
              />
              <label 
                htmlFor="confirmPassword" 
                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-amazon-orange bg-white dark:bg-gray-800 px-1 rounded-sm"
                style={{ backgroundColor: focusedInput === 'confirmPassword' || formData.confirmPassword ? 'inherit' : 'transparent' }}
              >
                Confirm Password
              </label>
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-amazon-orange transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-gray-900 bg-amazon-orange hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazon-orange transition-all duration-200 mt-2"
            >
              Register
            </motion.button>
          </form>

          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-6">
            By creating an account, you agree to SmartCart's Conditions of Use.
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-amazon-blue hover:text-amazon-orange transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
