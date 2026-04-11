import React from 'react';
import Mealcart from './Mealcart';

interface DatePageProps {
  days: {
    days: number[];
    monthName: string;
  };
}

const DatePage = ({ days }: DatePageProps) => {
  return (
    <div className="max-w-7xl mt-10 mb-10 mx-auto  px-4 sm:px-6 lg:px-8">
   
      <div className="mb-6 text-center mb-8 pb-3 border-b border-gray-200">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
          {days?.monthName || 'Month'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {days?.days?.length || 0} days in this month
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {days?.days?.map((dayNumber: number) => (
          <Mealcart key={dayNumber} d={dayNumber} />
        ))}
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