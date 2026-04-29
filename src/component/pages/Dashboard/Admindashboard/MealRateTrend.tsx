"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiTrendingUp } from "react-icons/fi";

interface MealRateTrendProps {
  data: Array<{ week: string; rate: number }>;
  currentRate: number;
  isMobile: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-emerald-200">
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
        <FiTrendingUp className="text-emerald-600" /> Meal Rate Trend
      </h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" tick={{ fontSize: isMobile ? 10 : 12 }} />
            <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} name="Meal Rate (৳)" dot={{ fill: "#10b981", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
        <span className="text-sm text-gray-600">Current Meal Rate:</span>
        <span className="text-xl font-bold text-emerald-600">৳{currentRate}</span>
      </div>
    </div>
  );
};