"use server";
import { authOptions } from "@/lib/Authoptions";
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";

interface DashboardData {
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

export const managerdashboarddata = async (
  month: string,
  year: number
): Promise<DashboardData | null> => {
  try {
    const usercollection = await dbconnect("users");
    const costcollection = await dbconnect("cost");
    const mealcollection = await dbconnect("meals");

    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    const secretCode = (session.user as any)?.secretCode;
    const accountType = (session.user as any)?.accountType;

    if (accountType !== "manager" && accountType !== "controller") {
      return null;
    }

    const totalmember = await usercollection
      .find({ secretCode: secretCode })
      .toArray();
    const totalMembers = totalmember.length;

    const selectmonth = `${month}-${year}`;

    const totalcostdata = await costcollection
      .find({ secretCode: secretCode, month: selectmonth })
      .toArray();

    const totalCost = totalcostdata.reduce(
      (sum: number, item: any) => sum + (item.grandTotal || 0),
      0
    );

    const mealdata = await mealcollection
      .find({ secretCode: secretCode, month: month, year: year })
      .toArray();

    let breakfast = 0;
    let lunch = 0;
    let dinner = 0;

    mealdata.forEach((user: any) => {
      if (user.meals && Array.isArray(user.meals)) {
        user.meals.forEach((day: any) => {
          if (day.breakfast) breakfast++;
          if (day.lunch) lunch++;
          if (day.dinner) dinner++;
        });
      }
    });

    const totalMeal = breakfast + lunch + dinner;
    const currentMealRate = totalMeal > 0 && totalCost > 0 ? totalCost / totalMeal : 0;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = monthNames.indexOf(month);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = new Date().getDate();
    const daysUntilToday = Math.min(today, daysInMonth);

    const dailyReport: { [key: number]: any } = {};

    for (let i = 1; i <= daysInMonth; i++) {
      dailyReport[i] = {
        day: i,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        total: 0,
      };
    }

    mealdata.forEach((user: any) => {
      if (user.meals && Array.isArray(user.meals)) {
        user.meals.forEach((day: any) => {
          const d = day.date;
          if (dailyReport[d]) {
            if (day.breakfast) {
              dailyReport[d].breakfast++;
              dailyReport[d].total++;
            }
            if (day.lunch) {
              dailyReport[d].lunch++;
              dailyReport[d].total++;
            }
            if (day.dinner) {
              dailyReport[d].dinner++;
              dailyReport[d].total++;
            }
          }
        });
      }
    });

    const dailyCostMap: { [key: number]: number } = {};

    totalcostdata.forEach((cost: any) => {
      if (cost.date) {
        const date = new Date(cost.date);
        const day = date.getDate();
        if (dailyCostMap[day]) {
          dailyCostMap[day] += cost.grandTotal || 0;
        } else {
          dailyCostMap[day] = cost.grandTotal || 0;
        }
      }
    });

    const dailyPerformance = Array.from({ length: daysInMonth }, (_, i) => {
      const dayNum = i + 1;
      return {
        day: dayNum,
        cost: dailyCostMap[dayNum] || 0,
        meals: dailyReport[dayNum]?.total || 0,
      };
    });

    const weeksInMonth = 4;
    const weeklyMealBreakdown = [];

    for (let i = 0; i < weeksInMonth; i++) {
      weeklyMealBreakdown.push({
        week: `Week ${i + 1}`,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
      });
    }

    dailyPerformance.forEach((day) => {
      let weekIndex = Math.floor((day.day - 1) / 7);
      if (weekIndex >= weeksInMonth) {
        weekIndex = weeksInMonth - 1;
      }
      if (weekIndex < weeklyMealBreakdown.length) {
        const dailyData = dailyReport[day.day];
        if (dailyData) {
          weeklyMealBreakdown[weekIndex].breakfast += dailyData.breakfast;
          weeklyMealBreakdown[weekIndex].lunch += dailyData.lunch;
          weeklyMealBreakdown[weekIndex].dinner += dailyData.dinner;
        }
      }
    });

    const previousMonthIndex = monthIndex - 1;
    let previousMonthName = "";
    let previousYear = year;

    if (previousMonthIndex < 0) {
      previousMonthName = monthNames[11];
      previousYear = year - 1;
    } else {
      previousMonthName = monthNames[previousMonthIndex];
      previousYear = year;
    }

    const previousMonthMealData = await mealcollection
      .find({ secretCode: secretCode, month: previousMonthName, year: previousYear })
      .toArray();

    let previousBreakfast = 0;
    let previousLunch = 0;
    let previousDinner = 0;

    previousMonthMealData.forEach((user: any) => {
      if (user.meals && Array.isArray(user.meals)) {
        user.meals.forEach((day: any) => {
          if (day.breakfast) previousBreakfast++;
          if (day.lunch) previousLunch++;
          if (day.dinner) previousDinner++;
        });
      }
    });

    const previousTotalMeal = previousBreakfast + previousLunch + previousDinner;

    const previousMonthSelect = `${previousMonthName}-${previousYear}`;
    const previousMonthCostData = await costcollection
      .find({ secretCode: secretCode, month: previousMonthSelect })
      .toArray();

    const previousTotalCost = previousMonthCostData.reduce(
      (sum: number, item: any) => sum + (item.grandTotal || 0),
      0
    );

    const costChange = previousTotalCost > 0 ? ((totalCost - previousTotalCost) / previousTotalCost) * 100 : 0;
    const mealChange = previousTotalMeal > 0 ? ((totalMeal - previousTotalMeal) / previousTotalMeal) * 100 : 0;

    const mealRateHistory = [];

    for (let i = 0; i < weeksInMonth; i++) {
      const weekMeals = weeklyMealBreakdown[i].breakfast + weeklyMealBreakdown[i].lunch + weeklyMealBreakdown[i].dinner;
      let weeklyRate = 0;
      
      if (weekMeals > 0) {
        const weeklyCost = dailyPerformance
          .filter(d => {
            let weekIdx = Math.floor((d.day - 1) / 7);
            if (weekIdx >= weeksInMonth) weekIdx = weeksInMonth - 1;
            return weekIdx === i;
          })
          .reduce((sum, d) => sum + d.cost, 0);
        weeklyRate = weeklyCost / weekMeals;
      }
      
      mealRateHistory.push({
        week: `Week ${i + 1}`,
        rate: Math.round(weeklyRate),
      });
    }

    const todayMeals = {
      breakfast: dailyReport[today]?.breakfast || 0,
      lunch: dailyReport[today]?.lunch || 0,
      dinner: dailyReport[today]?.dinner || 0,
      total: dailyReport[today]?.total || 0,
    };

    return {
      month: month,
      year: year,
      metadata: {
        totalMembers: totalMembers,
        currentMealRate: Math.round(currentMealRate),
        daysInMonth: daysInMonth,
        today: daysUntilToday,
      },
      summary: {
        totalCost: totalCost,
        totalMeal: totalMeal,
        breakfastCount: breakfast,
        lunchCount: lunch,
        dinnerCount: dinner,
        costChange: parseFloat(costChange.toFixed(1)),
        mealChange: parseFloat(mealChange.toFixed(1)),
      },
      dailyPerformance: dailyPerformance,
      weeklyMealBreakdown: weeklyMealBreakdown,
      mealRateHistory: mealRateHistory,
      todayMeals: todayMeals,
    };
  } catch (error) {
    console.error("Error in managerdashboarddata:", error);
    return null;
  }
};