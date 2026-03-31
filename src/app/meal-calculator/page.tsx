'use client';

import { useMealCalculator } from '@/component/hooks/useMealCalculator';
import AlertNotification from '@/component/pages/meal-calculator/AlertNotification';
import AnalysisSection from '@/component/pages/meal-calculator/AnalysisSection';
import CostInputCard from '@/component/pages/meal-calculator/CostInputCard';
import CTASection from '@/component/pages/meal-calculator/CTASection';
import HeroSection from '@/component/pages/meal-calculator/HeroSection';
import MemberFormCard from '@/component/pages/meal-calculator/MemberFormCard';
import MembersTable from '@/component/pages/meal-calculator/MembersTable';

import React from 'react';

export default function MealCalculatorPage() {
  const {
    members,
    monthlyCost,
    selectedMonth,
    totalMeals,
    costPerMeal,
    isCalculated,
    showAlert,
    newMemberName,
    newMemberMeals,
    newMemberDeposit,
    setMonthlyCost,
    setSelectedMonth,
    setNewMemberName,
    setNewMemberMeals,
    setNewMemberDeposit,
    addMember,
    removeMember,
    updateMemberMeals,
    updateMemberDeposit,
    calculateAll,
    resetAll,
  } = useMealCalculator();

  const totalDeposit = members.reduce((sum, m) => sum + m.totalDeposit, 0);
  const totalCost = members.reduce((sum, m) => sum + m.cost, 0);
  const totalDue = members.reduce((sum, m) => sum + (m.due > 0 ? m.due : 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <AlertNotification alert={showAlert} />
  
      <HeroSection />
      
      <div id="calculator-section" className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <CostInputCard
            monthlyCost={monthlyCost}
            selectedMonth={selectedMonth}
            onMonthlyCostChange={setMonthlyCost}
            onMonthChange={setSelectedMonth}
          />
          <MemberFormCard
            newMemberName={newMemberName}
            newMemberMeals={newMemberMeals}
            newMemberDeposit={newMemberDeposit}
            onNameChange={setNewMemberName}
            onMealsChange={setNewMemberMeals}
            onDepositChange={setNewMemberDeposit}
            onAddMember={addMember}
            onReset={resetAll}
          />
        </div>

        {members.length > 0 && (
          <MembersTable
            members={members}
            isCalculated={isCalculated}
            totalMeals={totalMeals}
            totalDeposit={totalDeposit}
            totalCost={totalCost}
            totalDue={totalDue}
            costPerMeal={costPerMeal}
            onUpdateMeals={updateMemberMeals}
            onUpdateDeposit={updateMemberDeposit}
            onRemoveMember={removeMember}
            onCalculate={calculateAll}
          />
        )}

        {isCalculated && members.length > 0 && (
          <AnalysisSection members={members} totalCost={totalCost} totalMeals={totalMeals} />
        )}

        <CTASection />
      </div>
    </div>
  );
}