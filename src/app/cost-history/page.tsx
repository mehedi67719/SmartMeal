"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { allmanager, consthistory, getmonth, MonthData, CostData } from "@/server/Cost/Costhistory";
import { ObjectId } from "mongodb";

const CostHistoryPage = () => {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState<string | MonthData | "all">("all");
  const [selectedManager, setSelectedManager] = useState<string>("all");
  const [months, setMonths] = useState<MonthData[]>([]);
  const [managers, setManagers] = useState<string[]>([]);
  const [currentData, setCurrentData] = useState<CostData[]>([]);

  useEffect(() => {
    fetchMonthsAndManagers();
  }, []);

  useEffect(() => {
    fetchCostData();
  }, [selectedMonth, selectedManager]);

  const fetchMonthsAndManagers = async () => {
    try {
      const monthsResult = await getmonth();
      if (monthsResult.success && monthsResult.data) {
        setMonths(monthsResult.data);
      }

      const managersResult = await allmanager();
      if (managersResult.success && managersResult.data) {
        setManagers(managersResult.data);
      }
    } catch (error) {
      console.error("Error fetching months and managers:", error);
    }
  };

  const fetchCostData = async () => {
    try {
      const monthValue = selectedMonth === "all" ? "all" : selectedMonth;
      const result = await consthistory(monthValue, selectedManager);
      
      if (result.success && result.data) {
        setCurrentData(result.data);
      } else {
        setCurrentData([]);
      }
    } catch (error) {
      console.error("Error fetching cost data:", error);
      setCurrentData([]);
    }
  };

  const handleViewDetails = (id: ObjectId | undefined) => {
    if (id) {
      router.push(`/cost-history/${id.toString()}`);
    }
  };

  const totalCost = currentData.reduce((sum, item) => sum + (item.grandTotal || 0), 0);

  const formatMonthLabel = (monthObj: MonthData): string => {
    return `${monthObj.month} ${monthObj.year}`;
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedMonth("all");
    } else {
      const [month, year] = value.split("|");
      setSelectedMonth({ month, year: parseInt(year) });
    }
  };

  const getMonthSelectValue = (): string => {
    if (selectedMonth === "all") return "all";
    if (typeof selectedMonth === "object") {
      return `${selectedMonth.month}|${selectedMonth.year}`;
    }
    return "all";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Cost History
          </h1>
          <p className="text-slate-500 text-lg">
            Track and manage all your expenses in one place
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Month
              </label>
              <select
                value={getMonthSelectValue()}
                onChange={handleMonthChange}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
              >
                <option value="all">All Months</option>
                {months.map((month, index) => (
                  <option key={index} value={`${month.month}|${month.year}`}>
                    {formatMonthLabel(month)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Manager
              </label>
              <select
                value={selectedManager}
                onChange={(e) => setSelectedManager(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
              >
                <option value="all">All Managers</option>
                {managers.map((manager, index) => (
                  <option key={index} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-100 mb-1 uppercase tracking-wide">
                Total Cost
              </p>
              <p className="text-4xl font-bold text-white">
                ৳{totalCost.toFixed(2)}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          {currentData.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Manager
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Buyer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {currentData.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-all duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                          {item.ManagerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-lg">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                          {item.buyer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                          ৳{(item.grandTotal || 0).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleViewDetails(item._id)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all duration-200 font-medium text-sm"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-600 font-medium">
                    Total {currentData.length} transactions found
                  </div>
                  <div className="text-sm font-bold text-indigo-600">
                    Total Amount: ৳{totalCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                No data found
              </h3>
              <p className="text-sm text-slate-500">
                No cost history available for the selected month and manager.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostHistoryPage;