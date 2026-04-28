"use client";
import React, { useState, useEffect } from "react";
import { memberdashboarddata } from "@/server/dashboard/memberdashboard";
import { FiDollarSign, FiCoffee, FiTrendingUp } from "react-icons/fi";
import { LoadingSpinner } from "./LoadingSpinner";
import { MonthSelector } from "./MonthSelector";
import { StatsCard } from "./StatsCard";
import { DueCard } from "./DueCard";
import { DailyMealTrend } from "./DailyMealTrend";
import { WeeklyMealSummary } from "./WeeklyMealSummary";
import { MealTypeCard } from "./MealTypeCard";
import { CostBreakdown } from "./CostBreakdown";
import { FinancialSummary } from "./FinancialSummary";
import { PerformanceMetrics } from "./PerformanceMetrics";


const MemberDashboard = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isMobile, setIsMobile] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      const data = await memberdashboarddata(monthName, selectedYear);
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

  if (!dashboardData || !dashboardData.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load dashboard data</p>
          <p className="text-gray-500 text-sm mt-2">{dashboardData?.error}</p>
        </div>
      </div>
    );
  }

  const { data } = dashboardData;
  const {
    metadata,
    mealRate,
    summary,
    mealBreakdown,
    dailyMeals,
    weeklyMeals,
  } = data;

  const today = metadata.today;
  const monthName = months[selectedMonth];

  const mealTrendData = dailyMeals.slice(0, today).map((day: any) => ({
    day: day.date,
    meals: day.total,
  }));

  return (
    <div className="min-h-screen container">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-600">Member Dashboard</h1>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Welcome back, {metadata.name}
            </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <StatsCard
            title="Total Meals"
            value={summary.totalMeals}
            icon={<FiCoffee className="w-4 h-4 md:w-6 md:h-6" />}
            subtext={`${monthName} ${selectedYear}`}
          />
          <StatsCard
            title="Total Cost"
            value={`৳${summary.totalCost.toLocaleString()}`}
            icon={<FiDollarSign className="w-4 h-4 md:w-6 md:h-6" />}
            subtext={`Meal Rate: ৳${mealRate}`}
          />
          <StatsCard
            title="Total Deposit"
            value={`৳${summary.totalDeposit.toLocaleString()}`}
            icon={<FiTrendingUp className="w-4 h-4 md:w-6 md:h-6" />}
            subtext="This month"
          />
          <DueCard dueAmount={summary.dueAmount} isDue={summary.isDue} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <DailyMealTrend data={mealTrendData} month={monthName} isMobile={isMobile} />
          <WeeklyMealSummary data={weeklyMeals} isMobile={isMobile} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <MealTypeCard
            title="Breakfast"
            count={mealBreakdown.breakfast}
            percentage={mealBreakdown.breakfastPercentage}
            color="yellow"
            icon="sun"
          />
          <MealTypeCard
            title="Lunch"
            count={mealBreakdown.lunch}
            percentage={mealBreakdown.lunchPercentage}
            color="orange"
            icon="sun"
          />
          <MealTypeCard
            title="Dinner"
            count={mealBreakdown.dinner}
            percentage={mealBreakdown.dinnerPercentage}
            color="teal"
            icon="moon"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <CostBreakdown
            totalMeals={summary.totalMeals}
            mealRate={mealRate}
            totalCost={summary.totalCost}
            totalDeposit={summary.totalDeposit}
            dueAmount={summary.dueAmount}
            isDue={summary.isDue}
          />
          <FinancialSummary
            mealRate={mealRate}
            totalMeals={summary.totalMeals}
            totalCost={summary.totalCost}
            averageDailyCost={summary.averageDailyCost}
            isDue={summary.isDue}
            dueAmount={summary.dueAmount}
            totalCostNumber={summary.totalCost}
          />
        </div>

        <PerformanceMetrics
          totalMeals={summary.totalMeals}
          averageDailyMeals={summary.averageDailyMeals}
          totalCost={summary.totalCost}
          averageDailyCost={summary.averageDailyCost}
        />
      </div>
    </div>
  );
};

export default MemberDashboard;