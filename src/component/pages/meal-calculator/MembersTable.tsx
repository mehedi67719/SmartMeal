'use client';

import React from 'react';
import { Users, Calculator, Trash2, Minus, Plus } from 'lucide-react';
import StatsCards from './StatsCards';

interface Member {
  id: string;
  name: string;
  totalMeals: number;
  totalDeposit: number;
  cost: number;
  due: number;
  status: 'due' | 'paid' | 'extra';
}

interface MembersTableProps {
  members: Member[];
  isCalculated: boolean;
  totalMeals: number;
  totalDeposit: number;
  totalCost: number;
  totalDue: number;
  costPerMeal: number;
  onUpdateMeals: (id: string, meals: number) => void;
  onUpdateDeposit: (id: string, amount: number) => void;
  onRemoveMember: (id: string) => void;
  onCalculate: () => void;
}

export default function MembersTable({
  members,
  isCalculated,
  totalMeals,
  totalDeposit,
  totalCost,
  totalDue,
  costPerMeal,
  onUpdateMeals,
  onUpdateDeposit,
  onRemoveMember,
  onCalculate,
}: MembersTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 mb-12">
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-xl flex items-center gap-3">
            <Users className="w-6 h-6" />
            Members List
          </h3>
          <div className="bg-white/20 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-semibold">{members.length} Members</span>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Member</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Meals</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Deposit (৳)</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Cost (৳)</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Balance</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900">{member.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => onUpdateMeals(member.id, Math.max(0, member.totalMeals - 1))}
                      className="w-9 h-9 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-gray-700 font-bold flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={member.totalMeals}
                      onChange={(e) => onUpdateMeals(member.id, Math.max(0, Number(e.target.value)))}
                      className="w-20 px-3 py-2 text-center border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none font-semibold text-base"
                    />
                    <button
                      onClick={() => onUpdateMeals(member.id, member.totalMeals + 1)}
                      className="w-9 h-9 bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-colors text-white font-bold flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="number"
                    value={member.totalDeposit}
                    onChange={(e) => onUpdateDeposit(member.id, Math.max(0, Number(e.target.value)))}
                    className="w-32 px-3 py-2 text-center border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none font-medium"
                  />
                </td>
                <td className="px-6 py-4 text-center font-bold text-emerald-600 text-base">
                  {isCalculated && member.cost > 0 ? `${Math.round(member.cost)}` : member.cost === 0 ? '0' : '-'}
                </td>
                <td className={`px-6 py-4 text-center font-bold text-sm ${
                  !isCalculated ? 'text-gray-400' :
                  member.due > 0 ? 'text-red-600' : member.due < 0 ? 'text-green-600' : 'text-emerald-600'
                }`}>
                  {!isCalculated ? '-' :
                    member.due > 0 ? `Due ${Math.round(member.due)}` :
                    member.due < 0 ? `Extra ${Math.abs(Math.round(member.due))}` :
                    'Paid'}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onRemoveMember(member.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StatsCards
        totalMeals={totalMeals}
        totalDeposit={totalDeposit}
        totalCost={totalCost}
        totalDue={totalDue}
        costPerMeal={costPerMeal}
        isCalculated={isCalculated}
        onCalculate={onCalculate}
      />
    </div>
  );
}