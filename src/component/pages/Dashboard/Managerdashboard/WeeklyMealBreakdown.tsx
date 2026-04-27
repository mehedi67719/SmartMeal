
"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiBarChart2 } from "react-icons/fi";

interface WeeklyMealBreakdownProps {
  data: Array<{ week: string; breakfast: number; lunch: number; dinner: number }>;
  isMobile: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-green-200 text-xs md:text-sm">
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
        <FiBarChart2 className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Weekly Meal Breakdown
      </h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
            <Bar dataKey="breakfast" fill="#10b981" name="Breakfast" radius={[6, 6, 0, 0]} />
            <Bar dataKey="lunch" fill="#f59e0b" name="Lunch" radius={[6, 6, 0, 0]} />
            <Bar dataKey="dinner" fill="#059669" name="Dinner" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};