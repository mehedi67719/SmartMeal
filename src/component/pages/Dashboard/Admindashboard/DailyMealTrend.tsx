"use client";
import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts";
import { FiActivity } from "react-icons/fi";

interface DailyMealTrendProps {
  data: Array<{ day: number; cost: number; meals: number }>;
  month: string;
  year: number;
  isMobile: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-emerald-200">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="text-xs md:text-sm" style={{ color: p.color }}>
            {p.name}: {p.name.includes("Cost") ? `৳${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DailyMealTrend: React.FC<DailyMealTrendProps> = ({ data, month, year, isMobile }) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        <FiActivity className="text-emerald-600" /> Daily Meal Trend
        <span className="text-xs text-gray-500">({month} {year})</span>
      </h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="cost" fill="#10b981" name="Daily Cost" radius={[6, 6, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="meals" stroke="#f59e0b" strokeWidth={3} name="Daily Meals" dot={{ fill: "#f59e0b", r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};