'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Utensils, 
  Users, 
  Target, 
  Eye, 
  Heart, 
  Award,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Shield,
  Rocket,
  Sparkles,
  ChevronRight,
  Quote,
  Leaf,
  TreeDeciduous,
  Flower2,
  Sprout,
  Infinity,
  Crown,
  TrendingUp,
  Coffee,
  Sun,
  Moon,
  Mail
} from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Md. Rakib Hasan',
      role: 'Founder & CEO',
      image: 'https://ui-avatars.com/api/?background=10b981&color=fff&name=Rakib+Hasan',
      bio: 'Visionary leader transforming mess management',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Fatema Akter',
      role: 'CTO',
      image: 'https://ui-avatars.com/api/?background=10b981&color=fff&name=Fatema+Akter',
      bio: 'Tech innovator building scalable solutions',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Karim Uddin',
      role: 'Head of Operations',
      image: 'https://ui-avatars.com/api/?background=10b981&color=fff&name=Karim+Uddin',
      bio: 'Operations expert ensuring excellence',
      social: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sumaiya Khan',
      role: 'Product Manager',
      image: 'https://ui-avatars.com/api/?background=10b981&color=fff&name=Sumaiya+Khan',
      bio: 'Product strategist focused on user experience',
      social: { linkedin: '#', twitter: '#' }
    }
  ];

  const milestones = [
    { year: '2022', title: 'Company Founded', description: 'SmartMeal started with a vision', icon: Sprout, color: 'from-emerald-400 to-green-500' },
    { year: '2023', title: 'First 100 Users', description: 'Reached 100 active mess managers', icon: Users, color: 'from-emerald-500 to-teal-500' },
    { year: '2024', title: '10K Meals Tracked', description: 'Milestone of tracking 10,000 meals', icon: Utensils, color: 'from-green-500 to-emerald-600' },
    { year: '2025', title: 'Global Expansion', description: 'Expanded to multiple countries', icon: Globe, color: 'from-emerald-600 to-teal-600' }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainable Growth',
      description: 'Building lasting solutions for mess management',
      color: 'from-emerald-400 to-green-500',
      stat: 'Eco-Friendly'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data security is our top priority',
      color: 'from-emerald-500 to-teal-500',
      stat: 'Bank-Level Security'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time updates and instant tracking',
      color: 'from-green-500 to-emerald-600',
      stat: '< 1s Response'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize our users needs above all',
      color: 'from-emerald-600 to-teal-600',
      stat: '24/7 Support'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Messes', icon: Users, suffix: '+', gradient: 'from-emerald-400 to-green-500' },
    { number: '50K+', label: 'Happy Users', icon: Star, suffix: 'K+', gradient: 'from-emerald-500 to-teal-500' },
    { number: '1M+', label: 'Meals Tracked', icon: Utensils, suffix: 'M+', gradient: 'from-green-500 to-emerald-600' },
    { number: '99%', label: 'Satisfaction', icon: Award, suffix: '%', gradient: 'from-emerald-600 to-teal-600' }
  ];

  const achievements = [
    { title: 'Best Mess Management Platform', year: '2024', issuer: 'Tech Awards BD', icon: Crown },
    { title: 'Innovation in Food Tech', year: '2023', issuer: 'Digital Innovation Summit', icon: Sparkles },
    { title: 'Top Startup of the Year', year: '2024', issuer: 'Startup Bangladesh', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 mt-10 rounded-full shadow-sm mb-6 border border-white/20">
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-100 text-sm font-semibold">Our Story & Mission</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Revolutionizing{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
                Mess Management
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto mb-10">
              We're on a mission to transform how messes operate, making management effortless, transparent, and sustainable for everyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-green-600 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Join Our Journey
                <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all hover:shadow-lg"
              >
                Contact Us
                <Mail className="w-4 h-4" />
              </Link>
            </div>

            
            <div className="mt-20 flex flex-wrap justify-center gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-emerald-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L48 42.7C96 53.3 192 74.7 288 80C384 85.3 480 74.7 576 64C672 53.3 768 42.7 864 48C960 53.3 1056 74.7 1152 80C1248 85.3 1344 74.7 1392 69.3L1440 64V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z" fill="white"/>
          </svg>
        </div>
      </section>

      
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
                <Heart className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 text-sm font-semibold">Our Story</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Born from a{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Need to Simplify
                </span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                SmartMeal was founded in 2022 with a simple vision: to make mess management effortless. 
                We saw how mess managers struggled with manual tracking of meals, payments, and member management.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Today, we've helped over 500 messes streamline their operations, saving countless hours 
                of manual work and reducing errors. Our platform continues to evolve with features that 
                our users truly need.
              </p>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-900">500+ Messes Trust Us</p>
                  <p className="text-sm text-emerald-600">and counting</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-3xl shadow-2xl p-8 border border-emerald-100">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                        <stat.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-emerald-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Countries</span>
                    <span className="font-bold text-emerald-600">5+ Countries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Target className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold">Our Mission & Vision</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our guiding principles for a better future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-emerald-100">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become the world's leading mess management platform, empowering thousands of messes 
                to operate efficiently and provide better service to their members across the globe.
              </p>
              <div className="mt-6 flex items-center gap-2 text-emerald-600">
                <span className="text-sm font-semibold">2030 Goal</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-sm">Global Leader</span>
              </div>
            </div>
            
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-emerald-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To simplify mess management through innovative technology, saving time and reducing 
                administrative burden while providing complete transparency to all members.
              </p>
              <div className="mt-6 flex items-center gap-2 text-emerald-600">
                <span className="text-sm font-semibold">Impact Goal</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-sm">10K Messes by 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold">Core Values</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-2xl p-6 text-center hover:shadow-2xl transition-all hover:-translate-y-2 border border-emerald-100">
                <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 mb-4">{value.description}</p>
                <div className="inline-block px-3 py-1 bg-emerald-100 rounded-full text-xs font-semibold text-emerald-600">
                  {value.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold">Our Journey</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Key Milestones
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Celebrating our growth and achievements
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 via-green-500 to-teal-500 hidden lg:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="flex-1 lg:text-right">
                    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all group border border-emerald-100">
                      <div className={`inline-block px-4 py-1 bg-gradient-to-r ${milestone.color} rounded-full text-white text-sm font-bold mb-3`}>
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-semibold">Recognition</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Awards & Recognition
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-emerald-100">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-emerald-600 font-semibold mb-1">{achievement.year}</p>
                <p className="text-sm text-gray-500">{achievement.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-24 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-100 text-sm font-semibold">Meet the Team</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Behind SmartMeal
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Meet the passionate team making it all possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all text-center hover:-translate-y-2">
                <div className="relative mb-4">
                  <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto border-4 border-emerald-100 group-hover:border-emerald-500 transition-colors" />
                  <div className="absolute bottom-0 right-20 w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="#" className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070')] bg-cover bg-center opacity-5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <Quote className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Mess?
              </h2>
              <p className="text-emerald-100 text-lg mb-8">
                Join thousands of users who are already managing their mess smartly with SmartMeal
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-bold rounded-2xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl text-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
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

export default AboutPage;