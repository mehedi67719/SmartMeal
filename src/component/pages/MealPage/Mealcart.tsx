"use client";
import React, { useState } from "react";
import { Coffee, Sun, Moon, Check } from "lucide-react";

interface MealcartProps {
  d: number;
}

interface MealState {
  Breakfast: boolean;
  Lunch: boolean;
  Dinner: boolean;
}

const Mealcart = ({ d }: MealcartProps) => {
  const [mealStates, setMealStates] = useState<MealState>({
    Breakfast: true,
    Lunch: true,
    Dinner: true,
  });

  const meals = [
    { name: "Breakfast", icon: Coffee },
    { name: "Lunch", icon: Sun },
    { name: "Dinner", icon: Moon },
  ];

  const toggleMeal = (mealName: keyof MealState) => {
    setMealStates((prev) => ({
      ...prev,
      [mealName]: !prev[mealName],
    }));
  };

  const allSelected = Object.values(mealStates).every((v) => v);

  const toggleAll = () => {
    const newState = !allSelected;
    setMealStates({
      Breakfast: newState,
      Lunch: newState,
      Dinner: newState,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">

      
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Day {d}
          </h2>

          <button
            onClick={toggleAll}
            className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        </div>
      </div>

    
      <div className="divide-y divide-gray-100">
        {meals.map(({ name, icon: Icon }) => {
          const isActive = mealStates[name as keyof MealState];

          return (
            <div
              key={name}
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
            >
          
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border transition ${
                    isActive
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-emerald-600" : "text-gray-400"
                    }`}
                  />
                </div>

                <span
                  className={`font-medium ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {name}
                </span>
              </div>

           
              <button
                onClick={() => toggleMeal(name as keyof MealState)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  isActive ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                    isActive ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          );
        })}
      </div>

  
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Meals Status
        </span>

        <div className="flex items-center gap-2">
          {Object.values(mealStates).map((v, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                v ? "bg-emerald-500" : "bg-gray-300"
              }`}
            ></span>
          ))}

          <span className="text-xs font-semibold text-gray-700 ml-1">
            {Object.values(mealStates).filter(Boolean).length}/3
          </span>
        </div>
      </div>
    </div>
  );
};

export default Mealcart;