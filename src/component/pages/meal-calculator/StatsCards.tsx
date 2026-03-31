'use client';

import React from 'react';
import { Calculator } from 'lucide-react';

interface StatsCardsProps {
  totalMeals: number;
  totalDeposit: number;
  totalCost: number;
  totalDue: number;
  costPerMeal: number;
  isCalculated: boolean;
  onCalculate: () => void;
}

export default function StatsCards({
  totalMeals,
  totalDeposit,
  totalCost,
  totalDue,
  costPerMeal,
  isCalculated,
  onCalculate,
}: StatsCardsProps) {
  return (
    <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl p-4 text-white shadow-lg">
          <p className="text-xs opacity-90 mb-1">Total Meals</p>
          <p className="text-2xl font-bold">{totalMeals}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white shadow-lg">
          <p className="text-xs opacity-90 mb-1">Total Deposit</p>
          <p className="text-2xl font-bold">৳{totalDeposit}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-white shadow-lg">
          <p className="text-xs opacity-90 mb-1">Total Cost</p>
          <p className="text-2xl font-bold">৳{Math.round(totalCost) || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white shadow-lg">
          <p className="text-xs opacity-90 mb-1">Total Due</p>
          <p className="text-2xl font-bold">৳{Math.round(totalDue) || 0}</p>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl p-4 text-white shadow-lg">
          <p className="text-xs opacity-90 mb-1">Per Meal Cost</p>
          <p className="text-2xl font-bold">{isCalculated && costPerMeal > 0 ? `৳${Math.round(costPerMeal)}` : '-'}</p>
        </div>
      </div>
      
      <button
        onClick={onCalculate}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-[1.02] active:scale-100 shadow-xl text-lg"
      >
        <Calculator className="w-6 h-6" />
        Calculate All
      </button>
    </div>
  );
}