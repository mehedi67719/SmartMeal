'use client';

import { RegisterPageData } from '@/Types/registerpagetype';
import React, { useState } from 'react';

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

  return (
    <div className="h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center p-2 overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md relative z-10 h-auto max-h-[98vh] overflow-y-auto scrollbar-hide">
        <div className="backdrop-blur-xl bg-white/90 border border-white/40 rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 px-6 py-5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-black text-white drop-shadow-lg">
                SmartMeal
              </h2>
              <p className="text-emerald-100 text-xs font-semibold mt-1">
                Join the Smart Meal Community
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={`w-full px-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                  errors.name
                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                }`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                className={`w-full px-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                  errors.email
                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
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
              <div className="space-y-2 animate-fadeIn">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Mess Name
                  </label>
                  <input
                    type="text"
                    name="messName"
                    placeholder="Your mess name"
                    className={`w-full px-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                      errors.messName
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                    }`}
                    value={formData.messName}
                    onChange={handleChange}
                  />
                  {errors.messName && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.messName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-10V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2h8z" />
                    </svg>
                    Secret Code
                  </label>
                  <input
                    type="text"
                    name="messSecretCode"
                    placeholder="Enter security code"
                    className={`w-full px-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                      errors.messSecretCode
                        ? 'border-red-400 bg-red-50 focus:border-red-500'
                        : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                    }`}
                    value={formData.messSecretCode}
                    onChange={handleChange}
                  />
                  {errors.messSecretCode && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.messSecretCode}</p>}
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-10V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2h8z" />
                </svg>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create strong password"
                className={`w-full px-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                  errors.password
                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                }`}
                value={formData.password}
                onChange={handleChange}
              />
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
              <label className="text-xs font-bold text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                className={`w-full px-3 py-2.5 rounded-xl border-2 transition-all duration-200 focus:outline-none text-sm ${
                  errors.confirmPassword
                    ? 'border-red-400 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-gray-50/50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200'
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs font-semibold">⚠️ {errors.confirmPassword}</p>}
            </div>

            <label className="flex items-start gap-2 p-2.5 bg-gradient-to-r from-emerald-50 to-cyan-50 border-2 border-emerald-200 rounded-xl cursor-pointer hover:border-emerald-400 transition-all duration-200">
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
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

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes shimmer {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
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