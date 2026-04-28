export interface MemberDashboardData {
  success: boolean;
  data?: {
    metadata: {
      memberId: string;
      name: string;
      email: string;
      secretCode: string;
      currentMonth: string;
      currentYear: number;
      daysInMonth: number;
      today: number;
    };
    mealRate: number;
    summary: {
      totalMeals: number;
      totalCost: number;
      totalDeposit: number;
      dueAmount: number;
      isDue: boolean;
      averageDailyMeals: number;
      averageDailyCost: number;
    };
    mealBreakdown: {
      breakfast: number;
      lunch: number;
      dinner: number;
      breakfastPercentage: number;
      lunchPercentage: number;
      dinnerPercentage: number;
    };
    dailyMeals: Array<{
      date: number;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      total: number;
    }>;
    weeklyMeals: Array<{
      week: string;
      meals: number;
    }>;
    depositHistory: Array<{
      date: string;
      amount: number;
      note: string;
    }>;
    mealRateHistory: Array<{
      month: string;
      rate: number;
    }>;
    previousMonthData: {
      month: string;
      year: number;
      totalMeals: number;
      totalCost: number;
      totalDeposit: number;
      dueAmount: number;
    };
  };
  error?: string;
}