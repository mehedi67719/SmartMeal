"use client";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtext: string;
  iconBg?: string;
  iconColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  subtext,
  iconBg = "bg-emerald-100",
  iconColor = "text-emerald-600",
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 border border-gray-100">
      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
        <div className={`${iconBg} rounded-lg md:rounded-xl p-2 md:p-3`}>
          <div className={`w-4 h-4 md:w-6 md:h-6 ${iconColor}`}>{icon}</div>
        </div>
      </div>
      <h3 className="text-gray-500 text-xs md:text-sm font-medium">{title}</h3>
      <p className="text-xl md:text-3xl font-bold text-gray-800 mt-1">{value}</p>
      <p className="text-[10px] md:text-xs text-gray-400 mt-1">{subtext}</p>
    </div>
  );
};