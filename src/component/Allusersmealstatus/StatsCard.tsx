"use client";
import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtext: string;
  iconColor?: string;
  bgColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  subtext,
  iconColor = "text-emerald-600",
  bgColor = "bg-emerald-100",
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between">
        <div className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center`}>
          <div className={`w-5 h-5 ${iconColor}`}>{icon}</div>
        </div>
        <span className="text-2xl font-bold text-gray-800">{value}</span>
      </div>
      <p className="text-gray-500 text-sm mt-2">{title}</p>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  );
};