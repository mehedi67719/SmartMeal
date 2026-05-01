"use server";
import { authOptions } from "@/lib/Authoptions";
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";

interface DailyMealType {
  date: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface UserMealDataType {
  id: string;
  name: string;
  email: string;
  accountType: string;
  totalBreakfast: number;
  totalLunch: number;
  totalDinner: number;
  totalMeals: number;
  dailyMeals: DailyMealType[];
}

interface AllUsersMealResponse {
  success: boolean;
  data?: {
    month: string;
    year: number;
    daysInMonth: number;
    users: UserMealDataType[];
  };
  error?: string;
}

interface UpdateMealStatusResponse {
  success: boolean;
  error?: string;
  isCurrentMonth?: boolean;
}

export const getAllUsersMealDetails = async (
  month: string,
  year: number
): Promise<AllUsersMealResponse> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "No session found" };
    }

    const secretCode = (session.user as any)?.secretCode;
    const accountType = (session.user as any)?.accountType;

    if (accountType !== "controller" && accountType !== "manager") {
      return { success: false, error: "Unauthorized - Controller or Manager only" };
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

    const usersData: UserMealDataType[] = [];

    for (const user of allUsers) {
      const userMealData = mealusers.find((m: any) => m.email === user.email);
      
      let totalBreakfast = 0;
      let totalLunch = 0;
      let totalDinner = 0;
      const dailyMeals: DailyMealType[] = [];

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

export const updateUserMealStatus = async (
  userEmail: string,
  status: boolean,
  month: string,
  year: number
): Promise<UpdateMealStatusResponse> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return { success: false, error: "No session found" };
    }

    const secretCode = (session.user as any)?.secretCode;
    const accountType = (session.user as any)?.accountType;

    if (accountType !== "controller" && accountType !== "manager") {
      return { success: false, error: "Unauthorized - Controller or Manager only" };
    }

    const mealscollection = await dbconnect("meals");

    const monthNames: string[] = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = monthNames.indexOf(month);
    const currentMonthIndex = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const isCurrentMonth = (monthIndex === currentMonthIndex && year === currentYear);

    if (!isCurrentMonth) {
      return { 
        success: false, 
        error: `You can only update meal status for the current month (${monthNames[currentMonthIndex]} ${currentYear}). Please select the current month to change meal status.`,
        isCurrentMonth: false
      };
    }

    const today = new Date().getDate();

    if (status === false) {
      const existingUserData = await mealscollection.findOne({
        email: userEmail,
        secretCode: secretCode,
        month: month,
        year: year
      });

      if (existingUserData && existingUserData.meals && Array.isArray(existingUserData.meals)) {
        await mealscollection.updateOne(
          {
            email: userEmail,
            secretCode: secretCode,
            month: month,
            year: year
          },
          {
            $set: {
              adminMealStatus: status,
              updatedAt: new Date(),
              "meals.$[elem].breakfast": false,
              "meals.$[elem].lunch": false,
              "meals.$[elem].dinner": false
            }
          },
          {
            arrayFilters: [{ "elem.date": { $gte: today } }]
          }
        );
      } else {
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const newMeals = [];
        for (let i = 1; i <= daysInMonth; i++) {
          newMeals.push({
            date: i,
            breakfast: i >= today ? false : false,
            lunch: i >= today ? false : false,
            dinner: i >= today ? false : false,
          });
        }

        await mealscollection.insertOne({
          email: userEmail,
          secretCode: secretCode,
          month: month,
          year: year,
          adminMealStatus: status,
          meals: newMeals,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    } else {
      const result = await mealscollection.updateOne(
        {
          email: userEmail,
          secretCode: secretCode,
          month: month,
          year: year
        },
        {
          $set: {
            adminMealStatus: status,
            updatedAt: new Date()
          }
        }
      );

      if (result.matchedCount === 0) {
        await mealscollection.insertOne({
          email: userEmail,
          secretCode: secretCode,
          month: month,
          year: year,
          adminMealStatus: status,
          meals: [],
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    return { success: true, isCurrentMonth: true };
  } catch (error) {
    console.error("Error updating user meal status:", error);
    return { success: false, error: "Failed to update user status" };
  }
};

export const getUserDepositAmount = async (
  userEmail: string,
  month: string,
  year: number
): Promise<number> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return 0;
    }

    const secretCode = (session.user as any)?.secretCode;
    const depositcollection = await dbconnect("deposite");

    const monthNames: string[] = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const allDeposits = await depositcollection
      .find({ 
        userEmail: userEmail, 
        secretCode: secretCode 
      })
      .toArray();

    const filteredDeposits = allDeposits.filter((deposit: any) => {
      if (!deposit.date) return false;
      const depositDate = new Date(deposit.date);
      const depositMonth = depositDate.getMonth();
      const depositYear = depositDate.getFullYear();
      const depositMonthName = monthNames[depositMonth];
      return depositMonthName === month && depositYear === year;
    });

    const totalDeposit = filteredDeposits.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
    
    return totalDeposit;
  } catch (error) {
    console.error("Error getting user deposit:", error);
    return 0;
  }
};

export const getAllUsersDeposits = async (
  month: string,
  year: number
): Promise<{ [key: string]: number }> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {};
    }

    const secretCode = (session.user as any)?.secretCode;
    const depositcollection = await dbconnect("deposite");
    const usercollection = await dbconnect("users");

    const allUsers = await usercollection
      .find({ secretCode: secretCode })
      .toArray();

    const monthNames: string[] = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const allDeposits = await depositcollection
      .find({ secretCode: secretCode })
      .toArray();

    const depositsMap: { [key: string]: number } = {};

    for (const user of allUsers) {
      const userDeposits = allDeposits.filter((deposit: any) => {
        if (!deposit.date) return false;
        if (deposit.userEmail !== user.email) return false;
        const depositDate = new Date(deposit.date);
        const depositMonth = depositDate.getMonth();
        const depositYear = depositDate.getFullYear();
        const depositMonthName = monthNames[depositMonth];
        return depositMonthName === month && depositYear === year;
      });

      const totalDeposit = userDeposits.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
      depositsMap[user.email] = totalDeposit;
    }

    return depositsMap;
  } catch (error) {
    console.error("Error getting all users deposits:", error);
    return {};
  }
};

export const getMonthlyMealRate = async (
  month: string,
  year: number
): Promise<number> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return 65;
    }

    const secretCode = (session.user as any)?.secretCode;
    const costcollection = await dbconnect("cost");
    const mealscollection = await dbconnect("meals");

    const selectmonth = `${month}-${year}`;

    const costData = await costcollection
      .find({ secretCode: secretCode, month: selectmonth })
      .toArray();

    const totalCost = costData.reduce((sum: number, item: any) => sum + (item.grandTotal || 0), 0);

    const mealData = await mealscollection
      .find({ secretCode: secretCode, month: month, year: year })
      .toArray();

    let totalMeals = 0;

    mealData.forEach((user: any) => {
      if (user.meals && Array.isArray(user.meals)) {
        user.meals.forEach((day: any) => {
          if (day.breakfast) totalMeals++;
          if (day.lunch) totalMeals++;
          if (day.dinner) totalMeals++;
        });
      }
    });

    const mealRate = totalMeals > 0 ? totalCost / totalMeals : 65;

    return Math.round(mealRate);
  } catch (error) {
    console.error("Error getting monthly meal rate:", error);
    return 65;
  }
};