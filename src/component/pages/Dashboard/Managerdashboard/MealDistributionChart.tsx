"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiSun, FiMoon } from "react-icons/fi";

interface MealDistributionChartProps {
  title: string;
  data: Array<{ name: string; value: number; color: string }>;
  total: number;
  isMobile: boolean;
  subtext?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-green-200 text-xs md:text-sm">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {payload.map((p: any, idx: number) => (
          <p key={idx} className="text-xs md:text-sm" style={{ color: p.color }}>
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const MealDistributionChart: React.FC<MealDistributionChartProps> = ({
  title,
  data,
  total,
  isMobile,
  subtext,
}) => {
  if (total === 0) {
    return (
      <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
          {title}
        </h3>
        <div className="flex items-center justify-center h-64 md:h-80">
          <p className="text-gray-400 text-sm">No meal data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
        {title}
        {subtext && <span className="text-xs text-gray-500 ml-1 md:ml-2">{subtext}</span>}
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
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent = 0 }) => {
                const percentage = ((percent || 0) * 100).toFixed(0);
                return isMobile ? `${percentage}%` : `${name} ${percentage}%`;
              }}
              labelLine={{ stroke: "#10b981", strokeWidth: 1 }}
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
        {data.map((item) => (
          <div key={item.name} className={`text-center rounded-lg md:rounded-xl p-2 md:p-3 ${item.name === 'Breakfast' ? 'bg-emerald-50' : item.name === 'Lunch' ? 'bg-amber-50' : 'bg-teal-50'}`}>
            {item.name === 'Breakfast' ? <FiSun className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 mx-auto mb-1" /> : <FiMoon className="w-4 h-4 md:w-5 md:h-5 text-teal-600 mx-auto mb-1" />}
            <p className="text-[10px] md:text-xs text-gray-600">{item.name}</p>
            <p className="text-sm md:text-xl font-bold text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};