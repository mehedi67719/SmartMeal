
export interface DashboardData {
  month: string;
  year: number;
  metadata: {
    totalMembers: number;
    currentMealRate: number;
    daysInMonth: number;
    today: number;
  };
  summary: {
    totalCost: number;
    totalMeal: number;
    breakfastCount: number;
    lunchCount: number;
    dinnerCount: number;
    costChange: number;
    mealChange: number;
  };
  dailyPerformance: Array<{
    day: number;
    cost: number;
    meals: number;
  }>;
  weeklyMealBreakdown: Array<{
    week: string;
    breakfast: number;
    lunch: number;
    dinner: number;
  }>;
  mealRateHistory: Array<{
    week: string;
    rate: number;
  }>;
  todayMeals: {
    breakfast: number;
    lunch: number;
    dinner: number;
    total: number;
  };
}