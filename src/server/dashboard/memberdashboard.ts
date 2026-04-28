"use server";
import { authOptions } from "@/lib/Authoptions";
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";

interface MemberDashboardData {
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

export const memberdashboarddata = async (
  month: string,
  year: number
): Promise<MemberDashboardData | null> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "No session found" };
    }

    const userEmail = (session.user as any)?.email;
    const secretCode = (session.user as any)?.secretCode;

    if (!userEmail) {
      return { success: false, error: "User email not found" };
    }

    const usercollection = await dbconnect("users");
    const costcollection = await dbconnect("cost");
    const mealcollection = await dbconnect("meals");
    const depositcollection = await dbconnect("deposite");

    const userData = await usercollection.findOne({ email: userEmail, secretCode: secretCode });

    if (!userData) {
      return { success: false, error: "User not found" };
    }

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthIndex = monthNames.indexOf(month);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = new Date().getDate();
    const daysUntilToday = Math.min(today, daysInMonth);

    const mealData = await mealcollection.findOne({
      email: userEmail,
      secretCode: secretCode,
      month: month,
      year: year,
    });

    let breakfast = 0;
    let lunch = 0;
    let dinner = 0;
    const dailyMeals: Array<{ date: number; breakfast: boolean; lunch: boolean; dinner: boolean; total: number }> = [];

    for (let i = 1; i <= daysInMonth; i++) {
      dailyMeals.push({
        date: i,
        breakfast: false,
        lunch: false,
        dinner: false,
        total: 0,
      });
    }

    if (mealData && mealData.meals && Array.isArray(mealData.meals)) {
      mealData.meals.forEach((day: any) => {
        const d = day.date - 1;
        if (dailyMeals[d]) {
          if (day.breakfast) {
            dailyMeals[d].breakfast = true;
            breakfast++;
            dailyMeals[d].total++;
          }
          if (day.lunch) {
            dailyMeals[d].lunch = true;
            lunch++;
            dailyMeals[d].total++;
          }
          if (day.dinner) {
            dailyMeals[d].dinner = true;
            dinner++;
            dailyMeals[d].total++;
          }
        }
      });
    }

    const userTotalMeals = breakfast + lunch + dinner;

    const selectmonth = `${month}-${year}`;
    const costData = await costcollection
      .find({ secretCode: secretCode, month: selectmonth })
      .toArray();

    const totalMonthlyCost = costData.reduce((sum: number, item: any) => sum + (item.grandTotal || 0), 0);

    const allMealsData = await mealcollection
      .find({ secretCode: secretCode, month: month, year: year })
      .toArray();

    let totalMessMeals = 0;

    allMealsData.forEach((user: any) => {
      if (user.meals && Array.isArray(user.meals)) {
        user.meals.forEach((day: any) => {
          if (day.breakfast) totalMessMeals++;
          if (day.lunch) totalMessMeals++;
          if (day.dinner) totalMessMeals++;
        });
      }
    });

    const mealRate = totalMessMeals > 0 ? totalMonthlyCost / totalMessMeals : 0;

    const allDeposits = await depositcollection
      .find({
        userEmail: userEmail,
        secretCode: secretCode,
      })
      .toArray();

    const depositData = allDeposits.filter((deposit: any) => {
      const depositDate = new Date(deposit.date);
      const depositMonth = depositDate.getMonth();
      const depositYear = depositDate.getFullYear();
      const depositMonthName = monthNames[depositMonth];
      return depositMonthName === month && depositYear === year;
    });

    console.log("Deposit data found:", depositData.length);
    console.log("Deposit data:", JSON.stringify(depositData, null, 2));

    const totalDeposit = depositData.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    const userTotalCost = Math.round(userTotalMeals * mealRate);
    const dueAmount = userTotalCost - totalDeposit;
    const isDue = dueAmount > 0;

    const averageDailyMeals = daysUntilToday > 0 ? parseFloat((userTotalMeals / daysUntilToday).toFixed(1)) : 0;
    const averageDailyCost = daysUntilToday > 0 ? Math.round(userTotalCost / daysUntilToday) : 0;

    const breakfastPercentage = userTotalMeals > 0 ? parseFloat(((breakfast / userTotalMeals) * 100).toFixed(1)) : 0;
    const lunchPercentage = userTotalMeals > 0 ? parseFloat(((lunch / userTotalMeals) * 100).toFixed(1)) : 0;
    const dinnerPercentage = userTotalMeals > 0 ? parseFloat(((dinner / userTotalMeals) * 100).toFixed(1)) : 0;

    const weeklyMeals = [
      { week: "Week 1", meals: 0 },
      { week: "Week 2", meals: 0 },
      { week: "Week 3", meals: 0 },
      { week: "Week 4", meals: 0 },
    ];

    dailyMeals.forEach((day) => {
      const weekIndex = Math.floor((day.date - 1) / 7);
      if (weekIndex < 4) {
        weeklyMeals[weekIndex].meals += day.total;
      }
    });

    const depositHistory = depositData.map((deposit: any) => ({
      date: new Date(deposit.date).toISOString().split("T")[0],
      amount: deposit.amount,
      note: deposit.note || "Deposit",
    }));

    const mealRateHistory = [];
    for (let i = 0; i <= monthIndex; i++) {
      let rate = 60;
      if (i === monthIndex) {
        rate = Math.round(mealRate);
      } else if (i === monthIndex - 1) {
        rate = Math.round(mealRate * 0.95);
      } else {
        rate = 60 + i;
      }
      mealRateHistory.push({
        month: monthNames[i],
        rate: rate,
      });
    }

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

    const previousMealData = await mealcollection.findOne({
      email: userEmail,
      secretCode: secretCode,
      month: previousMonthName,
      year: previousYear,
    });

    let previousBreakfast = 0;
    let previousLunch = 0;
    let previousDinner = 0;

    if (previousMealData && previousMealData.meals) {
      previousMealData.meals.forEach((day: any) => {
        if (day.breakfast) previousBreakfast++;
        if (day.lunch) previousLunch++;
        if (day.dinner) previousDinner++;
      });
    }

    const previousUserTotalMeals = previousBreakfast + previousLunch + previousDinner;
    const previousUserTotalCost = Math.round(previousUserTotalMeals * mealRate);

    const allPreviousDeposits = await depositcollection
      .find({
        userEmail: userEmail,
        secretCode: secretCode,
      })
      .toArray();

    const previousDepositData = allPreviousDeposits.filter((deposit: any) => {
      const depositDate = new Date(deposit.date);
      const depositMonth = depositDate.getMonth();
      const depositYear = depositDate.getFullYear();
      const depositMonthName = monthNames[depositMonth];
      return depositMonthName === previousMonthName && depositYear === previousYear;
    });

    const previousTotalDeposit = previousDepositData.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    const previousDueAmount = previousUserTotalCost - previousTotalDeposit;

    return {
      success: true,
      data: {
        metadata: {
          memberId: userData._id.toString(),
          name: userData.Name || userData.name,
          email: userEmail,
          secretCode: secretCode,
          currentMonth: month,
          currentYear: year,
          daysInMonth: daysInMonth,
          today: daysUntilToday,
        },
        mealRate: Math.round(mealRate),
        summary: {
          totalMeals: userTotalMeals,
          totalCost: userTotalCost,
          totalDeposit: totalDeposit,
          dueAmount: dueAmount > 0 ? dueAmount : 0,
          isDue: isDue,
          averageDailyMeals: averageDailyMeals,
          averageDailyCost: averageDailyCost,
        },
        mealBreakdown: {
          breakfast: breakfast,
          lunch: lunch,
          dinner: dinner,
          breakfastPercentage: breakfastPercentage,
          lunchPercentage: lunchPercentage,
          dinnerPercentage: dinnerPercentage,
        },
        dailyMeals: dailyMeals,
        weeklyMeals: weeklyMeals,
        depositHistory: depositHistory,
        mealRateHistory: mealRateHistory,
        previousMonthData: {
          month: previousMonthName,
          year: previousYear,
          totalMeals: previousUserTotalMeals,
          totalCost: previousUserTotalCost,
          totalDeposit: previousTotalDeposit,
          dueAmount: previousDueAmount > 0 ? previousDueAmount : 0,
        },
      },
    };
  } catch (error) {
    console.error("Error in memberdashboarddata:", error);
    return { success: false, error: "Failed to load dashboard data" };
  }
};