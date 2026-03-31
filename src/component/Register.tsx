'use client';

import { RegisterPageData } from '@/Types/registerpagetype';
import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiCheckCircle, FiHome, FiKey } from 'react-icons/fi';
import { FaUtensils, FaHamburger, FaPizzaSlice, FaFish, FaLeaf, FaCookie } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState<RegisterPageData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'member',
    messName: '',
    messSecretCode: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<RegisterPageData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (errors[name as keyof RegisterPageData]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterPageData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (formData.accountType === 'controller' && !formData.messName.trim()) {
      newErrors.messName = 'Mess name is required';
    }
    if (formData.accountType === 'controller' && !formData.messSecretCode.trim()) {
      newErrors.messSecretCode = 'Secret code is required';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log('Form Data:', formData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-orange-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const foodIcons = [FaHamburger, FaPizzaSlice, FaFish, FaLeaf, FaCookie];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {foodIcons.map((Icon, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 2}s`,
              opacity: 0.05,
            }}
          >
            <Icon className="w-16 h-16 text-emerald-600" />
          </div>
        ))}
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 p-8 flex flex-col justify-center items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaUtensils className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">SmartMeal</h2>
                  <p className="text-emerald-100 text-sm">Delicious meals, smart choices</p>
                </div>
                
                <div className="space-y-4 mt-8">
                  <div className="flex items-center justify-center gap-3">
                    <FaHamburger className="w-8 h-8 text-white/80" />
                    <FaPizzaSlice className="w-8 h-8 text-white/80" />
                    <FaFish className="w-8 h-8 text-white/80" />
                  </div>
                  <p className="text-white/90 text-sm">
                    Join thousands of food lovers who trust SmartMeal for their daily dining needs
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {['Fresh', 'Healthy', 'Tasty', 'Quick'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white/20 rounded-full text-xs text-white font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 max-h-[80vh] overflow-y-auto scrollbar-hide">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
                <p className="text-gray-600 text-sm mt-1">Join the SmartMeal community today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <FiUser className="w-3 h-3" />
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                        errors.name
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                      }`}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.name}</p>}
                </div>

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
                          : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <FiUser className="w-3 h-3" />
                    Account Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, accountType: 'member'})}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        formData.accountType === 'member'
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Member
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, accountType: 'controller'})}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        formData.accountType === 'controller'
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Controller
                    </button>
                  </div>
                </div>

                {formData.accountType === 'controller' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <FiHome className="w-3 h-3" />
                        Mess Name
                      </label>
                      <div className="relative">
                        <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          name="messName"
                          placeholder="Your mess name"
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                            errors.messName
                              ? 'border-red-400 bg-red-50 focus:border-red-500'
                              : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                          }`}
                          value={formData.messName}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.messName && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.messName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                        <FiKey className="w-3 h-3" />
                        Secret Code
                      </label>
                      <div className="relative">
                        <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          name="messSecretCode"
                          placeholder="Enter security code"
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                            errors.messSecretCode
                              ? 'border-red-400 bg-red-50 focus:border-red-500'
                              : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                          }`}
                          value={formData.messSecretCode}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.messSecretCode && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.messSecretCode}</p>}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <FiLock className="w-3 h-3" />
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Create strong password"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                        errors.password
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                      }`}
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {formData.password && (
                    <div className="mt-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.password}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <FiLock className="w-3 h-3" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      className={`w-full pl-10 pr-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                        errors.confirmPassword
                          ? 'border-red-400 bg-red-50 focus:border-red-500'
                          : 'border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                      }`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.confirmPassword}</p>}
                </div>

                <label className="flex items-start gap-2 p-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-300 transition-all duration-200">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    className="w-4 h-4 mt-0.5 accent-emerald-600 cursor-pointer flex-shrink-0"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span className="text-xs text-gray-700 font-medium leading-relaxed">
                    I agree to the <span className="text-emerald-600 font-bold">Terms of Service</span> and <span className="text-emerald-600 font-bold">Privacy Policy</span>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.agreeToTerms}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white font-bold text-sm rounded-xl hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-4 h-4" />
                      Create Account
                    </>
                  )}
                </button>

                <p className="text-center text-gray-600 text-xs font-medium">
                  Already have an account?{' '}
                  <a href="/login" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                    Sign In
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Register;