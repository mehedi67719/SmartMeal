
"use client";
import React from "react";

interface PerformanceMetricsProps {
  totalCost: number;
  totalMeal: number;
  daysInMonth: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  totalCost,
  totalMeal,
  daysInMonth,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Monthly Performance Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="text-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
          <p className="text-[10px] md:text-xs text-gray-600">Total Cost</p>
          <p className="text-sm md:text-xl font-bold text-emerald-700">৳{totalCost.toLocaleString()}</p>
        </div>
        <div className="text-center p-2 md:p-3 bg-amber-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
          <p className="text-[10px] md:text-xs text-gray-600">Total Meal</p>
          <p className="text-sm md:text-xl font-bold text-amber-700">{totalMeal}</p>
        </div>
        <div className="text-center p-2 md:p-3 bg-teal-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
          <p className="text-[10px] md:text-xs text-gray-600">Avg Meal/Day</p>
          <p className="text-sm md:text-xl font-bold text-teal-700">{Math.round(totalMeal / daysInMonth)}</p>
        </div>
        <div className="text-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
          <p className="text-[10px] md:text-xs text-gray-600">Avg Cost/Day</p>
          <p className="text-sm md:text-xl font-bold text-emerald-700">৳{Math.round(totalCost / daysInMonth)}</p>
        </div>
      </div>
    </div>
  );
};