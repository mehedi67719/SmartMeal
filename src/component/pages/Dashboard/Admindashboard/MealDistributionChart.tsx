"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiPieChart } from "react-icons/fi";

interface MealDistributionChartProps {
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
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

export const MealDistributionChart: React.FC<MealDistributionChartProps> = ({
  breakfastCount,
  lunchCount,
  dinnerCount,
  isMobile,
}) => {
  const data = [
    { name: "Breakfast", value: breakfastCount || 0, color: "#10b981" },
    { name: "Lunch", value: lunchCount || 0, color: "#f59e0b" },
    { name: "Dinner", value: dinnerCount || 0, color: "#059669" },
  ];

  const total = breakfastCount + lunchCount + dinnerCount;

  const renderLabel = (entry: any) => {
    const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(0) : "0";
    return isMobile ? `${percentage}%` : `${entry.name} ${percentage}%`;
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        <FiPieChart className="text-emerald-600" /> Meal Distribution
      </h3>
      <div className="h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 40 : 60}
              outerRadius={isMobile ? 70 : 100}
              paddingAngle={3}
              dataKey="value"
              label={renderLabel}
              labelLine={{ strokeWidth: 1 }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
        <div className="text-center bg-emerald-50 rounded-lg p-2">
          <p className="text-[10px] md:text-xs text-gray-600">Breakfast</p>
          <p className="text-sm md:text-xl font-bold text-gray-800">{breakfastCount || 0}</p>
        </div>
        <div className="text-center bg-amber-50 rounded-lg p-2">
          <p className="text-[10px] md:text-xs text-gray-600">Lunch</p>
          <p className="text-sm md:text-xl font-bold text-gray-800">{lunchCount || 0}</p>
        </div>
        <div className="text-center bg-teal-50 rounded-lg p-2">
          <p className="text-[10px] md:text-xs text-gray-600">Dinner</p>
          <p className="text-sm md:text-xl font-bold text-gray-800">{dinnerCount || 0}</p>
        </div>
      </div>
    </div>
  );
};