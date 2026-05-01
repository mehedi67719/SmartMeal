"use client";
import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  FiChevronLeft,
  FiCoffee,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import Link from "next/link";
import {
  getAllUsersMealDetails,
  updateUserMealStatus,
  getAllUsersDeposits,
  getMonthlyMealRate,
} from "@/server/Allusersmealdetels";
import { LoadingSpinner } from "@/component/pages/Dashboard/LoadingSpinner";
import { SearchBar } from "@/component/Allusersmealstatus/SearchBar";
import { MonthSelector } from "@/component/pages/Dashboard/MonthSelector";
import { StatsCard } from "@/component/Allusersmealstatus/StatsCard";
import { UserTableRow } from "@/component/Allusersmealstatus/UserTableRow";

const AllUsersMealStatus = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userMealStatus, setUserMealStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const [userDeposits, setUserDeposits] = useState<{ [key: string]: number }>(
    {},
  );
  const [mealRate, setMealRate] = useState<number>(65);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const monthName = months[selectedMonth];

      const [mealDetails, depositsMap, rate] = await Promise.all([
        getAllUsersMealDetails(monthName, selectedYear),
        getAllUsersDeposits(monthName, selectedYear),
        getMonthlyMealRate(monthName, selectedYear),
      ]);

      setData(mealDetails);
      setUserDeposits(depositsMap);
      setMealRate(rate);

      if (mealDetails?.success && mealDetails?.data?.users) {
        const initialStatus: { [key: string]: boolean } = {};
        mealDetails.data.users.forEach((user: any) => {
          initialStatus[user.email] = user.totalMeals > 0;
        });
        setUserMealStatus(initialStatus);
      }

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

  const isUserActive = (userEmail: string): boolean => {
    return userMealStatus[userEmail] !== false;
  };

  const toggleUserStatus = async (
    userEmail: string,
    currentStatus: boolean,
    userName: string,
  ) => {
    const action = currentStatus ? "deactivate" : "activate";
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} ${userName}'s meal status?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: currentStatus ? "#dc2626" : "#10b981",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (!result.isConfirmed) return;

    setUpdating(userEmail);
    const newStatus = !currentStatus;
    const updateResult = await updateUserMealStatus(
      userEmail,
      newStatus,
      months[selectedMonth],
      selectedYear,
    );

    if (updateResult.success) {
      setUserMealStatus((prev) => ({ ...prev, [userEmail]: newStatus }));

      if (data?.data?.users) {
        const updatedUsers = data.data.users.map((user: any) => {
          if (user.email === userEmail) {
            return { ...user, adminMealStatus: newStatus };
          }
          return user;
        });
        setData({ ...data, data: { ...data.data, users: updatedUsers } });
      }

      await Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${userName}'s status changed to ${newStatus ? "Active" : "Inactive"}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Failed!",
        text: updateResult.error,
      });
    }
    setUpdating(null);
  };

  // ফিক্স: সঠিক টগল ফাংশন
  const toggleExpandUser = useCallback((userId: string) => {
    console.log("Toggling user:", userId);
    console.log("Current expanded:", expandedUser);
    setExpandedUser((prev) => {
      if (prev === userId) {
        console.log("Hiding details for:", userId);
        return null;
      } else {
        console.log("Showing details for:", userId);
        return userId;
      }
    });
  }, []);

  const filteredUsers =
    data?.data?.users?.filter(
      (user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const totalMeals = filteredUsers.reduce(
    (sum: number, u: any) => sum + u.totalMeals,
    0,
  );
  const totalCost = totalMeals * mealRate;
  const totalDeposit = Object.values(userDeposits).reduce((a, b) => a + b, 0);
  const activeUsers = filteredUsers.filter((u: any) =>
    isUserActive(u.email),
  ).length;

  if (loading) return <LoadingSpinner />;

  if (!data?.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-red-600 text-lg">Failed to load data</p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <FiChevronLeft className="w-5 h-5 text-emerald-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-emerald-600">
                All Users Meal Status
              </h1>
              <p className="text-gray-500 text-sm">
                Manage all members meal status
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <MonthSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              months={months}
              onMonthChange={setSelectedMonth}
              onYearChange={setSelectedYear}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Users"
            value={filteredUsers.length}
            icon={<FiUsers className="w-5 h-5" />}
            subtext={`${activeUsers} active`}
          />
          <StatsCard
            title="Total Meals"
            value={totalMeals}
            icon={<FiCoffee className="w-5 h-5 text-blue-600" />}
            subtext="This month"
            iconColor="text-blue-600"
            bgColor="bg-blue-100"
          />
          <StatsCard
            title="Total Cost"
            value={`৳${totalCost.toLocaleString()}`}
            icon={<FiDollarSign className="w-5 h-5 text-purple-600" />}
            subtext={`Rate: ৳${mealRate}`}
            iconColor="text-purple-600"
            bgColor="bg-purple-100"
          />
          <StatsCard
            title="Total Due"
            value={`৳${(totalCost - totalDeposit).toLocaleString()}`}
            icon={<FiTrendingUp className="w-5 h-5 text-red-600" />}
            subtext="Pending payment"
            iconColor="text-red-600"
            bgColor="bg-red-100"
          />
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Breakfast
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Lunch
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Dinner
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Total
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Cost
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Deposit
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Due
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user: any) => {
                  const userCost = user.totalMeals * mealRate;
                  const userDeposit = userDeposits[user.email] || 0;
                  const userDue = userCost - userDeposit;
                  const isActive = isUserActive(user.email);

                  return (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      userCost={userCost}
                      userDeposit={userDeposit}
                      userDue={userDue}
                      mealRate={mealRate}
                      isActive={isActive}
                      updating={updating === user.email}
                      expandedUser={expandedUser}
                      onToggleStatus={toggleUserStatus}
                      onExpandUser={toggleExpandUser}
                    />
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50 font-semibold">
                <tr>
                  <td className="py-3 px-4 text-gray-800">Total</td>
                  <td className="text-center py-3 px-4 text-amber-600">
                    {filteredUsers.reduce((s, u) => s + u.totalBreakfast, 0)}
                  </td>
                  <td className="text-center py-3 px-4 text-orange-600">
                    {filteredUsers.reduce((s, u) => s + u.totalLunch, 0)}
                  </td>
                  <td className="text-center py-3 px-4 text-teal-600">
                    {filteredUsers.reduce((s, u) => s + u.totalDinner, 0)}
                  </td>
                  <td className="text-center py-3 px-4 text-emerald-600">
                    {totalMeals}
                  </td>
                  <td className="text-center py-3 px-4 text-purple-600">
                    ৳{totalCost.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-4 text-blue-600">
                    ৳{totalDeposit.toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-4 text-red-600">
                    ৳{(totalCost - totalDeposit).toLocaleString()}
                  </td>
                  <td className="text-center py-3 px-4 text-emerald-600">
                    {activeUsers} Active
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          {months[selectedMonth]} {selectedYear} | Meal Rate: ৳{mealRate}
        </div>
      </div>
    </div>
  );
};

export default AllUsersMealStatus;
