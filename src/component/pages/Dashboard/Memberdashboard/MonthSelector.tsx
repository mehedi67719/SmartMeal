"use client";
import React from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onPrevMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex items-center gap-2 md:gap-4 bg-white rounded-xl shadow-md p-1 md:p-2 border border-gray-200">
      <button
        onClick={onPrevMonth}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
      >
        <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4">
        <FiCalendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value))}
          className="text-sm md:text-lg font-semibold text-gray-700 bg-transparent cursor-pointer outline-none"
        >
          {months.map((month, idx) => (
            <option key={idx} value={idx}>{month}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="text-sm md:text-lg font-semibold text-gray-700 bg-transparent cursor-pointer outline-none"
        >
          {[2024, 2025, 2026].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <button
        onClick={onNextMonth}
        className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
      >
        <FiChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};