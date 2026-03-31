'use client';

import React from 'react';
import { PieChart, TrendingUp } from 'lucide-react';
import { Member } from '@/component/types/meal-calculator';

interface AnalysisSectionProps {
  members: Member[];
  totalCost: number;
  totalMeals: number;
}

export default function AnalysisSection({ members, totalCost, totalMeals }: AnalysisSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 shadow-xl border border-emerald-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Cost Analysis</h3>
        </div>
        <div className="space-y-5">
          {members.map((member) => (
            <div key={member.id}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-700">{member.name}</span>
                <span className="font-bold text-emerald-600">৳{Math.round(member.cost)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${totalCost > 0 ? (member.cost / totalCost) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl p-8 shadow-xl text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Summary</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="font-semibold text-lg">Total Members</span>
            <span className="font-bold text-2xl">{members.length}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="font-semibold text-lg">Total Meals</span>
            <span className="font-bold text-2xl">{totalMeals}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-white/20">
            <span className="font-semibold text-lg">Average Meals/Member</span>
            <span className="font-bold text-2xl">{Math.round(totalMeals / members.length)}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-semibold text-lg">Average Cost/Member</span>
            <span className="font-bold text-2xl">৳{Math.round(totalCost / members.length) || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}