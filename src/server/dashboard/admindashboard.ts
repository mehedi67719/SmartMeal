"use server";
import { authOptions } from "@/lib/Authoptions";
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";

interface DailyReportType {
  day: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
}

interface DailyPerformanceType {
  day: number;
  cost: number;
  meals: number;
}

interface WeeklyMealType {
  week: string;
  breakfast: number;
  lunch: number;
  dinner: number;
}

interface MealRateHistoryType {
  week: string;
  rate: number;
}

interface TodayMealsType {
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
}

interface MemberType {
  id: string;
  name: string;
  email: string;
  accountType: string;
  hasMealToday: boolean;
}

interface MetadataType {
  totalMembers: number;
  currentMealRate: number;
  daysInMonth: number;
  today: number;
}

interface SummaryType {
  totalCost: number;
  totalMeal: number;
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
  totalDeposit: number;
  dueAmount: number;
  costChange: number;
  mealChange: number;
}

interface DashboardData {
  month: string;
  year: number;
  metadata: MetadataType;
  summary: SummaryType;
  dailyPerformance: DailyPerformanceType[];
  weeklyMealBreakdown: WeeklyMealType[];
  mealRateHistory: MealRateHistoryType[];
  todayMeals: TodayMealsType;
  members: MemberType[];
}

interface DashboardResponse {
  success: boolean;
  data?: DashboardData;
  error?: string;
}

