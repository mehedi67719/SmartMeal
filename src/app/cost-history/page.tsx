"use client";
import { allmanager, allmonth, costhistory } from '@/server/Cost/Costhistory';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [month, setmonth] = useState("all");
  const [manager, setmanager] = useState("all");
  const [monthOptions, setMonthOptions] = useState<string[]>([]);
  const [managerOptions, setManagerOptions] = useState<string[]>([]);
  const [costData, setCostData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const response = await allmonth();
        if (response.success && response.data) {
          setMonthOptions(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthData();
  }, []);

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const response = await allmanager();
        if (response.success && response.allmanager) {
          setManagerOptions(response.allmanager);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchManagerData();
  }, []);

  useEffect(() => {
    const fetchCostHistory = async () => {
      try {
        const filter = { month: month, manager: manager };
        const response = await costhistory(filter);
        if (response.success && response.data) {
          setCostData(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCostHistory();
  }, [month, manager]);

  const handlemonthchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setmonth(e.target.value);
  };

  const handlemanagerchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setmanager(e.target.value);
  };

  return (
    <div className="py-10 px-3">
      <div className="container mx-auto px-4 max-w-full lg:max-w-7xl">
        <h1 className="text-center text-3xl lg:text-4xl font-semibold mb-8" style={{ color: '#2e7d32' }}>
          📊 Cost History
        </h1>

        <div className="flex gap-5 justify-center flex-wrap mb-10">
          <select 
            value={month} 
            onChange={handlemonthchange}
            className="px-6 py-3 text-base rounded-lg border-2 border-green-500 bg-white font-medium cursor-pointer outline-none transition-all duration-300"
            style={{ color: '#2e7d32' }}
          >
            <option value="all">📅 All Months</option>
            {monthOptions.map((monthItem, index) => (
              <option key={index} value={monthItem}>
                {monthItem}
              </option>
            ))}
          </select>

          <select 
            value={manager} 
            onChange={handlemanagerchange}
            className="px-6 py-3 text-base rounded-lg border-2 border-green-500 bg-white font-medium cursor-pointer outline-none transition-all duration-300"
            style={{ color: '#2e7d32' }}
          >
            <option value="all">👨‍💼 All Managers</option>
            {managerOptions.map((managerItem, index) => (
              <option key={index} value={managerItem}>
                {managerItem}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full text-sm min-w-[800px] lg:min-w-full">
              <thead>
                <tr className="text-white font-semibold" style={{ backgroundColor: '#2e7d32' }}>
                  <th className="p-4 text-left whitespace-nowrap">Date</th>
                  <th className="p-4 text-left whitespace-nowrap">Month</th>
                  <th className="p-4 text-left whitespace-nowrap">Manager</th>
                  <th className="p-4 text-left whitespace-nowrap">Category</th>
                  <th className="p-4 text-left whitespace-nowrap">Buyer</th>
                  <th className="p-4 text-left whitespace-nowrap">Items</th>
                  <th className="p-4 text-right whitespace-nowrap">Grand Total</th>
                  <th className="p-4 text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {costData.map((cost, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-gray-200 transition-colors duration-300 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-green-50'
                    } hover:bg-green-100`}
                  >
                    <td className="p-3 px-4 text-gray-700 whitespace-nowrap">{cost.date}</td>
                    <td className="p-3 px-4 text-gray-700 whitespace-nowrap">
                      <span className="bg-green-50 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap" style={{ color: '#2e7d32' }}>
                        {cost.month}
                      </span>
                    </td>
                    <td className="p-3 px-4 text-gray-700 whitespace-nowrap">
                      <span className="font-medium whitespace-nowrap" style={{ color: '#2e7d32' }}>
                        {cost.ManagerName}
                      </span>
                    </td>
                    <td className="p-3 px-4 text-gray-700 whitespace-nowrap">
                      <span className="bg-orange-50 px-2 py-1 rounded-md text-xs whitespace-nowrap">
                        {cost.category}
                      </span>
                    </td>
                    <td className="p-3 px-4 text-gray-700 whitespace-nowrap">{cost.buyer}</td>
                    <td className="p-3 px-4 text-gray-700 whitespace-nowrap">
                      {cost.items?.length || 0} items
                    </td>
                    <td className="p-3 px-4 text-right font-bold whitespace-nowrap" style={{ color: '#2e7d32', fontSize: '16px' }}>
                      ৳{cost.grandTotal?.toLocaleString()}
                    </td>
                    <td className="p-3 px-4 text-center whitespace-nowrap">
                      <Link href={`/cost-history/${cost._id}`}>
                        <button 
                          className="bg-green-500 text-white border-none px-3 py-1.5 rounded-md cursor-pointer text-xs font-medium transition-colors duration-300 hover:bg-green-700 whitespace-nowrap"
                        >
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {costData.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-lg">
              No cost history found
            </div>
          )}
        </div>

        <div className="mt-5 text-center font-medium" style={{ color: '#2e7d32' }}>
          Total Records: {costData.length}
        </div>
      </div>
    </div>
  );
};

export default Page;