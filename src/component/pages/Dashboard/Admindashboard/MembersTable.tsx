"use client";
import React from "react";
import Link from "next/link";
import { FiUsers, FiUserCheck, FiUserX, FiEye } from "react-icons/fi";

interface MembersTableProps {
  members: Array<{
    id: string;
    name: string;
    email: string;
    accountType: string;
    hasMealToday: boolean;
  }>;
  selectedMonth: number;
  selectedYear: number;
  membersWithMealToday: number;
  membersWithoutMealToday: number;
  months: string[];
}

export const MembersTable: React.FC<MembersTableProps> = ({
  members,
  selectedMonth,
  selectedYear,
  membersWithMealToday,
  membersWithoutMealToday,
  months,
}) => {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-gray-100 mb-6 md:mb-8 overflow-x-auto">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
          <FiUsers className="text-emerald-600" /> All Members - Today's Meal Status
        </h3>
        <Link
          href='allusers-meals'
          className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs md:text-sm"
        >
          <FiEye className="w-4 h-4" />
          <span>View All Members Meal Status</span>
        </Link>
      </div>
      <div className="min-w-[600px]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-2 text-xs md:text-sm font-semibold text-gray-600">Member Name</th>
              <th className="text-left py-3 px-2 text-xs md:text-sm font-semibold text-gray-600">Email</th>
              <th className="text-center py-3 px-2 text-xs md:text-sm font-semibold text-gray-600">Account Type</th>
              <th className="text-center py-3 px-2 text-xs md:text-sm font-semibold text-gray-600">Today's Meal Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-xs md:text-sm font-medium text-gray-800">{member.name}</td>
                <td className="py-3 px-2 text-xs md:text-sm text-gray-500">{member.email}</td>
                <td className="text-center py-3 px-2 text-xs md:text-sm text-gray-600">{member.accountType}</td>
                <td className="text-center py-3 px-2">
                  {member.hasMealToday ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      <FiUserCheck className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                      <FiUserX className="w-3 h-3" /> Inactive
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td className="py-3 px-2 text-xs md:text-sm text-gray-800">Total</td>
              <td className="py-3 px-2">{members.length} Users</td>
              <td className="py-3 px-2"></td>
              <td className="text-center py-3 px-2 text-xs md:text-sm">
                <span className="text-green-700">{membersWithMealToday} Active</span> | 
                <span className="text-gray-600 ml-1">{membersWithoutMealToday} Inactive</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};