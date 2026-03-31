'use client';

import React, { useState } from 'react';
import { FiMail, FiLock, FiLogIn, FiFacebook, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaUtensils, FaHamburger, FaPizzaSlice, FaFish, FaLeaf, FaCookie } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (errors[name as keyof typeof formData]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Login Data:', { 
        email: formData.email, 
        password: formData.password,
        rememberMe: formData.rememberMe 
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const foodIcons = [FaHamburger, FaPizzaSlice, FaFish, FaLeaf, FaCookie];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {foodIcons.map((Icon, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 2}s`,
              opacity: 0.08,
            }}
          >
            <Icon className="w-16 h-16 text-gray-400" />
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="backdrop-blur-xl bg-white/95 border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 flex flex-col justify-center items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUtensils className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">SmartMeal</h2>
                  <p className="text-gray-300 text-sm">Delicious meals, smart choices</p>
                </div>
                
                <div className="space-y-4 mt-8">
                  <div className="flex items-center justify-center gap-3">
                    <FaHamburger className="w-8 h-8 text-gray-300" />
                    <FaPizzaSlice className="w-8 h-8 text-gray-300" />
                    <FaFish className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-300 text-sm">
                    Join thousands of food lovers who trust SmartMeal for their daily dining needs
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {['Fresh', 'Healthy', 'Tasty', 'Quick'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Welcome Back!</h3>
                <p className="text-gray-600 text-sm mt-1">Sign in to continue to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <FiMail className="w-3 h-3" />
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                        errors.email
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-200 bg-gray-50 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-200'
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <FiLock className="w-3 h-3" />
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                        errors.password
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-200 bg-gray-50 focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-200'
                      }`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="w-4 h-4 accent-gray-600 cursor-pointer"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="text-xs text-gray-700 font-medium">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-xs text-gray-600 font-bold hover:text-gray-800 transition-colors">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white font-bold text-sm rounded-xl hover:from-gray-900 hover:via-black hover:to-gray-900 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-gray-500/30"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <FiLogIn className="w-4 h-4" />
                      Sign In
                    </>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white/95 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="py-2.5 px-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <FcGoogle className="w-4 h-4" />
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900">Google</span>
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <FiFacebook className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900">Facebook</span>
                  </button>
                </div>

                <p className="text-center text-gray-600 text-xs font-medium pt-2">
                  Don't have an account?{' '}
                  <a href="/register" className="text-gray-800 font-bold hover:text-black transition-colors">
                    Create Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;