'use client';

import React from 'react';
import { Wallet, Calendar } from 'lucide-react';

interface CostInputCardProps {
  monthlyCost: number;
  selectedMonth: string;
  onMonthlyCostChange: (value: number) => void;
  onMonthChange: (value: string) => void;
}

const getMonthName = (dateString: string) => {
  const [year, month] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
};

export default function CostInputCard({
  monthlyCost,
  selectedMonth,
  onMonthlyCostChange,
  onMonthChange,
}: CostInputCardProps) {
  return (
    <div className="w-full bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-2xl transition-all duration-300">
      
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          <Wallet className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Monthly Cost</h3>
          <p className="text-sm text-emerald-100 mt-1">Set total expenses for the month</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-emerald-100 mb-2 font-semibold">
            Total Amount (৳)
          </label>

          <input
            type="number"
            value={monthlyCost === 0 ? '' : monthlyCost}
            onChange={(e) => {
              const value = e.target.value;
              onMonthlyCostChange(value === '' ? 0 : Number(value));
            }}
            placeholder="e.g., 50000"
            className="w-full px-5 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-lg font-semibold"
          />
        </div>
        
        <div>
          <label className="block text-sm text-emerald-100 mb-2 font-semibold">
            Select Month
          </label>

          <div className="flex items-center gap-3 bg-white/20 rounded-xl px-5 py-4 border-2 border-white/30">
            <Calendar className="w-5 h-5 text-emerald-100 flex-shrink-0" />
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="flex-1 bg-transparent text-white focus:outline-none text-base font-semibold"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/20">
          <div className="flex justify-between items-center">
            <span className="text-emerald-100 text-sm">Current Month:</span>
            <span className="text-white font-bold">
              {getMonthName(selectedMonth)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}