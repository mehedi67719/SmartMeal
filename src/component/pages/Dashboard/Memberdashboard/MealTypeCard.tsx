"use client";
import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

interface MealTypeCardProps {
  title: string;
  count: number;
  percentage: number;
  color: string;
  icon: string;
}

export const MealTypeCard: React.FC<MealTypeCardProps> = ({ title, count, percentage, color, icon }) => {
  const getIcon = () => {
    if (icon === "sun") return <FiSun className={`w-5 h-5 md:w-6 md:h-6 text-${color}-500`} />;
    if (icon === "moon") return <FiMoon className={`w-5 h-5 md:w-6 md:h-6 text-${color}-500`} />;
    return <FiSun className={`w-5 h-5 md:w-6 md:h-6 text-${color}-500`} />;
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        {getIcon()} {title}
      </h3>
      <p className="text-3xl md:text-4xl font-bold text-gray-800">{count}</p>
      <p className="text-xs text-gray-500 mt-2">Total {title.toLowerCase()} this month</p>
      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-gray-500 mt-2">{percentage}% of total meals</p>
    </div>
  );
};