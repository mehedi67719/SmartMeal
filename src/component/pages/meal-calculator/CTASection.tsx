'use client';

import React from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden mb-10 rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-green-600 animate-gradient" />
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-white rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-16 sm:px-10 lg:px-20 text-center text-white">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-sm font-medium tracking-wide">
            Limited Time Offer
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          Upgrade Your{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-amber-200 bg-clip-text text-transparent">
            Meal Experience
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-emerald-100 text-base sm:text-lg mb-10">
          Smart tracking, real-time insights, and seamless experience — everything you need in one powerful platform.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="px-4 py-2 text-sm bg-white/10 rounded-full border border-white/20">
            Smart Analytics
          </span>
          <span className="px-4 py-2 text-sm bg-white/10 rounded-full border border-white/20">
            Live Reports
          </span>
          <span className="px-4 py-2 text-sm bg-white/10 rounded-full border border-white/20">
            Secure System
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button className="group relative px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition duration-300" />
            <span className="relative flex items-center gap-2 z-10 group-hover:text-white">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-xl font-medium hover:bg-white/20 transition">
            View Pricing
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-emerald-100">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>4.9 Rating</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Secure Platform</span>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>10K+ Users</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 10s ease infinite;
        }
      `}</style>
    </section>
  );
}