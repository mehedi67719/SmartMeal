"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiBarChart2 } from "react-icons/fi";

interface WeeklyMealBreakdownProps {
  data: Array<{ week: string; meals: number }>;
  isMobile: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-emerald-200">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="text-xs md:text-sm" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const WeeklyMealBreakdown: React.FC<WeeklyMealBreakdownProps> = ({ data, isMobile }) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        <FiBarChart2 className="text-emerald-600" /> Weekly Meal Breakdown
      </h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="meals" fill="#10b981" name="Total Meals" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};