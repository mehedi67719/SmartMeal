'use client';

import React, { useState } from 'react';
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaUtensils, FaHamburger, FaPizzaSlice, FaFish, FaLeaf, FaCookie } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        // console.log(result);

    };

    const foodIcons = [
        { Icon: FaHamburger, left: '15%', top: '20%', delay: '0s' },
        { Icon: FaPizzaSlice, left: '85%', top: '30%', delay: '2s' },
        { Icon: FaFish, left: '10%', top: '70%', delay: '4s' },
        { Icon: FaLeaf, left: '90%', top: '80%', delay: '6s' },
        { Icon: FaCookie, left: '50%', top: '50%', delay: '8s' },
    ];

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {foodIcons.map((item, index) => (
                    <div
                        key={index}
                        className="absolute animate-float"
                        style={{
                            left: item.left,
                            top: item.top,
                            animationDelay: item.delay,
                            opacity: 0.05,
                        }}
                    >
                        <item.Icon className="w-16 h-16 text-emerald-600" />
                    </div>
                ))}
            </div>

            <div className="w-full max-w-4xl relative z-10">
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
                                            className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200 transition-all duration-200 focus:outline-none text-sm"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
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
                                            className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200 transition-all duration-200 focus:outline-none text-sm"
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
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white font-bold text-sm rounded-xl hover:from-emerald-700 hover:via-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                                >
                                    <FiLogIn className="w-4 h-4" />
                                    Sign In
                                </button>

                                <p className="text-center text-gray-600 text-xs font-medium pt-2">
                                    Don't have an account?{' '}
                                    <a href="/register" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                                        Create Account
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;