// components/LoadingSpinner.tsx
"use client";
import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-white min-h-screen p-4 md:p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-sm md:text-base">Loading dashboard data...</p>
      </div>
    </div>
  );
};