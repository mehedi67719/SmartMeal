"use client";
import { controllerdashboarddata } from "@/server/dashboard/admindashboard";
import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiDollarSign,
  FiCoffee,
  FiTrendingUp,
} from "react-icons/fi";
import { StatsCard } from "./StatsCard";
import { DailyMealTrend } from "./DailyMealTrend";
import { MealDistributionChart } from "./MealDistributionChart";
import { WeeklyMealBreakdown } from "./WeeklyMealBreakdown";
import { MealRateTrend } from "./MealRateTrend";
import { MembersTable } from "./MembersTable";
import { QuickStats } from "./QuickStats";
import { LoadingSpinner } from "../LoadingSpinner";
import { MonthSelector } from "../MonthSelector";

const ControllerDashboard = () => {
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
      const data = await controllerdashboarddata(monthName, selectedYear);
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

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (!dashboardData || !dashboardData.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold">Failed to load dashboard data</p>
          <p className="text-gray-500 text-sm mt-2">{dashboardData?.error || "Unknown error"}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { data } = dashboardData;
  
  const summary = data?.summary || {};
  const metadata = data?.metadata || {};
  const dailyPerformance = data?.dailyPerformance || [];
  const weeklyMealBreakdown = data?.weeklyMealBreakdown || [];
  const mealRateHistory = data?.mealRateHistory || [];
  const members = data?.members || [];

  const weeklyMealData = weeklyMealBreakdown.map((week: any) => ({
    week: week.week,
    meals: week.breakfast + week.lunch + week.dinner,
  }));

  const totalMemberMeals = summary.totalMeal || 0;
  const totalMemberCost = summary.totalCost || 0;
  const totalMemberDeposit = summary.totalDeposit || 0;
  const totalMembers = metadata.totalMembers || 0;
  const currentMealRate = metadata.currentMealRate || 0;
  
  const membersWithMealToday = members.filter((m: any) => m.hasMealToday === true).length;
  const membersWithoutMealToday = totalMembers - membersWithMealToday;

  const collectionRate = totalMemberCost > 0 ? (totalMemberDeposit / totalMemberCost) * 100 : 0;
  const avgMealPerMember = totalMembers > 0 ? Math.round(totalMemberMeals / totalMembers) : 0;
  const avgCostPerMember = totalMembers > 0 ? Math.round(totalMemberCost / totalMembers) : 0;
  const activeRate = totalMembers > 0 ? (membersWithMealToday / totalMembers) * 100 : 0;

  return (
    <div className="min-h-screen container">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-600">Controller Dashboard</h1>
            <p className="text-gray-500 text-xs md:text-sm mt-1">System overview & member analytics</p>
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
            title="Total Members"
            value={totalMembers}
            icon={<FiUsers className="w-4 h-4 md:w-6 md:h-6" />}
            subtext={`${membersWithMealToday} had meal today`}
          />
          <StatsCard
            title="Total Meals"
            value={totalMemberMeals}
            icon={<FiCoffee className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />}
            subtext="This month"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatsCard
            title="Total Cost"
            value={`৳${totalMemberCost.toLocaleString()}`}
            icon={<FiDollarSign className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />}
            subtext="Total expense"
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatsCard
            title="Meal Rate"
            value={`৳${currentMealRate}`}
            icon={<FiTrendingUp className="w-4 h-4 md:w-6 md:h-6 text-teal-600" />}
            subtext="Per meal"
            iconBg="bg-teal-100"
            iconColor="text-teal-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <DailyMealTrend 
            data={dailyPerformance} 
            month={months[selectedMonth]} 
            year={selectedYear} 
            isMobile={isMobile} 
          />
          <MealDistributionChart 
            breakfastCount={summary.breakfastCount || 0}
            lunchCount={summary.lunchCount || 0}
            dinnerCount={summary.dinnerCount || 0}
            isMobile={isMobile}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <WeeklyMealBreakdown data={weeklyMealData} isMobile={isMobile} />
          <MealRateTrend data={mealRateHistory} currentRate={currentMealRate} isMobile={isMobile} />
        </div>

        <MembersTable 
          members={members}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          membersWithMealToday={membersWithMealToday}
          membersWithoutMealToday={membersWithoutMealToday}
          months={months}
        />

        <QuickStats 
          collectionRate={collectionRate}
          avgMealPerMember={avgMealPerMember}
          avgCostPerMember={avgCostPerMember}
          activeRate={activeRate}
        />
      </div>
    </div>
  );
};

export default ControllerDashboard;