"use server";

import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/Authoptions";

interface MealItem {
  date: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
}

interface MealData {
  email: string;
  month: string;
  year: number;
  meals: MealItem[];
  secretCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const uploadmeal = async (meal: MealItem[], month: string, year: number) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return {
        success: false,
        message: "User not authenticated"
      };
    }
    
    const userSecretCode = (session.user as any)?.secretCode;
    
    if (!userSecretCode) {
      return {
        success: false,
        message: "Secret code not found"
      };
    }
    
    const useremail = session.user.email;
    const mealcollection = await dbconnect("meals");
    
    const existingMeal = await mealcollection.findOne({
      email: useremail,
      month: month,
      year: year,
      secretCode: userSecretCode
    });
    
    if (existingMeal) {
      const updatedMeal = await mealcollection.updateOne(
        {
          email: useremail,
          month: month,
          year: year,
          secretCode: userSecretCode
        },
        {
          $set: {
            meals: meal,
            updatedAt: new Date()
          }
        }
      );
      
      return {
        success: true,
        message: "Meal data updated successfully",
      };
    } else {
      const mealData: MealData = {
        email: useremail,
        month: month,
        year: year,
        meals: meal,
        secretCode: userSecretCode,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const insertedMeal = await mealcollection.insertOne(mealData);
      
      return {
        success: true,
        message: "Meal data inserted successfully",
      };
    }
  } catch (error) {
    console.error("Error in uploadmeal:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to upload meal data"
    };
  }
};

export const getMealByMonth = async (month: string, year: number) => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return {
        success: false,
        message: "User not authenticated",
        data: null
      };
    }
    
    const userSecretCode = (session.user as any)?.secretCode;
    
    if (!userSecretCode) {
      return {
        success: false,
        message: "Secret code not found",
        data: null
      };
    }
    
    const useremail = session.user.email;
    const mealcollection = await dbconnect("meals");
    
    const mealData = await mealcollection.findOne({
      email: useremail,
      month: month,
      year: year,
      secretCode: userSecretCode
    });
    
    let plainData = null;
    if (mealData) {
      plainData = {
        email: mealData.email,
        month: mealData.month,
        year: mealData.year,
        meals: mealData.meals,
        createdAt: mealData.createdAt ? mealData.createdAt.toISOString() : null,
        updatedAt: mealData.updatedAt ? mealData.updatedAt.toISOString() : null
      };
    }
    
    return {
      success: true,
      data: plainData,
      message: "Meal data fetched successfully"
    };
  } catch (error) {
    console.error("Error in getMealByMonth:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch meal data",
      data: null
    };
  }
};