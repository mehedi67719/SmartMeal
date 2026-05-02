"use client";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { FiSearch, FiCalendar, FiUser, FiDollarSign, FiEye, FiRefreshCw } from "react-icons/fi";
import { allmanager, allmonth, costhistory } from "@/server/Cost/Costhistory";

type CostItem = {
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
};

type CostData = {
  _id: string;
  date: string;
  month: string;
  Manageremail: string;
  ManagerName: string;
  category: string;
  buyer: string;
  note: string;
  items: CostItem[];
  grandTotal: number;
  createdAt: string;
};

interface CustomSessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  secretCode?: string;
  accountType?: string;
  messName?: string;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<CostData[]>([]);
  const [filteredData, setFilteredData] = useState<CostData[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [managers, setManagers] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedManager, setSelectedManager] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsSessionReady(true);
    } else if (status === 'unauthenticated') {
      setLoading(false);
      setIsSessionReady(true);
    }
  }, [status]);

  useEffect(() => {
    if (session?.user && isSessionReady) {
      fetchFilters();
    }
  }, [session, isSessionReady]);

  useEffect(() => {
    if (session?.user && isSessionReady) {
      fetchData();
    }
  }, [selectedMonth, selectedManager, session, isSessionReady]);

  const fetchFilters = async () => {
    try {
      const [monthResult, managerResult] = await Promise.all([
        allmonth(),
        allmanager()
      ]);
      
      if (monthResult.success && monthResult.data) {
        setMonths(monthResult.data);
      }

      if (managerResult.success && managerResult.allmanager) {
        setManagers(managerResult.allmanager);
      }
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setIsFiltering(true);
    try {
      const filter: any = {};
      
      if (selectedMonth && selectedMonth !== "all" && selectedMonth !== "") {
        filter.month = selectedMonth;
      }
      
      if (selectedManager && selectedManager !== "all" && selectedManager !== "") {
        filter.manager = selectedManager;
      }

      console.log("Fetching with filter:", filter);

      const result = await costhistory(filter);
      
      if (result.success && result.data) {
        const formattedData: CostData[] = result.data.map((item: any) => ({
          ...item,
          _id: item._id.toString(),
          createdAt: item.createdAt?.toString() || new Date().toISOString()
        }));
        setData(formattedData);
        setFilteredData(formattedData);
        
        console.log("Fetched data count:", formattedData.length);
        console.log("Selected manager:", selectedManager);
        if (selectedManager) {
          console.log("Data for selected manager:", formattedData.filter(d => d.ManagerName === selectedManager).length);
        }
      } else {
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching cost history:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
      setIsFiltering(false);
    }
  };

  useEffect(() => {
    let filtered = [...data];
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.ManagerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.buyer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMonth(value);
  };

  const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log("Manager selected:", value);
    setSelectedManager(value);
  };

  const handleResetFilters = () => {
    setSelectedMonth("");
    setSelectedManager("");
    setSearchTerm("");
  };

  const getTotalAmount = () => {
    return filteredData.reduce((sum, item) => sum + (item.grandTotal || 0), 0);
  };

  if (status === 'loading' || !isSessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">Please login to view cost history</p>
          <Link href="/login">
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">Cost History</h1>
          <p className="text-green-600 mt-1">View and manage all cost entries</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiCalendar className="text-green-600" />
                Filter by Month
              </label>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Months</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiUser className="text-green-600" />
                Filter by Manager
              </label>
              <select
                value={selectedManager}
                onChange={handleManagerChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">All Managers</option>
                {managers.map((manager) => (
                  <option key={manager} value={manager}>
                    {manager}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiSearch className="text-green-600" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by manager, category, buyer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <FiRefreshCw />
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Entries</p>
                <p className="text-2xl font-bold">{filteredData.length}</p>
              </div>
              <FiDollarSign className="text-3xl opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Amount</p>
                <p className="text-2xl font-bold">৳{getTotalAmount().toLocaleString()}</p>
              </div>
              <FiDollarSign className="text-3xl opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Unique Managers</p>
                <p className="text-2xl font-bold">{new Set(data.map(d => d.ManagerName)).size}</p>
              </div>
              <FiUser className="text-3xl opacity-80" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading cost history...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No cost entries found</p>
            <Link href="/cost-entry">
              <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Add New Entry
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-700 text-white">
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Month</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Manager</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Buyer</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold">Total</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item._id} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 text-gray-700">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                          {item.month}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{item.ManagerName}</p>
                          <p className="text-xs text-gray-500">{item.Manageremail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{item.buyer || "N/A"}</td>
                      <td className="px-6 py-4 text-right font-bold text-green-700">
                        ৳{item.grandTotal.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link href={`/cost-history/${item._id}`}>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 mx-auto">
                            <FiEye />
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
      
        {selectedManager && !loading && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Showing {filteredData.length} entries for manager: <strong>{selectedManager}</strong>
            {selectedMonth && ` in ${selectedMonth}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;