"use client";
import React from "react";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

interface DueCardProps {
  dueAmount: number;
  isDue: boolean;
}

export const DueCard: React.FC<DueCardProps> = ({ dueAmount, isDue }) => {
  return (
    <div className={`rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 border ${isDue ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
        <div className={`rounded-lg md:rounded-xl p-2 md:p-3 ${isDue ? 'bg-red-200' : 'bg-green-200'}`}>
          {isDue ? (
            <FiAlertCircle className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
          ) : (
            <FiCheckCircle className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
          )}
        </div>
      </div>
      <h3 className="text-gray-600 text-xs md:text-sm font-medium">Due Amount</h3>
      <p className={`text-xl md:text-3xl font-bold mt-1 ${isDue ? 'text-red-600' : 'text-green-600'}`}>
        {isDue ? `৳${dueAmount.toLocaleString()}` : "No Due"}
      </p>
      <p className="text-[10px] md:text-xs text-gray-500 mt-1">
        {isDue ? `You need to pay ৳${dueAmount}` : "All paid ✓"}
      </p>
    </div>
  );
};