"use client";

import React from "react";
import { Coffee, Sun, Moon, Zap, Calendar, Sparkles, ArrowRight } from "lucide-react";

interface MealItem {
  date: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface Props {
  mealData: MealItem[];
  onToggleAllBreakfast: () => void;
  onToggleAllLunch: () => void;
  onToggleAllDinner: () => void;
}

const AllMealcontrol = ({ mealData, onToggleAllBreakfast, onToggleAllLunch, onToggleAllDinner }: Props) => {
  const totalDays = mealData.length;
  
  const activeCounts = {
    breakfast: mealData.filter(m => m.breakfast).length,
    lunch: mealData.filter(m => m.lunch).length,
    dinner: mealData.filter(m => m.dinner).length,
  };

  const getPercentage = (count: number) => totalDays ? Math.round((count / totalDays) * 100) : 0;
  
  const totalActive = activeCounts.breakfast + activeCounts.lunch + activeCounts.dinner;
  const totalPossible = totalDays * 3;
  const totalMeals = totalPossible;
  const activeMeals = totalActive;
  const inactiveMeals = totalPossible - totalActive;

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const today_date = today.getDate();
  const futureMeals = mealData.filter(m => m.date > today_date);
  
  const allBreakfastOn = futureMeals.length > 0 && futureMeals.every(m => m.breakfast === true);
  const allBreakfastOff = futureMeals.length > 0 && futureMeals.every(m => m.breakfast === false);
  
  const allLunchOn = futureMeals.length > 0 && futureMeals.every(m => m.lunch === true);
  const allLunchOff = futureMeals.length > 0 && futureMeals.every(m => m.lunch === false);
  
  const allDinnerOn = futureMeals.length > 0 && futureMeals.every(m => m.dinner === true);
  const allDinnerOff = futureMeals.length > 0 && futureMeals.every(m => m.dinner === false);

  const meals = [
    { 
      name: "Breakfast", 
      icon: Coffee, 
      key: "breakfast" as const, 
      count: activeCounts.breakfast, 
      time: "6:00 - 9:00", 
      color: "#f59e0b",
      bgColor: "bg-amber-500",
      hoverBg: "hover:bg-amber-600",
      activeBg: "bg-amber-600",
      allOn: allBreakfastOn,
      allOff: allBreakfastOff,
      onToggle: onToggleAllBreakfast
    },
    { 
      name: "Lunch", 
      icon: Sun, 
      key: "lunch" as const, 
      count: activeCounts.lunch, 
      time: "12:00 - 15:00", 
      color: "#10b981",
      bgColor: "bg-emerald-500",
      hoverBg: "hover:bg-emerald-600",
      activeBg: "bg-emerald-600",
      allOn: allLunchOn,
      allOff: allLunchOff,
      onToggle: onToggleAllLunch
    },
    { 
      name: "Dinner", 
      icon: Moon, 
      key: "dinner" as const, 
      count: activeCounts.dinner, 
      time: "19:00 - 21:00", 
      color: "#6366f1",
      bgColor: "bg-indigo-500",
      hoverBg: "hover:bg-indigo-600",
      activeBg: "bg-indigo-600",
      allOn: allDinnerOn,
      allOff: allDinnerOff,
      onToggle: onToggleAllDinner
    },
  ];

  return (
    <div className="w-full mt-10 mb-10 bg-base-100 rounded-2xl shadow-lg border border-base-200 p-6">
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <h1 className="text-2xl font-bold text-base-content">
          Meal Overview
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
          <p className="text-sm text-gray-500">Total Meals</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{totalMeals}</p>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
          <p className="text-sm text-emerald-600 font-medium">Active Meals</p>
          <p className="text-3xl font-bold text-emerald-700 mt-1">{activeMeals}</p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 border border-red-200 text-center hover:shadow-md transition-all hover:-translate-y-0.5">
          <p className="text-sm text-red-500 font-medium">Inactive Meals</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{inactiveMeals}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-8 bg-emerald-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-base-content">
              Meal Control Center
            </h2>
          </div>
          <p className="text-gray-500 text-sm ml-3">Manage breakfast, lunch & dinner schedules</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {meals.map((meal) => (
          <div key={meal.key} className="rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1" style={{ backgroundColor: `${meal.color}08` }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${meal.color}20` }}>
                  <meal.icon className="w-5 h-5" style={{ color: meal.color }} />
                </div>
                <span className="font-semibold text-gray-800">{meal.name}</span>
              </div>
              <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-full">{meal.time}</span>
            </div>
            <div className="flex items-end justify-between mt-3">
              <div>
                <p className="text-3xl font-bold text-gray-800">{meal.count}<span className="text-sm text-gray-400">/{totalDays}</span></p>
                <p className="text-xs text-gray-500 mt-1">Active days</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold" style={{ color: meal.color }}>{getPercentage(meal.count)}%</p>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${getPercentage(meal.count)}%`, backgroundColor: meal.color }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="p-1.5 bg-emerald-500 rounded-lg shadow-sm">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-bold text-base-content">Quick Actions</h3>
          <span className="text-xs text-gray-400 ml-2">Toggle all future meals at once</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <button
              key={meal.key}
              onClick={meal.onToggle}
              className={`group w-full py-4 px-5 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 ${meal.bgColor} ${meal.hoverBg}`}
            >
              <meal.icon className="w-5 h-5 text-white flex-shrink-0" />
              <span className="text-white font-bold text-base">{meal.name}</span>
              <span className="text-white font-medium text-sm ml-auto flex-shrink-0">
                {meal.allOn ? 'Turn OFF' : 'Turn ON'}
              </span>
              <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMealcontrol;