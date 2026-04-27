
"use client";
import React, { useState, useEffect } from "react";
import { managerdashboarddata } from "@/server/managerdashboard/managerdashboard";

import { FiDollarSign, FiCoffee, FiUsers, FiBarChart2 } from "react-icons/fi";
import { DashboardData } from "@/Types/managerdashboard";
import { LoadingSpinner } from "./LoadingSpinner";
import { MonthSelector } from "./MonthSelector";
import { StatsCard } from "./StatsCards";
import { MealDistributionChart } from "./MealDistributionChart";
import { WeeklyMealBreakdown } from "./WeeklyMealBreakdown";
import { MealRateTrend } from "./MealRateTrend";
import { QuickSummary } from "./QuickSummary";
import { PerformanceMetrics } from "./PerformanceMetrics";

const Managerdashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const monthName = months[selectedMonth];
      const data = await managerdashboarddata(monthName, selectedYear);
      setDashboardData(data);
      setLoading(false);
    };
    fetchData();
  }, [selectedMonth, selectedYear]);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!dashboardData) {
    return (
      <div className="bg-white min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-sm md:text-base">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  const { metadata, summary, weeklyMealBreakdown, mealRateHistory, todayMeals } = dashboardData;
  const daysInMonth = metadata.daysInMonth;

  const mealDistributionData = [
    { name: "Breakfast", value: summary.breakfastCount, color: "#10b981" },
    { name: "Lunch", value: summary.lunchCount, color: "#f59e0b" },
    { name: "Dinner", value: summary.dinnerCount, color: "#059669" },
  ];

  const todayMealData = [
    { name: "Breakfast", value: todayMeals.breakfast, color: "#10b981" },
    { name: "Lunch", value: todayMeals.lunch, color: "#f59e0b" },
    { name: "Dinner", value: todayMeals.dinner, color: "#059669" },
  ];

  return (
    <div className="bg-white min-h-screen p-3 container">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-600">Meal Manager Dashboard</h1>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Monthly overview & analytics</p>
          </div>
          <MonthSelector
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <StatsCard
            title="Total Cost"
            value={`৳${summary.totalCost.toLocaleString()}`}
            icon={<FiDollarSign className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />}
            change={summary.costChange}
            subtext={`${months[selectedMonth]} ${selectedYear}`}
            changeType="cost"
          />
          <StatsCard
            title="Total Meal"
            value={summary.totalMeal}
            icon={<FiCoffee className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />}
            change={summary.mealChange}
            subtext={`${months[selectedMonth]} ${selectedYear}`}
            changeType="meal"
          />
          <StatsCard
            title="Total Members"
            value={metadata.totalMembers}
            icon={<FiUsers className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />}
            subtext="Active members"
          />
          <StatsCard
            title="Current Meal Rate"
            value={`৳${metadata.currentMealRate}`}
            icon={<FiBarChart2 className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />}
            subtext="✓ Calculated rate"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <MealDistributionChart
            title="Today's Meal Distribution"
            data={todayMealData}
            total={todayMeals.total}
            isMobile={isMobile}
            subtext={`(${months[selectedMonth]} ${todayMeals.total > 0 ? new Date().getDate() : "No data"})`}
          />
          <MealDistributionChart
            title="Monthly Meal Distribution"
            data={mealDistributionData}
            total={summary.totalMeal}
            isMobile={isMobile}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <WeeklyMealBreakdown data={weeklyMealBreakdown} isMobile={isMobile} />
          <MealRateTrend data={mealRateHistory} currentRate={metadata.currentMealRate} isMobile={isMobile} />
        </div>

        <QuickSummary
          totalCost={summary.totalCost}
          totalMeal={summary.totalMeal}
          totalMembers={metadata.totalMembers}
          currentMealRate={metadata.currentMealRate}
          daysInMonth={daysInMonth}
        />

        <div className="mt-6 md:mt-8">
          <PerformanceMetrics
            totalCost={summary.totalCost}
            totalMeal={summary.totalMeal}
            daysInMonth={daysInMonth}
          />
        </div>
      </div>
    </div>
  );
};

export default Managerdashboard;