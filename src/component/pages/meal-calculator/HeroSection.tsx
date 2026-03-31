'use client';

import React from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden mb-10 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 -right-32 w-96 h-96 bg-emerald-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg mb-6">
            <Calculator className="w-4 h-4 text-emerald-300" />
            <span className="text-emerald-100 text-sm font-semibold tracking-wide">Premium Meal Management System</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Meal{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Effortlessly track meals, manage expenses, and maintain perfect financial records for your mess
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 mb-10">
            <button 
              onClick={() => document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-600 font-bold rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 text-base"
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 32L48 42.7C96 53.3 192 74.7 288 80C384 85.3 480 74.7 576 64C672 53.3 768 42.7 864 48C960 53.3 1056 74.7 1152 80C1248 85.3 1344 74.7 1392 69.3L1440 64V80H0V32Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}