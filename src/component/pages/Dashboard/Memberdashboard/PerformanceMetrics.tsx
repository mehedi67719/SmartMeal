"use client";
import React from "react";

interface PerformanceMetricsProps {
  totalMeals: number;
  averageDailyMeals: number;
  totalCost: number;
  averageDailyCost: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  totalMeals,
  averageDailyMeals,
  totalCost,
  averageDailyCost,
}) => {
  return (
    <div className="mt-6 md:mt-8 bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100 overflow-x-auto">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Monthly Performance</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 min-w-[300px]">
        <div className="text-center p-2 md:p-3 bg-emerald-50 rounded-xl">
          <p className="text-[10px] md:text-xs text-gray-600">Total Meals</p>
          <p className="text-lg md:text-2xl font-bold text-emerald-700">{totalMeals}</p>
        </div>
        <div className="text-center p-2 md:p-3 bg-orange-50 rounded-xl">
          <p className="text-[10px] md:text-xs text-gray-600">Avg Meals/Day</p>
          <p className="text-lg md:text-2xl font-bold text-orange-700">{averageDailyMeals}</p>
        </div>
        <div className="text-center p-2 md:p-3 bg-blue-50 rounded-xl">
          <p className="text-[10px] md:text-xs text-gray-600">Total Cost</p>
          <p className="text-lg md:text-2xl font-bold text-blue-700">৳{totalCost.toLocaleString()}</p>
        </div>
        <div className="text-center p-2 md:p-3 bg-purple-50 rounded-xl">
          <p className="text-[10px] md:text-xs text-gray-600">Avg Cost/Day</p>
          <p className="text-lg md:text-2xl font-bold text-purple-700">৳{averageDailyCost}</p>
        </div>
      </div>
    </div>
  );
};