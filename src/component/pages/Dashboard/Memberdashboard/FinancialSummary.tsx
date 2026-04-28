"use client";
import React from "react";
import { FiCoffee } from "react-icons/fi";

interface FinancialSummaryProps {
  mealRate: number;
  totalMeals: number;
  totalCost: number;
  averageDailyCost: number;
  isDue: boolean;
  dueAmount: number;
  totalCostNumber: number;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  mealRate,
  totalMeals,
  totalCost,
  averageDailyCost,
  isDue,
  dueAmount,
  totalCostNumber,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        <FiCoffee className="text-emerald-600" /> Financial Summary
      </h3>
      <div className="space-y-3 md:space-y-4">
        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl flex-wrap gap-2">
          <span className="text-gray-600">Meal Rate</span>
          <span className="text-lg md:text-xl font-bold text-emerald-600">৳{mealRate} per meal</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl flex-wrap gap-2">
          <span className="text-gray-600">Total Meals × Rate</span>
          <span className="text-base md:text-xl font-bold text-blue-600">{totalMeals} × ৳{mealRate} = ৳{totalCost.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl flex-wrap gap-2">
          <span className="text-gray-600">Average Daily Cost</span>
          <span className="text-lg md:text-xl font-bold text-purple-600">৳{averageDailyCost}</span>
        </div>
        <div className={`flex justify-between items-center p-3 rounded-xl flex-wrap gap-2 ${isDue ? 'bg-red-50' : 'bg-green-50'}`}>
          <span className="text-gray-600">Payment Status</span>
          <span className={`text-base md:text-xl font-bold ${isDue ? 'text-red-600' : 'text-green-600'}`}>
            {isDue ? `${((dueAmount / totalCostNumber) * 100).toFixed(1)}% Due` : "100% Paid"}
          </span>
        </div>
      </div>
    </div>
  );
};