"use client";

import React from "react";
import { Coffee, Sun, Moon } from "lucide-react";

interface MealState {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface MealcartProps {
  d: number;
  meal: MealState;
  toggleMeal: (date: number, name: keyof MealState) => void;
}

const Mealcart = ({ d, meal, toggleMeal }: MealcartProps) => {
  const meals = [
    { name: "breakfast", label: "Breakfast", icon: Coffee },
    { name: "lunch", label: "Lunch", icon: Sun },
    { name: "dinner", label: "Dinner", icon: Moon },
  ];

  const activeCount = (meal.breakfast ? 1 : 0) + (meal.lunch ? 1 : 0) + (meal.dinner ? 1 : 0);
  const allSelected = activeCount === 3;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const dateObj = new Date(currentYear, currentMonth, d);
  const formattedDate = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      <div className="relative px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${
                allSelected ? 'bg-green-500 shadow-lg shadow-green-200' : 
                activeCount > 0 ? 'bg-orange-400 shadow-lg shadow-orange-200' : 
                'bg-gray-300'
              }`}></div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Day {d}
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1 ml-3.5">{formattedDate}</p>
          </div>
          
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
            allSelected ? 'bg-green-500 text-white shadow-green-200' : 
            activeCount > 0 ? 'bg-orange-500 text-white shadow-orange-200' : 
            'bg-gray-400 text-white'
          }`}>
            {allSelected ? 'COMPLETE' : activeCount > 0 ? `${activeCount}/3 ACTIVE` : 'EMPTY'}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {meals.map((m) => {
          const isActive = meal[m.name as keyof MealState];

          return (
            <div
              key={m.name}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-gradient-to-r from-green-50 to-white border-l-4 border-green-500' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-green-100 shadow-sm' : 'bg-gray-100'
                }`}>
                  <m.icon className={`w-4.5 h-4.5 ${isActive ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                <div>
                  <span className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                    {m.label}
                  </span>
                  {isActive && (
                    <p className="text-[10px] text-green-600 font-medium mt-0.5">Active</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => toggleMeal(d, m.name as keyof MealState)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 shadow-md ${
                  isActive ? 'bg-green-500 shadow-green-200' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
                    isActive ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`text-xs font-medium ${
              activeCount === 3 ? 'text-green-600' : 
              activeCount === 2 ? 'text-orange-600' :
              activeCount === 1 ? 'text-orange-500' : 'text-gray-500'
            }`}>
              {activeCount === 3 ? '✨ Perfect day! All meals active' : 
               activeCount === 2 ? `⏳ ${activeCount} meals active` :
               activeCount === 1 ? `⏳ ${activeCount} meal active` :
               '⚠️ No meals active'}
            </div>
          </div>
          <div className="flex gap-1.5">
            {meals.map((m, idx) => {
              const isActive = meal[m.name as keyof MealState];
              return (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-green-500 scale-110' : 'bg-gray-300'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mealcart;