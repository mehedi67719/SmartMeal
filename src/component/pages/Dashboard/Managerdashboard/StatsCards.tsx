
"use client";
import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  subtext?: string;
  changeType?: "cost" | "meal";
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  subtext,
  changeType,
}) => {
  const getChangeColor = () => {
    if (!change) return "bg-gray-100 text-gray-500";
    if (changeType === "cost") {
      return change >= 0 ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500";
    }
    return change >= 0 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500";
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 hover:shadow-lg transition-all border border-gray-100">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
          {icon}
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-xs md:text-sm font-semibold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${getChangeColor()}`}>
            {change >= 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-xs md:text-sm font-medium">{title}</h3>
      <p className="text-base md:text-2xl font-bold text-gray-800 mt-0.5 md:mt-1">{value}</p>
      {subtext && <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2">{subtext}</p>}
    </div>
  );
};