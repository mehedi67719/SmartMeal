'use client';

import React from 'react';
import { Users, Utensils, DollarSign, UserPlus, RefreshCw } from 'lucide-react';

interface MemberFormCardProps {
  newMemberName: string;
  newMemberMeals: number | '';
  newMemberDeposit: number | '';
  onNameChange: (value: string) => void;
  onMealsChange: (value: number | '') => void;
  onDepositChange: (value: number | '') => void;
  onAddMember: () => void;
  onReset: () => void;
}

export default function MemberFormCard({
  newMemberName,
  newMemberMeals,
  newMemberDeposit,
  onNameChange,
  onMealsChange,
  onDepositChange,
  onAddMember,
  onReset,
}: MemberFormCardProps) {
  return (
    <div className="w-full bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 transition-all duration-300">
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center">
          <UserPlus className="w-7 h-7 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Add New Member</h3>
          <p className="text-sm text-gray-500 mt-1">Enter member details to get started</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        
        <div className="relative">
        
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Member Name"
            className="w-full pl-14 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm font-medium placeholder:text-gray-400"
          />
        </div>
        
        <div className="relative">
          
          <input
            type="number"
            value={newMemberMeals === 0 ? '' : newMemberMeals}
            onChange={(e) => onMealsChange(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Total Meals"
            className="w-full pl-14 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm font-medium placeholder:text-gray-400"
          />
        </div>
        
        <div className="relative">
          
          <input
            type="number"
            value={newMemberDeposit === 0 ? '' : newMemberDeposit}
            onChange={(e) => onDepositChange(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Deposit (৳)"
            className="w-full pl-14 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-sm font-medium placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onAddMember}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg text-base"
        >
          <UserPlus className="w-5 h-5" />
          Add Member
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-xl hover:from-red-600 hover:to-rose-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span className="hidden sm:inline">Reset All</span>
        </button>
      </div>
    </div>
  );
}