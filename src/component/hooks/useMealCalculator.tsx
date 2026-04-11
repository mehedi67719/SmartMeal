'use client';

import { useState, useEffect } from 'react';

interface Member {
  id: string;
  name: string;
  totalMeals: number;
  totalDeposit: number;
  cost: number;
  due: number;
  status: 'due' | 'paid' | 'extra';
}

export function useMealCalculator() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberMeals, setNewMemberMeals] = useState<number>(0);
  const [newMemberDeposit, setNewMemberDeposit] = useState<number>(0);
  const [totalMeals, setTotalMeals] = useState(0);
  const [costPerMeal, setCostPerMeal] = useState(0);
  const [showAlert, setShowAlert] = useState<{ type: string; message: string } | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [members, monthlyCost, selectedMonth, isCalculated, costPerMeal, totalMeals]);

  const loadData = () => {
    try {
      const saved = localStorage.getItem('mealCalculatorPremium');
      if (saved) {
        const data = JSON.parse(saved);
        setMembers(data.members || []);
        setMonthlyCost(data.monthlyCost || 0);
        setSelectedMonth(data.selectedMonth || selectedMonth);
        if (data.totalMeals) setTotalMeals(data.totalMeals);
        if (data.costPerMeal) setCostPerMeal(data.costPerMeal);
        if (data.isCalculated) setIsCalculated(data.isCalculated);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveToLocalStorage = () => {
    try {
      const data = {
        members,
        monthlyCost,
        selectedMonth,
        totalMeals,
        costPerMeal,
        isCalculated,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('mealCalculatorPremium', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const showAlertMessage = (type: string, message: string) => {
    setShowAlert({ type, message });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const addMember = () => {
    if (!newMemberName.trim()) {
      showAlertMessage('error', 'Please enter member name!');
      return;
    }
    
    const newMember: Member = {
      id: Date.now().toString(),
      name: newMemberName.trim(),
      totalMeals: newMemberMeals || 0,
      totalDeposit: newMemberDeposit || 0,
      cost: 0,
      due: newMemberDeposit || 0,
      status: 'due'
    };
    
    setMembers([...members, newMember]);
    setNewMemberName('');
    setNewMemberMeals(0);
    setNewMemberDeposit(0);
    setIsCalculated(false);
    showAlertMessage('success', `${newMemberName} added successfully!`);
  };

  const removeMember = (id: string) => {
    const member = members.find(m => m.id === id);
    setMembers(members.filter(m => m.id !== id));
    setIsCalculated(false);
    showAlertMessage('success', `${member?.name} removed successfully!`);
  };

  const updateMemberMeals = (id: string, meals: number) => {
    setMembers(members.map(member => {
      if (member.id === id) {
        return { ...member, totalMeals: Math.max(0, meals) };
      }
      return member;
    }));
    setIsCalculated(false);
  };

  const updateMemberDeposit = (id: string, amount: number) => {
    setMembers(members.map(member => {
      if (member.id === id) {
        return { ...member, totalDeposit: Math.max(0, amount) };
      }
      return member;
    }));
    setIsCalculated(false);
  };

  const calculateAll = () => {
  
    if (monthlyCost <= 0) {
      showAlertMessage('error', 'Please enter monthly cost!');
      return;
    }


    if (members.length === 0) {
      showAlertMessage('error', 'Please add at least one member!');
      return;
    }


    const total = members.reduce((sum, member) => sum + member.totalMeals, 0);
    setTotalMeals(total);

    if (total === 0) {
      showAlertMessage('error', 'No meals added!');
      return;
    }

  
    const perMealCost = monthlyCost / total;
    setCostPerMeal(perMealCost);

  
    const updatedMembers = members.map(member => {
      const memberCost = member.totalMeals * perMealCost;
      const dueAmount = memberCost - member.totalDeposit;
      
      let status: 'due' | 'paid' | 'extra' = 'due';
      if (dueAmount <= -0.01) status = 'extra';
      else if (dueAmount > 0.01) status = 'due';
      else status = 'paid';

      return {
        ...member,
        cost: memberCost,
        due: dueAmount,
        status: status
      };
    });

    setMembers(updatedMembers);
    setIsCalculated(true);
    showAlertMessage('success', 'Calculation completed successfully!');
  };

  const resetAll = () => {
    if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      setMembers([]);
      setMonthlyCost(0);
      setTotalMeals(0);
      setCostPerMeal(0);
      setIsCalculated(false);
      setNewMemberName('');
      setNewMemberMeals(0);
      setNewMemberDeposit(0);
      showAlertMessage('success', 'All data has been reset!');
    }
  };

  return {
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
  };
}