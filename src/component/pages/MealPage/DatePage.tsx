"use client";

import React from "react";

interface DatePageProps {
  days: {
    days: number[];
    monthName: string;
  };
}

const DatePage = ({ days }: DatePageProps) => {
  return (
    <div className="w-full">

      <div className="text-center mb-8 pb-3 border-b border-gray-200">
        <h2 className="text-5xl font-bold text-emerald-700">
          {days?.monthName || "Month"}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {days?.days?.length || 0} days in this month
        </p>
      </div>

      {(!days?.days || days.days.length === 0) && (
        <div className="text-center py-12">
          <p className="text-gray-400">No days available</p>
        </div>
      )}

    </div>
  );
};

export default DatePage;