export const controllerdashboarddata = async (
  month: string,
  year: number
): Promise<DashboardResponse> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "No session found" };
    }

    const secretCode = (session.user as any)?.secretCode;
    const accountType = (session.user as any)?.accountType;

    if (accountType !== "controller") {
      return { success: false, error: "Unauthorized - Controller only" };
    }

    const costcollection = await dbconnect("cost");
    const mealscollection = await dbconnect("meals");
    const usercollection = await dbconnect("users");
    const depositecollection = await dbconnect("deposite");

    const allUsers = await usercollection
      .find({ secretCode: secretCode })
      .toArray();

    const mealusers = await mealscollection
      .find({ secretCode: secretCode, month: month, year: year })
      .toArray();

    let breakfastCount = 0;
    let lunchCount = 0;
    let dinnerCount = 0;

    mealusers.forEach((user: any) => {
      if (user.meals && Array.isArray(user.meals)) {
        user.meals.forEach((day: any) => {
          if (day.breakfast) breakfastCount++;
          if (day.lunch) lunchCount++;
          if (day.dinner) dinnerCount++;
        });
      }
    });

    const totalmeals = breakfastCount + lunchCount + dinnerCount;

    let totaldeposite = 0;

    const allDeposits = await depositecollection
      .find({ secretCode: secretCode })
      .toArray();

    const monthNames: string[] = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const filteredDeposits = allDeposits.filter((deposit: any) => {
      if (!deposit.date) return false;
      const depositDate = new Date(deposit.date);
      const depositMonth = depositDate.getMonth();
      const depositYear = depositDate.getFullYear();
      const depositMonthName = monthNames[depositMonth];
      return depositMonthName === month && depositYear === year;
    });

    filteredDeposits.forEach((deposit: any) => {
      totaldeposite = totaldeposite + (deposit.amount || 0);
    });

    const selectmonth = `${month}-${year}`;

    const costuser = await costcollection
      .find({ secretCode: secretCode, month: selectmonth })
      .toArray();

    let totalcost = 0;

    costuser.forEach((user: any) => {
      totalcost = totalcost + (user.grandTotal || 0);
    });

    const mealrate = totalmeals > 0 ? totalcost / totalmeals : 0;

    const due = totaldeposite - totalcost;
    let totaldue = 0;

    if (due < 0) {
      totaldue = Math.abs(due);
    } else {
      totaldue = 0;
    }

    const monthIndex = monthNames.indexOf(month);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const today = new Date().getDate();
    const daysUntilToday = Math.min(today, daysInMonth);

    const dailyReport: { [key: number]: DailyReportType } = {};

    for (let i = 1; i <= daysInMonth; i++) {
      dailyReport[i] = {
        day: i,
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        total: 0,
      };
    }

    mealusers.forEach((user: any) => {
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

    costuser.forEach((cost: any) => {
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

    const dailyPerformance: DailyPerformanceType[] = Array.from(
      { length: daysInMonth },
      (_, i) => {
        const dayNum = i + 1;
        return {
          day: dayNum,
          cost: dailyCostMap[dayNum] || 0,
          meals: dailyReport[dayNum]?.total || 0,
        };
      }
    );

    const weeksInMonth = 4;
    const weeklyMealBreakdown: WeeklyMealType[] = [];

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

    const mealRateHistory: MealRateHistoryType[] = [];

    for (let i = 0; i < weeksInMonth; i++) {
      const weekMeals =
        weeklyMealBreakdown[i].breakfast +
        weeklyMealBreakdown[i].lunch +
        weeklyMealBreakdown[i].dinner;
      let weeklyRate = 0;

      if (weekMeals > 0) {
        const weeklyCost = dailyPerformance
          .filter((d) => {
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

    const todayMeals: TodayMealsType = {
      breakfast: dailyReport[today]?.breakfast || 0,
      lunch: dailyReport[today]?.lunch || 0,
      dinner: dailyReport[today]?.dinner || 0,
      total: dailyReport[today]?.total || 0,
    };

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

    const previousMonthSelect = `${previousMonthName}-${previousYear}`;
    const previousMonthCostData = await costcollection
      .find({ secretCode: secretCode, month: previousMonthSelect })
      .toArray();

    const previousTotalCost = previousMonthCostData.reduce(
      (sum: number, item: any) => sum + (item.grandTotal || 0),
      0
    );

    const previousMonthMealData = await mealscollection
      .find({ secretCode: secretCode, month: previousMonthName, year: previousYear })
      .toArray();

    let previousTotalMeal = 0;
    previousMonthMealData.forEach((user: any) => {
      if (user.meals && Array.isArray(user.meals)) {
        user.meals.forEach((day: any) => {
          if (day.breakfast) previousTotalMeal++;
          if (day.lunch) previousTotalMeal++;
          if (day.dinner) previousTotalMeal++;
        });
      }
    });

    const costChange =
      previousTotalCost > 0
        ? ((totalcost - previousTotalCost) / previousTotalCost) * 100
        : 0;
    const mealChange =
      previousTotalMeal > 0
        ? ((totalmeals - previousTotalMeal) / previousTotalMeal) * 100
        : 0;

    const membersData: MemberType[] = allUsers.map((user: any) => {
      let hasMealToday = false;
      
      const userMealData = mealusers.find((m: any) => m.email === user.email);
      if (userMealData && userMealData.meals && Array.isArray(userMealData.meals)) {
        const todayMeal = userMealData.meals.find((day: any) => day.date === today);
        if (todayMeal && (todayMeal.breakfast || todayMeal.lunch || todayMeal.dinner)) {
          hasMealToday = true;
        }
      }
      
      return {
        id: user._id.toString(),
        name: user.Name || user.name,
        email: user.email,
        accountType: user.accountType,
        hasMealToday: hasMealToday,
      };
    });

    return {
      success: true,
      data: {
        month: month,
        year: year,
        metadata: {
          totalMembers: allUsers.length,
          currentMealRate: Math.round(mealrate),
          daysInMonth: daysInMonth,
          today: daysUntilToday,
        },
        summary: {
          totalCost: totalcost,
          totalMeal: totalmeals,
          breakfastCount: breakfastCount,
          lunchCount: lunchCount,
          dinnerCount: dinnerCount,
          totalDeposit: totaldeposite,
          dueAmount: totaldue,
          costChange: parseFloat(costChange.toFixed(1)),
          mealChange: parseFloat(mealChange.toFixed(1)),
        },
        dailyPerformance: dailyPerformance,
        weeklyMealBreakdown: weeklyMealBreakdown,
        mealRateHistory: mealRateHistory,
        todayMeals: todayMeals,
        members: membersData,
      },
    };
  } catch (error) {
    console.error("Error in controllerdashboarddata:", error);
    return { success: false, error: "Failed to load dashboard data" };
  }
};

export const getAllUsersMealDetails = async (
  month: string,
  year: number
): Promise<any> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "No session found" };
    }

    const secretCode = (session.user as any)?.secretCode;
    const accountType = (session.user as any)?.accountType;

    if (accountType !== "controller") {
      return { success: false, error: "Unauthorized - Controller only" };
    }

    const mealscollection = await dbconnect("meals");
    const usercollection = await dbconnect("users");

    const allUsers = await usercollection
      .find({ secretCode: secretCode })
      .toArray();

    const mealusers = await mealscollection
      .find({ secretCode: secretCode, month: month, year: year })
      .toArray();

    const monthNames: string[] = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = monthNames.indexOf(month);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const usersData = [];

    for (const user of allUsers) {
      const userMealData = mealusers.find((m: any) => m.email === user.email);
      
      let totalBreakfast = 0;
      let totalLunch = 0;
      let totalDinner = 0;
      const dailyMeals = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let breakfast = false;
        let lunch = false;
        let dinner = false;

        if (userMealData && userMealData.meals && Array.isArray(userMealData.meals)) {
          const dayMeal = userMealData.meals.find((m: any) => m.date === i);
          if (dayMeal) {
            breakfast = dayMeal.breakfast || false;
            lunch = dayMeal.lunch || false;
            dinner = dayMeal.dinner || false;
            
            if (breakfast) totalBreakfast++;
            if (lunch) totalLunch++;
            if (dinner) totalDinner++;
          }
        }

        dailyMeals.push({
          date: i,
          breakfast,
          lunch,
          dinner,
        });
      }

      usersData.push({
        id: user._id.toString(),
        name: user.Name || user.name,
        email: user.email,
        accountType: user.accountType,
        totalBreakfast,
        totalLunch,
        totalDinner,
        totalMeals: totalBreakfast + totalLunch + totalDinner,
        dailyMeals,
      });
    }

    return {
      success: true,
      data: {
        month,
        year,
        daysInMonth,
        users: usersData,
      },
    };
  } catch (error) {
    console.error("Error getting all users meal details:", error);
    return { success: false, error: "Failed to load data" };
  }
};