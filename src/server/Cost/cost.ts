"use server"
import { authOptions } from "@/lib/Authoptions";
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";

interface CostData {
  date: string;
  month: string;
  Manageremail: string | null | undefined;
  ManagerName: string | null | undefined;
  category: string;
  buyer: string;
  note: string;
  items: Array<{
    itemName: string;
    quantity: string;
    unitPrice: string;
    totalPrice: string;
  }>;
  grandTotal: number;
  secretCode: string;
}

interface CostEntryResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const Costentry = async (costdata: CostData): Promise<CostEntryResponse> => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return { success: false, error: "Unauthorized" };
    }

    const userSecretCode = (session.user as any)?.secretCode;
    
    if (!userSecretCode) {
      return { success: false, error: "Secret code not found" };
    }

    const costcollection = await dbconnect("cost");

    if (!costdata) {
      return { success: false, error: "No data provided" };
    }

    const result = await costcollection.insertOne({
      ...costdata,
      secretCode: userSecretCode,
      createdAt: new Date(),
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in Costentry:", error);
    return { success: false, error: "Internal server error" };
  }
};

export const getCostEntries = async (secretCode: string) => {
  try {
    const costcollection = await dbconnect("cost");
    const entries = await costcollection.find({ secretCode: secretCode }).sort({ createdAt: -1 }).toArray();
    return entries;
  } catch (error) {
    console.error("Error fetching cost entries:", error);
    throw error;
  }
};

export const getCostEntriesByMonth = async (month: string, secretCode: string) => {
  try {
    const costcollection = await dbconnect("cost");
    const entries = await costcollection.find({ 
      month: month, 
      secretCode: secretCode 
    }).sort({ createdAt: -1 }).toArray();
    return entries;
  } catch (error) {
    console.error("Error fetching cost entries by month:", error);
    throw error;
  }
};

export const getTotalCostByMonth = async (month: string, secretCode: string) => {
  try {
    const costcollection = await dbconnect("cost");
    const result = await costcollection.aggregate([
      { $match: { month: month, secretCode: secretCode } },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } }
    ]).toArray();
    
    return result.length > 0 ? result[0].total : 0;
  } catch (error) {
    console.error("Error calculating total cost:", error);
    return 0;
  }
};