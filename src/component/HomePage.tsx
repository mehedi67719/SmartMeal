'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Utensils, 
  Users, 
  CreditCard, 
  Calendar, 
  Shield, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Coffee,
  UserPlus,
  Sun,
  Moon,
  Zap,
  Award,
  Globe,
  Smartphone,
  BarChart3,
  Sparkles,
  ChevronRight,
  Leaf,
  Crown,
  Infinity,
  Rocket,
  Heart
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Users,
      title: 'Member Management',
      description: 'Easy management of mess members with role-based access control',
      color: 'from-emerald-500 to-emerald-700',
      bgColor: 'bg-emerald-50',
      stat: '500+ Members'
    },
    {
      icon: Calendar,
      title: 'Daily Meal Tracking',
      description: 'Track breakfast, lunch, and dinner meals with simple interface',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-green-50',
      stat: '1M+ Meals'
    },
    {
      icon: CreditCard,
      title: 'Payment System',
      description: 'Secure payment tracking with due calculation and verification',
      color: 'from-teal-500 to-emerald-600',
      bgColor: 'bg-teal-50',
      stat: '99% Accuracy'
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Protected routes and role-based access for security',
      color: 'from-emerald-600 to-green-600',
      bgColor: 'bg-emerald-50',
      stat: 'Bank Level'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Reports',
      description: 'Detailed reports for meal consumption and payments',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      stat: 'Real-time'
    },
    {
      icon: CheckCircle,
      title: 'Easy Registration',
      description: 'Simple signup process for members and controllers',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-teal-50',
      stat: '2 Min Setup'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Messes', icon: Users, suffix: '+', gradient: 'from-emerald-400 to-green-500' },
    { number: '50K+', label: 'Happy Users', icon: Star, suffix: 'K+', gradient: 'from-emerald-500 to-teal-500' },
    { number: '1M+', label: 'Meals Tracked', icon: Utensils, suffix: 'M+', gradient: 'from-green-500 to-emerald-600' },
    { number: '99%', label: 'Satisfaction', icon: Award, suffix: '%', gradient: 'from-emerald-600 to-teal-600' }
  ];

  const steps = [
    {
      icon: UserPlus,
      title: 'Create Account',
      description: 'Sign up as Member or Controller in seconds',
      step: '01',
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: Utensils,
      title: 'Join or Create Mess',
      description: 'Join existing mess or create your own',
      step: '02',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Calendar,
      title: 'Track Meals',
      description: 'Record daily meals with just one click',
      step: '03',
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      icon: CreditCard,
      title: 'Manage Payments',
      description: 'Handle payments and track dues easily',
      step: '04',
      gradient: 'from-teal-500 to-emerald-500'
    }
  ];

  const testimonials = [
    {
      name: 'Rakib Hasan',
      role: 'Mess Manager',
      content: 'SmartMeal has revolutionized how we manage our mess. The meal tracking system is fantastic!',
      rating: 5,
      image: 'https://ui-avatars.com/api/?background=10b981&color=fff&name=Rakib+Hasan'
    },
    {
      name: 'Fatema Akter',
      role: 'Student',
      content: 'Easy to use and very helpful for tracking daily meals and payments. Highly recommended!',
      rating: 5,
      image: 'https://ui-avatars.com/api/?background=10b981&color=fff&name=Fatema+Akter'
    },
    {
      name: 'Karim Uddin',
      role: 'Controller',
      content: 'Best mess management platform. The reporting feature saves so much time.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?background=10b981&color=fff&name=Karim+Uddin'
    }
  ];

  const benefits = [
    { icon: Zap, title: 'Lightning Fast', description: 'Quick meal tracking and updates', color: 'from-yellow-500 to-orange-500' },
    { icon: Smartphone, title: 'Mobile Ready', description: 'Fully responsive design', color: 'from-emerald-500 to-green-500' },
    { icon: BarChart3, title: 'Smart Reports', description: 'Real-time analytics dashboard', color: 'from-teal-500 to-emerald-600' },
    { icon: Sparkles, title: 'AI Powered', description: 'Smart meal recommendations', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900 min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6 border border-white/20">
              <Crown className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-100 text-sm font-semibold">#1 Mess Management Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Manage Your Mess{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                Smartly & Easily
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-emerald-100 max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
              Track meals, manage payments, and streamline your mess operations with our all-in-one platform. Join thousands of satisfied users.
            </p>
            
            <div className="flex flex-col mb-10 sm:flex-row gap-4 justify-center items-center px-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-green-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-base sm:text-lg"
              >
                Get Started Free
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/meal-calculator"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all hover:shadow-lg text-base sm:text-lg"
              >
                View Meal Calculator
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>

            
            <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6 px-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r ${benefit.color} rounded-full flex items-center justify-center`}>
                    <benefit.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-xs font-semibold text-white">{benefit.title}</p>
                    <p className="text-[10px] sm:text-xs text-emerald-200">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 80C384 85.3 480 74.7 576 64C672 53.3 768 42.7 864 48C960 53.3 1056 74.7 1152 80C1248 85.3 1344 74.7 1392 69.3L1440 64V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="white"/>
          </svg>
        </div>
      </section>

      
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 sm:px-4 py-2 rounded-full mb-4">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-xs sm:text-sm font-semibold">Powerful Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose SmartMeal?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your mess efficiently in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 hover:-translate-y-2"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bgColor} rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">{feature.description}</p>
                <div className="inline-block px-2 sm:px-3 py-1 bg-emerald-50 rounded-full text-[10px] sm:text-xs font-semibold text-emerald-600">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-xs sm:text-sm font-semibold">Our Impact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Join the growing community of SmartMeal users
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-xl`}>
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 sm:px-4 py-2 rounded-full mb-4">
                <Infinity className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 text-xs sm:text-sm font-semibold">Simple Process</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10">
                Get started in 4 simple steps
              </p>
              <div className="space-y-6 sm:space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 sm:gap-5 group">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-emerald-600 text-xs sm:text-sm font-bold mb-1">Step {step.step}</div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-emerald-100">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-2 text-[10px] sm:text-sm text-gray-400 font-mono">meal-tracker</div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { icon: Coffee, name: 'Breakfast', meals: 2, color: 'bg-orange-100', textColor: 'text-orange-600' },
                    { icon: Sun, name: 'Lunch', meals: 3, color: 'bg-yellow-100', textColor: 'text-yellow-600' },
                    { icon: Moon, name: 'Dinner', meals: 2, color: 'bg-purple-100', textColor: 'text-purple-600' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 sm:p-4 rounded-xl hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                          <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.textColor}`} />
                        </div>
                        <span className="text-sm sm:text-base font-semibold text-gray-900">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-gray-900">{item.meals}</span>
                        <span className="text-xs sm:text-sm text-gray-500">meals</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-emerald-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base font-semibold text-gray-900">Total Today</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-600">7 meals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-xs sm:text-sm font-semibold">Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-emerald-500" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-emerald-600 font-semibold text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070')] bg-cover bg-center opacity-5"></div>
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
                Join thousands of users who are already managing their mess smartly with SmartMeal
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-emerald-600 font-bold rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl text-sm sm:text-base lg:text-lg"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;