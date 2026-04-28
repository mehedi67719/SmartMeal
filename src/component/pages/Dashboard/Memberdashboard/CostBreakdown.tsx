"use client";
import React from "react";
import { FiPieChart } from "react-icons/fi";

interface CostBreakdownProps {
  totalMeals: number;
  mealRate: number;
  totalCost: number;
  totalDeposit: number;
  dueAmount: number;
  isDue: boolean;
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({
  totalMeals,
  mealRate,
  totalCost,
  totalDeposit,
  dueAmount,
  isDue,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100 overflow-x-auto">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        <FiPieChart className="text-emerald-600" /> Cost Breakdown
      </h3>
      <div className="space-y-3 md:space-y-4 min-w-[200px]">
        <div>
          <div className="flex justify-between text-sm mb-1 flex-wrap gap-2">
            <span className="text-gray-600">Total Meals</span>
            <span className="font-semibold">{totalMeals} × ৳{mealRate}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `100%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1 flex-wrap gap-2">
            <span className="text-gray-600">Total Cost</span>
            <span className="font-semibold text-emerald-600">৳{totalCost.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `100%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1 flex-wrap gap-2">
            <span className="text-gray-600">Total Deposit</span>
            <span className="font-semibold text-blue-600">৳{totalDeposit.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((totalDeposit / totalCost) * 100, 100)}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1 flex-wrap gap-2">
            <span className="text-gray-600">Due Amount</span>
            <span className={`font-semibold ${isDue ? 'text-red-600' : 'text-green-600'}`}>
              {isDue ? `৳${dueAmount.toLocaleString()}` : "No Due"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className={`${isDue ? 'bg-red-500' : 'bg-green-500'} h-2 rounded-full`} style={{ width: `${Math.min((dueAmount / totalCost) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};