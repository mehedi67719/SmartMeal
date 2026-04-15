"use server"
import { authOptions } from "@/lib/Authoptions";
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";


interface CostData {
  date: string;
  Manageremail: string | null | undefined;
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

    const costcollection = await dbconnect("cost");

    if (!costdata) {
      return { success: false, error: "No data provided" };
    }

    const result = await costcollection.insertOne({
      ...costdata,
      createdAt: new Date(),
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in Costentry:", error);
    return { success: false, error: "Internal server error" };
  }
};