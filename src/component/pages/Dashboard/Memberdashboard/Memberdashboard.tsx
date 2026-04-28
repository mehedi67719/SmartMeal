"use client";
import React, { useState, useEffect } from "react";
import {
  FiCalendar,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiCoffee,
  FiSun,
  FiMoon,
  FiChevronLeft,
  FiChevronRight,
  FiPieChart,
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiBarChart2,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const Memberdashboard = () => {
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const mealRate = 65;

  const dailyMeals = [
    { day: 1, breakfast: true, lunch: true, dinner: false, total: 2 },
    { day: 2, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 3, breakfast: false, lunch: true, dinner: true, total: 2 },
    { day: 4, breakfast: true, lunch: true, dinner: false, total: 2 },
    { day: 5, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 6, breakfast: false, lunch: true, dinner: false, total: 1 },
    { day: 7, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 8, breakfast: true, lunch: false, dinner: true, total: 2 },
    { day: 9, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 10, breakfast: false, lunch: true, dinner: true, total: 2 },
    { day: 11, breakfast: true, lunch: true, dinner: false, total: 2 },
    { day: 12, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 13, breakfast: true, lunch: false, dinner: true, total: 2 },
    { day: 14, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 15, breakfast: false, lunch: true, dinner: false, total: 1 },
    { day: 16, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 17, breakfast: true, lunch: true, dinner: false, total: 2 },
    { day: 18, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 19, breakfast: false, lunch: true, dinner: true, total: 2 },
    { day: 20, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 21, breakfast: true, lunch: false, dinner: true, total: 2 },
    { day: 22, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 23, breakfast: false, lunch: true, dinner: false, total: 1 },
    { day: 24, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 25, breakfast: true, lunch: true, dinner: false, total: 2 },
    { day: 26, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 27, breakfast: false, lunch: true, dinner: true, total: 2 },
    { day: 28, breakfast: true, lunch: true, dinner: true, total: 3 },
    { day: 29, breakfast: true, lunch: false, dinner: true, total: 2 },
    { day: 30, breakfast: true, lunch: true, dinner: true, total: 3 },
  ];

  const today = currentDate.getDate();
  const daysInMonth = 30;

  const totalMealsThisMonth = dailyMeals.reduce((sum, day) => sum + day.total, 0);
  const totalCost = totalMealsThisMonth * mealRate;
  const totalDeposit = 2500;
  const dueAmount = totalCost - totalDeposit;
  const isDue = dueAmount > 0;

  const mealTrendData = dailyMeals.slice(0, today).map((day) => ({
    day: day.day,
    meals: day.total,
  }));

  const weeklyMealData = [
    { week: "Week 1", meals: dailyMeals.slice(0, 7).reduce((sum, d) => sum + d.total, 0) },
    { week: "Week 2", meals: dailyMeals.slice(7, 14).reduce((sum, d) => sum + d.total, 0) },
    { week: "Week 3", meals: dailyMeals.slice(14, 21).reduce((sum, d) => sum + d.total, 0) },
    { week: "Week 4", meals: dailyMeals.slice(21, 30).reduce((sum, d) => sum + d.total, 0) },
  ];

  const breakfastCount = dailyMeals.filter(d => d.breakfast).length;
  const lunchCount = dailyMeals.filter(d => d.lunch).length;
  const dinnerCount = dailyMeals.filter(d => d.dinner).length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 md:p-3 shadow-lg rounded-lg border border-green-200">
          <p className="text-sm font-semibold text-gray-800">Day {label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" min-h-screen container">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-600">Member Dashboard</h1>
            <p className="text-gray-500 text-xs md:text-sm mt-1">Track your meals, deposits & costs</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 bg-white rounded-xl shadow-md p-1 md:p-2 border border-gray-200">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            >
              <FiChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="flex items-center gap-1 md:gap-2 px-2 md:px-4">
              <FiCalendar className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="text-sm md:text-lg font-semibold text-gray-700 bg-transparent cursor-pointer outline-none"
              >
                {months.map((month, idx) => (
                  <option key={idx} value={idx}>{month}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="text-sm md:text-lg font-semibold text-gray-700 bg-transparent cursor-pointer outline-none"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 border border-gray-100">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
                <FiCoffee className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm font-medium">Total Meals</h3>
            <p className="text-xl md:text-3xl font-bold text-gray-800 mt-1">{totalMealsThisMonth}</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1">{months[selectedMonth]} {selectedYear}</p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 border border-gray-100">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
                <FiDollarSign className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm font-medium">Total Cost</h3>
            <p className="text-xl md:text-3xl font-bold text-gray-800 mt-1">৳{totalCost.toLocaleString()}</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1">Meal Rate: ৳{mealRate}</p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 border border-gray-100">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className="bg-emerald-100 rounded-lg md:rounded-xl p-2 md:p-3">
                <FiTrendingUp className="w-4 h-4 md:w-6 md:h-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-gray-500 text-xs md:text-sm font-medium">Total Deposit</h3>
            <p className="text-xl md:text-3xl font-bold text-gray-800 mt-1">৳{totalDeposit.toLocaleString()}</p>
            <p className="text-[10px] md:text-xs text-gray-400 mt-1">This month</p>
          </div>

          <div className={`rounded-xl md:rounded-2xl shadow-md p-3 md:p-6 border ${isDue ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
              <div className={`rounded-lg md:rounded-xl p-2 md:p-3 ${isDue ? 'bg-red-200' : 'bg-green-200'}`}>
                {isDue ? (
                  <FiAlertCircle className={`w-4 h-4 md:w-6 md:h-6 text-red-600`} />
                ) : (
                  <FiCheckCircle className={`w-4 h-4 md:w-6 md:h-6 text-green-600`} />
                )}
              </div>
            </div>
            <h3 className="text-gray-600 text-xs md:text-sm font-medium">Due Amount</h3>
            <p className={`text-xl md:text-3xl font-bold mt-1 ${isDue ? 'text-red-600' : 'text-green-600'}`}>
              {isDue ? `৳${dueAmount.toLocaleString()}` : "No Due"}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 mt-1">
              {isDue ? `You need to pay ৳${dueAmount}` : "All paid ✓"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiActivity className="text-emerald-600" /> Daily Meal Trend
              <span className="text-xs text-gray-500">({months[selectedMonth]})</span>
            </h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mealTrendData}>
                  <defs>
                    <linearGradient id="mealGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="meals" stroke="#10b981" fill="url(#mealGradient)" strokeWidth={2} name="Meals" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiBarChart2 className="text-emerald-600" /> Weekly Meal Summary
            </h3>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyMealData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="meals" fill="#10b981" name="Total Meals" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiSun className="text-yellow-500" /> Breakfast
            </h3>
            <p className="text-3xl md:text-4xl font-bold text-gray-800">{breakfastCount}</p>
            <p className="text-xs text-gray-500 mt-2">Total breakfast this month</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${(breakfastCount / totalMealsThisMonth) * 100}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{((breakfastCount / totalMealsThisMonth) * 100).toFixed(1)}% of total meals</p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiSun className="text-orange-500" /> Lunch
            </h3>
            <p className="text-3xl md:text-4xl font-bold text-gray-800">{lunchCount}</p>
            <p className="text-xs text-gray-500 mt-2">Total lunch this month</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(lunchCount / totalMealsThisMonth) * 100}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{((lunchCount / totalMealsThisMonth) * 100).toFixed(1)}% of total meals</p>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiMoon className="text-teal-500" /> Dinner
            </h3>
            <p className="text-3xl md:text-4xl font-bold text-gray-800">{dinnerCount}</p>
            <p className="text-xs text-gray-500 mt-2">Total dinner this month</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(dinnerCount / totalMealsThisMonth) * 100}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{((dinnerCount / totalMealsThisMonth) * 100).toFixed(1)}% of total meals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiPieChart className="text-emerald-600" /> Cost Breakdown
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Total Meals</span>
                  <span className="font-semibold">{totalMealsThisMonth} × ৳{mealRate}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `100%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Total Cost</span>
                  <span className="font-semibold text-emerald-600">৳{totalCost.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `100%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Total Deposit</span>
                  <span className="font-semibold text-blue-600">৳{totalDeposit.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(totalDeposit / totalCost) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Due Amount</span>
                  <span className={`font-semibold ${isDue ? 'text-red-600' : 'text-green-600'}`}>
                    {isDue ? `৳${dueAmount.toLocaleString()}` : "No Due"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${isDue ? 'bg-red-500' : 'bg-green-500'} h-2 rounded-full`} style={{ width: `${(dueAmount / totalCost) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 flex items-center gap-2">
              <FiCoffee className="text-emerald-600" /> Financial Summary
            </h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                <span className="text-gray-600">Meal Rate</span>
                <span className="text-xl font-bold text-emerald-600">৳{mealRate} per meal</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                <span className="text-gray-600">Total Meals × Rate</span>
                <span className="text-xl font-bold text-blue-600">{totalMealsThisMonth} × ৳{mealRate} = ৳{totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                <span className="text-gray-600">Average Daily Cost</span>
                <span className="text-xl font-bold text-purple-600">৳{Math.round(totalCost / daysInMonth)}</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-xl ${isDue ? 'bg-red-50' : 'bg-green-50'}`}>
                <span className="text-gray-600">Payment Status</span>
                <span className={`text-xl font-bold ${isDue ? 'text-red-600' : 'text-green-600'}`}>
                  {isDue ? `${((dueAmount / totalCost) * 100).toFixed(1)}% Due` : "100% Paid"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8 bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4">Monthly Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center p-2 md:p-3 bg-emerald-50 rounded-xl">
              <p className="text-[10px] md:text-xs text-gray-600">Total Meals</p>
              <p className="text-lg md:text-2xl font-bold text-emerald-700">{totalMealsThisMonth}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-orange-50 rounded-xl">
              <p className="text-[10px] md:text-xs text-gray-600">Avg Meals/Day</p>
              <p className="text-lg md:text-2xl font-bold text-orange-700">{(totalMealsThisMonth / daysInMonth).toFixed(1)}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-blue-50 rounded-xl">
              <p className="text-[10px] md:text-xs text-gray-600">Total Cost</p>
              <p className="text-lg md:text-2xl font-bold text-blue-700">৳{totalCost.toLocaleString()}</p>
            </div>
            <div className="text-center p-2 md:p-3 bg-purple-50 rounded-xl">
              <p className="text-[10px] md:text-xs text-gray-600">Avg Cost/Day</p>
              <p className="text-lg md:text-2xl font-bold text-purple-700">৳{Math.round(totalCost / daysInMonth)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memberdashboard;