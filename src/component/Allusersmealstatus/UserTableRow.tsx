"use client";
import React from "react";
import { FiUserCheck, FiUserX, FiPower, FiEye } from "react-icons/fi";

interface UserTableRowProps {
  user: any;
  userCost: number;
  userDeposit: number;
  userDue: number;
  mealRate: number;
  isActive: boolean;
  updating: boolean;
  expandedUser: string | null;
  onToggleStatus: (email: string, status: boolean, name: string) => void;
  onExpandUser: (userId: string) => void;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  userCost,
  userDeposit,
  userDue,
  isActive,
  updating,
  expandedUser,
  onToggleStatus,
  onExpandUser,
}) => {
  const isExpanded = expandedUser === user.id;

  return (
    <React.Fragment>
      <tr className="border-b hover:bg-gray-50">
        <td className="py-3 px-4">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
          <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
            {user.accountType}
          </span>
        </td>
        <td className="text-center py-3 px-4 font-semibold text-amber-600">
          {user.totalBreakfast}
        </td>
        <td className="text-center py-3 px-4 font-semibold text-orange-600">
          {user.totalLunch}
        </td>
        <td className="text-center py-3 px-4 font-semibold text-teal-600">
          {user.totalDinner}
        </td>
        <td className="text-center py-3 px-4 font-bold text-emerald-600">
          {user.totalMeals}
        </td>
        <td className="text-center py-3 px-4">
          ৳{userCost.toLocaleString()}
        </td>
        <td className="text-center py-3 px-4">
          ৳{userDeposit.toLocaleString()}
        </td>
        <td className={`text-center py-3 px-4 font-semibold ${userDue > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {userDue > 0 ? `৳${userDue.toLocaleString()}` : "Paid"}
        </td>
        <td className="text-center py-3 px-4">
          {isActive ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
              <FiUserCheck className="w-3 h-3" /> Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
              <FiUserX className="w-3 h-3" /> Inactive
            </span>
          )}
        </td>
        <td className="text-center py-3 px-4">
          <button
            onClick={() => onToggleStatus(user.email, isActive, user.name)}
            disabled={updating}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 mx-auto ${
              isActive 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FiPower className="w-3 h-3" />
            {isActive ? 'Turn Off' : 'Turn On'}
          </button>
        </td>
        <td className="text-center py-3 px-4">
          <button
            onClick={() => {
              console.log("Button clicked for user:", user.id);
              onExpandUser(user.id);
            }}
            className="px-3 py-1 rounded-lg text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1 mx-auto"
          >
            <FiEye className="w-3 h-3" />
            {isExpanded ? 'Hide' : 'View'}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={11} className="p-4">
            <div className="overflow-x-auto">
              <h4 className="font-semibold mb-2 text-gray-700">Daily Meals - {user.name}</h4>
              <table className="w-full text-sm border rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-center border text-gray-600">Date</th>
                    <th className="p-2 text-center border text-gray-600">Breakfast</th>
                    <th className="p-2 text-center border text-gray-600">Lunch</th>
                    <th className="p-2 text-center border text-gray-600">Dinner</th>
                    <th className="p-2 text-center border text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {user.dailyMeals && user.dailyMeals.length > 0 ? (
                    user.dailyMeals.map((day: any) => {
                      const total = (day.breakfast ? 1 : 0) + (day.lunch ? 1 : 0) + (day.dinner ? 1 : 0);
                      return (
                        <tr key={day.date} className="border-b hover:bg-white">
                          <td className="p-2 text-center border text-gray-700">Day {day.date}</td>
                          <td className="p-2 text-center border">
                            {day.breakfast ? (
                              <span className="text-green-600 font-semibold">✓</span>
                            ) : (
                              <span className="text-gray-400">✗</span>
                            )}
                          </td>
                          <td className="p-2 text-center border">
                            {day.lunch ? (
                              <span className="text-green-600 font-semibold">✓</span>
                            ) : (
                              <span className="text-gray-400">✗</span>
                            )}
                          </td>
                          <td className="p-2 text-center border">
                            {day.dinner ? (
                              <span className="text-green-600 font-semibold">✓</span>
                            ) : (
                              <span className="text-gray-400">✗</span>
                            )}
                          </td>
                          <td className="p-2 text-center border font-semibold text-emerald-600">
                            {total}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No daily meal data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};