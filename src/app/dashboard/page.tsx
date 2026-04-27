"use client";
import { managerdashboarddata } from "@/server/managerdashboard/managerdashboard";
import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiCoffee,
  FiSun,
  FiMoon,
  FiDollarSign,
  FiBarChart2,
  FiChevronLeft,
  FiChevronRight,
  FiPieChart,
  FiActivity,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const Page = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-green-200 text-xs md:text-sm">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-xs md:text-sm" style={{ color: p.color }}>
              {p.name}: {p.value.toLocaleString()}{" "}
              {p.name === "Cost" || p.name === "Daily Cost" ? "৳" : p.name === "Rate" ? "৳" : ""}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm md:text-base">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="bg-white min-h-screen p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-sm md:text-base">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  const {
    metadata,
    summary,
    dailyPerformance,
    weeklyMealBreakdown,
    mealRateHistory,
    todayMeals,
  } = dashboardData;

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

  const daysInMonth = metadata.daysInMonth;
  const daysUntilToday = metadata.today;

  return (
    <div className="bg-white min-h-screen p-3 md:p-6">
      <div className="container">
    
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-600">Meal Manager Dashboard</h1>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Monthly overview & analytics</p>
          </div>
          
          {/* Month Selector - Fixed scroll issue */}
          <div className="flex items-center gap-2 md:gap-4 bg-white rounded-xl shadow-md p-1 md:p-2 border border-gray-200 w-full md:w-auto">
            <button 
              onClick={handlePrevMonth} 
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            >
              <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4 flex-1 justify-center">
              <FiCalendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="text-sm md:text-lg font-semibold text-gray-700 bg-transparent cursor-pointer outline-none"
                style={{ WebkitAppearance: "menulist", appearance: "menulist" }}
              >
                {months.map((month, idx) => (
                  <option key={idx} value={idx}>{month}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="text-sm md:text-lg font-semibold text-gray-700 bg-transparent cursor-pointer outline-none"
                style={{ WebkitAppearance: "menulist", appearance: "menulist" }}
              >
                {[2024, 2025, 2026].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={handleNextMonth} 
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            >
              <FiChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
                <FiDollarSign className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
              <span className={`flex items-center gap-1 text-xs md:text-sm font-semibold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${summary.costChange >= 0 ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}>
                {summary.costChange >= 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                {Math.abs(summary.costChange)}%
              </span>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm font-medium">Total Cost</h3>
            <p className="text-base md:text-2xl font-bold text-gray-800 mt-0.5 md:mt-1">৳{summary.totalCost.toLocaleString()}</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2">{months[selectedMonth]} {selectedYear}</p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
                <FiCoffee className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
              <span className={`flex items-center gap-1 text-xs md:text-sm font-semibold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${summary.mealChange >= 0 ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
                {summary.mealChange >= 0 ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
                {Math.abs(summary.mealChange)}%
              </span>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm font-medium">Total Meal</h3>
            <p className="text-base md:text-2xl font-bold text-gray-800 mt-0.5 md:mt-1">{summary.totalMeal}</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2">{months[selectedMonth]} {selectedYear}</p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
                <FiUsers className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm font-medium">Total Members</h3>
            <p className="text-base md:text-2xl font-bold text-gray-800 mt-0.5 md:mt-1">{metadata.totalMembers}</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2">Active members</p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 hover:shadow-lg transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
                <FiBarChart2 className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm font-medium">Current Meal Rate</h3>
            <p className="text-base md:text-2xl font-bold text-gray-800 mt-0.5 md:mt-1">৳{metadata.currentMealRate}</p>
            <p className="text-[10px] md:text-xs text-emerald-600 mt-1 md:mt-2 font-semibold">✓ Calculated rate</p>
          </div>
        </div>

        {/* Charts Section - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiActivity className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Today's Meal Distribution
              <span className="text-xs text-gray-500 ml-1 md:ml-2">({months[selectedMonth]} {todayMeals.total > 0 ? new Date().getDate() : "No data"})</span>
            </h3>
            {todayMeals.total > 0 ? (
              <>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={todayMealData}
                        cx="50%"
                        cy="50%"
                        innerRadius={isMobile ? 40 : 60}
                        outerRadius={isMobile ? 70 : 100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={{ stroke: "#10b981", strokeWidth: 1 }}
                      >
                        {todayMealData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
                  <div className="text-center bg-emerald-50 rounded-lg md:rounded-xl p-2 md:p-3">
                    <FiSun className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-gray-600">Breakfast</p>
                    <p className="text-sm md:text-xl font-bold text-gray-800">{todayMeals.breakfast}</p>
                  </div>
                  <div className="text-center bg-amber-50 rounded-lg md:rounded-xl p-2 md:p-3">
                    <FiSun className="w-4 h-4 md:w-5 md:h-5 text-amber-600 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-gray-600">Lunch</p>
                    <p className="text-sm md:text-xl font-bold text-gray-800">{todayMeals.lunch}</p>
                  </div>
                  <div className="text-center bg-teal-50 rounded-lg md:rounded-xl p-2 md:p-3">
                    <FiMoon className="w-4 h-4 md:w-5 md:h-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-gray-600">Dinner</p>
                    <p className="text-sm md:text-xl font-bold text-gray-800">{todayMeals.dinner}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 md:h-80">
                <p className="text-gray-400 text-sm">No meal data available for today</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiPieChart className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Monthly Meal Distribution
            </h3>
            {summary.totalMeal > 0 ? (
              <>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mealDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={isMobile ? 40 : 60}
                        outerRadius={isMobile ? 70 : 100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={{ stroke: "#10b981", strokeWidth: 1 }}
                      >
                        {mealDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
                  <div className="text-center bg-emerald-50 rounded-lg md:rounded-xl p-2 md:p-3">
                    <FiSun className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-gray-600">Breakfast</p>
                    <p className="text-sm md:text-xl font-bold text-gray-800">{summary.breakfastCount}</p>
                  </div>
                  <div className="text-center bg-amber-50 rounded-lg md:rounded-xl p-2 md:p-3">
                    <FiSun className="w-4 h-4 md:w-5 md:h-5 text-amber-600 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-gray-600">Lunch</p>
                    <p className="text-sm md:text-xl font-bold text-gray-800">{summary.lunchCount}</p>
                  </div>
                  <div className="text-center bg-teal-50 rounded-lg md:rounded-xl p-2 md:p-3">
                    <FiMoon className="w-4 h-4 md:w-5 md:h-5 text-teal-600 mx-auto mb-1" />
                    <p className="text-[10px] md:text-xs text-gray-600">Dinner</p>
                    <p className="text-sm md:text-xl font-bold text-gray-800">{summary.dinnerCount}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 md:h-80">
                <p className="text-gray-400 text-sm">No meal data available for this month</p>
              </div>
            )}
          </div>
        </div>

        {/* Weekly Breakdown and Meal Rate Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Weekly Meal Breakdown
            </h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyMealBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                  <Bar dataKey="breakfast" fill="#10b981" name="Breakfast" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="lunch" fill="#f59e0b" name="Lunch" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="dinner" fill="#059669" name="Dinner" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiTrendingUp className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Meal Rate Trend
            </h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mealRateHistory}>
                  <defs>
                    <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                  <Area type="monotone" dataKey="rate" stroke="#10b981" fill="url(#rateGradient)" strokeWidth={3} name="Meal Rate" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between items-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl">
              <span className="text-xs md:text-sm text-gray-600">Current Rate:</span>
              <span className="text-base md:text-xl font-bold text-emerald-600">৳{metadata.currentMealRate}</span>
              <span className="text-xs text-gray-600">Based on actual data</span>
            </div>
          </div>
        </div>

        {/* Quick Summary - Responsive */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100 mb-6 md:mb-8">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
            <FiCoffee className="text-emerald-600 w-4 h-4 md:w-5 md:h-5" /> Quick Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex justify-between items-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl">
              <span className="text-xs md:text-sm text-gray-600">Average Cost per Day</span>
              <span className="text-sm md:text-xl font-bold text-emerald-600">৳{daysInMonth > 0 ? Math.round(summary.totalCost / daysInMonth) : 0}</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-amber-50 rounded-lg md:rounded-xl">
              <span className="text-xs md:text-sm text-gray-600">Average Meal per Day</span>
              <span className="text-sm md:text-xl font-bold text-amber-600">{daysInMonth > 0 ? Math.round(summary.totalMeal / daysInMonth) : 0}</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-teal-50 rounded-lg md:rounded-xl">
              <span className="text-xs md:text-sm text-gray-600">Cost per Person</span>
              <span className="text-sm md:text-xl font-bold text-teal-600">৳{metadata.totalMembers > 0 ? Math.round(summary.totalCost / metadata.totalMembers) : 0}</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl">
              <span className="text-xs md:text-sm text-gray-600">Meal per Person</span>
              <span className="text-sm md:text-xl font-bold text-emerald-600">{metadata.totalMembers > 0 ? Math.round(summary.totalMeal / metadata.totalMembers) : 0}</span>
            </div>
            <div className="flex justify-between items-center p-2 md:p-3 bg-emerald-600 rounded-lg md:rounded-xl text-white sm:col-span-2">
              <span className="text-xs md:text-sm font-semibold">Total Revenue (Projected)</span>
              <span className="text-sm md:text-xl font-bold">৳{(summary.totalMeal * metadata.currentMealRate).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Monthly Performance Metrics - Responsive */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Monthly Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
              <p className="text-[10px] md:text-xs text-gray-600">Total Cost</p>
              <p className="text-sm md:text-xl font-bold text-emerald-700">৳{summary.totalCost.toLocaleString()}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-amber-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
              <p className="text-[10px] md:text-xs text-gray-600">Total Meal</p>
              <p className="text-sm md:text-xl font-bold text-amber-700">{summary.totalMeal}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-teal-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
              <p className="text-[10px] md:text-xs text-gray-600">Avg Meal/Day</p>
              <p className="text-sm md:text-xl font-bold text-teal-700">{daysInMonth > 0 ? Math.round(summary.totalMeal / daysInMonth) : 0}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-emerald-50 rounded-lg md:rounded-xl hover:scale-105 transition-transform">
              <p className="text-[10px] md:text-xs text-gray-600">Avg Cost/Day</p>
              <p className="text-sm md:text-xl font-bold text-emerald-700">৳{daysInMonth > 0 ? Math.round(summary.totalCost / daysInMonth) : 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;