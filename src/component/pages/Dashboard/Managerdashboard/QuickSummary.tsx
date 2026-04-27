
"use client";
import React from "react";
import { FiCoffee } from "react-icons/fi";

interface QuickSummaryProps {
  totalCost: number;
  totalMeal: number;
  totalMembers: number;
  currentMealRate: number;
  daysInMonth: number;
}

export const QuickSummary: React.FC<QuickSummaryProps> = ({
  totalCost,
  totalMeal,
  totalMembers,
  currentMealRate,
  daysInMonth,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        <FiCoffee className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Quick Summary
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div className="flex justify-between items-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl">
          <span className="text-xs md:text-sm text-gray-600">Average Cost per Day</span>
          <span className="text-sm md:text-xl font-bold text-emerald-600">৳{Math.round(totalCost / daysInMonth)}</span>
        </div>
        <div className="flex justify-between items-center p-2 md:p-3 bg-amber-50 rounded-lg md:rounded-xl">
          <span className="text-xs md:text-sm text-gray-600">Average Meal per Day</span>
          <span className="text-sm md:text-xl font-bold text-amber-600">{Math.round(totalMeal / daysInMonth)}</span>
        </div>
        <div className="flex justify-between items-center p-2 md:p-3 bg-teal-50 rounded-lg md:rounded-xl">
          <span className="text-xs md:text-sm text-gray-600">Cost per Person</span>
          <span className="text-sm md:text-xl font-bold text-teal-600">৳{Math.round(totalCost / totalMembers)}</span>
        </div>
        <div className="flex justify-between items-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl">
          <span className="text-xs md:text-sm text-gray-600">Meal per Person</span>
          <span className="text-sm md:text-xl font-bold text-emerald-600">{Math.round(totalMeal / totalMembers)}</span>
        </div>
        <div className="flex justify-between items-center p-2 md:p-3 bg-emerald-600 rounded-lg md:rounded-xl text-white sm:col-span-2">
          <span className="text-xs md:text-sm font-semibold">Total Revenue (Projected)</span>
          <span className="text-sm md:text-xl font-bold">৳{(totalMeal * currentMealRate).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};