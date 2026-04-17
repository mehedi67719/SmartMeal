"use client";

import React, { useState, useEffect, useRef } from "react";
import { currentmounthdays } from "@/component/hooks/currentmounthdays";
import DatePage from "@/component/pages/MealPage/DatePage";
import Mealcart from "@/component/pages/MealPage/Mealcart";
import AllMealcontrol from "@/component/pages/MealPage/AllMealcontrol";
import { uploadmeal, getMealByMonth } from "@/server/meal/allmeal";
import Swal from "sweetalert2";

interface MealItem {
  date: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

const createDefaultMeal = (date: number): MealItem => ({
  date,
  breakfast: false,
  lunch: false,
  dinner: false,
});

const Page = () => {
  const days = currentmounthdays();
  const [meal, setMeal] = useState<MealItem[]>([]);
  const [loading, setLoading] = useState(false);
  const isFirstRender = useRef(true);
  const hasUnsavedChanges = useRef(false);

  const today = new Date().getDate();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadMealData = async () => {
      try {
        const result = await getMealByMonth(currentMonth, currentYear);
        
        if (result.success && result.data) {
          const mealsData = result.data.meals || [];
          setMeal(mealsData);
        } else {
          const defaultMeals = days?.days?.map((day: number) => createDefaultMeal(day)) || [];
          setMeal(defaultMeals);
        }
      } catch (error) {
        console.error("Error loading meal data:", error);
        const defaultMeals = days?.days?.map((day: number) => createDefaultMeal(day)) || [];
        setMeal(defaultMeals);
      }
    };

    loadMealData();
  }, []);

  const toggleSingleMeal = (date: number, name: "breakfast" | "lunch" | "dinner") => {
    if (date >= today) {
      hasUnsavedChanges.current = true;
      setMeal((prev) =>
        prev.map((item) =>
          item.date === date ? { ...item, [name]: !item[name] } : item
        )
      );
    }
  };

  const toggleAllBreakfastFuture = () => {
    hasUnsavedChanges.current = true;
    setMeal((prev) =>
      prev.map((item) =>
        item.date > today ? { ...item, breakfast: !item.breakfast } : item
      )
    );
  };

  const toggleAllLunchFuture = () => {
    hasUnsavedChanges.current = true;
    setMeal((prev) =>
      prev.map((item) =>
        item.date > today ? { ...item, lunch: !item.lunch } : item
      )
    );
  };

  const toggleAllDinnerFuture = () => {
    hasUnsavedChanges.current = true;
    setMeal((prev) =>
      prev.map((item) =>
        item.date > today ? { ...item, dinner: !item.dinner } : item
      )
    );
  };

  const saveMealData = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const result = await uploadmeal(meal, currentMonth, currentYear);
      
      if (result.success) {
        hasUnsavedChanges.current = false;
        await Swal.fire({
          title: "Success!",
          text: "Your meal data has been saved successfully.",
          icon: "success",
          confirmButtonColor: "#10b981",
          confirmButtonText: "OK",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          title: "Error!",
          text: result.message || "Failed to save meal data. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error saving meal data:", error);
      await Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFirstRender.current && hasUnsavedChanges.current) {
      saveMealData();
    }
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [meal]);

  

  return (
    <div className="max-w-7xl w-full mx-auto mt-10 px-4">
      <DatePage days={days} />

      <AllMealcontrol
        mealData={meal}
        onToggleAllBreakfast={toggleAllBreakfastFuture}
        onToggleAllLunch={toggleAllLunchFuture}
        onToggleAllDinner={toggleAllDinnerFuture}
      />

      <div className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meal.map((item) => (
          <Mealcart
            key={item.date}
            d={item.date}
            meal={item}
            toggleMeal={toggleSingleMeal}
          />
        ))}
      </div>

      {loading && (
        <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Saving...</span>
        </div>
      )}
    </div>
  );
};

export default Page;

