"use server"
import { authOptions } from "@/lib/Authoptions";
import { dbconnect } from "@/lib/dbconnect";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

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


const checkWriteAuthorization = async (): Promise<{ authorized: boolean; secretCode?: string; role?: string; error?: string }> => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { authorized: false, error: "Unauthorized: Please login first" };
  }

  const currentUser = session.user as any;
  const userRole = currentUser?.accountType;
  const userSecretCode = currentUser?.secretCode;

  if (userRole !== "controller" && userRole !== "manager") {
    return { authorized: false, error: "Access denied: Only manager and controller can add, update or delete cost entries" };
  }

  if (!userSecretCode) {
    return { authorized: false, error: "Secret code not found" };
  }

  return { authorized: true, secretCode: userSecretCode, role: userRole };
};


const checkReadAuthorization = async (): Promise<{ authorized: boolean; secretCode?: string; role?: string; error?: string }> => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return { authorized: false, error: "Unauthorized: Please login first" };
  }

  const currentUser = session.user as any;
  const userSecretCode = currentUser?.secretCode;

  if (!userSecretCode) {
    return { authorized: false, error: "Secret code not found" };
  }

  return { authorized: true, secretCode: userSecretCode, role: currentUser?.accountType };
};


export const Costentry = async (costdata: CostData): Promise<CostEntryResponse> => {
  try {
    const auth = await checkWriteAuthorization();
    
    if (!auth.authorized) {
      return { success: false, error: auth.error };
    }

    if (!costdata) {
      return { success: false, error: "No data provided" };
    }

    if (!costdata.date || !costdata.month || !costdata.category || !costdata.grandTotal) {
      return { success: false, error: "Missing required fields" };
    }

    const costcollection = await dbconnect("cost");

    const result = await costcollection.insertOne({
      ...costdata,
      secretCode: auth.secretCode,
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
    const auth = await checkReadAuthorization();
    
    if (!auth.authorized) {
      throw new Error(auth.error);
    }

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
    const auth = await checkReadAuthorization();
    
    if (!auth.authorized) {
      throw new Error(auth.error);
    }

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
    const auth = await checkReadAuthorization();
    
    if (!auth.authorized) {
      return 0;
    }

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


export const updateCostEntry = async (entryId: string, updatedData: Partial<CostData>, secretCode: string) => {
  try {
    const auth = await checkWriteAuthorization();
    
    if (!auth.authorized) {
      return { success: false, error: auth.error };
    }

    if (!entryId || !secretCode) {
      return { success: false, error: "Entry ID and secret code are required" };
    }

    const costcollection = await dbconnect("cost");
    
    const entry = await costcollection.findOne({ 
      _id: new ObjectId(entryId), 
      secretCode: secretCode 
    });
    
    if (!entry) {
      return { success: false, error: "Cost entry not found or unauthorized" };
    }
    
    const result = await costcollection.updateOne(
      { _id: new ObjectId(entryId), secretCode: secretCode },
      { $set: { ...updatedData, updatedAt: new Date() } }
    );
    
    return { success: true, data: result, message: "Cost entry updated successfully" };
  } catch (error) {
    console.error("Error updating cost entry:", error);
    return { success: false, error: "Failed to update cost entry" };
  }
};


export const deleteCostEntry = async (entryId: string, secretCode: string) => {
  try {
    const auth = await checkWriteAuthorization();
    
    if (!auth.authorized) {
      return { success: false, error: auth.error };
    }

    if (!entryId || !secretCode) {
      return { success: false, error: "Entry ID and secret code are required" };
    }

    const costcollection = await dbconnect("cost");
    
    const entry = await costcollection.findOne({ 
      _id: new ObjectId(entryId), 
      secretCode: secretCode 
    });
    
    if (!entry) {
      return { success: false, error: "Cost entry not found or unauthorized" };
    }
    
    const result = await costcollection.deleteOne({ 
      _id: new ObjectId(entryId), 
      secretCode: secretCode 
    });
    
    return { success: true, data: result, message: "Cost entry deleted successfully" };
  } catch (error) {
    console.error("Error deleting cost entry:", error);
    return { success: false, error: "Failed to delete cost entry" };
  }
};