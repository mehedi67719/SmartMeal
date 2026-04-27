
"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiTrendingUp } from "react-icons/fi";

interface MealRateTrendProps {
  data: Array<{ week: string; rate: number }>;
  currentRate: number;
  isMobile: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-green-200 text-xs md:text-sm">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="text-xs md:text-sm" style={{ color: p.color }}>
            {p.name}: ৳{p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MealRateTrend: React.FC<MealRateTrendProps> = ({ data, currentRate, isMobile }) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        <FiTrendingUp className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Meal Rate Trend
      </h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
            <Area type="monotone" dataKey="rate" stroke="#10b981" fill="url(#rateGradient)" strokeWidth={3} name="Meal Rate" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between items-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl">
        <span className="text-xs md:text-sm text-gray-600">Current Rate:</span>
        <span className="text-base md:text-xl font-bold text-emerald-600">৳{currentRate}</span>
        <span className="text-xs text-gray-600">Based on actual data</span>
      </div>
    </div>
  );
};