"use server"

import { dbconnect } from "@/lib/dbconnect"
import { ObjectId } from "mongodb"

export interface CostItem {
  name: string
  quantity: number
  price: number
}

export interface CostData {
  _id?: ObjectId
  date: string
  month: string
  Manageremail: string
  ManagerName: string
  category: string
  buyer: string
  note?: string
  items: CostItem[]
  grandTotal: number
  createdAt: string
}

export interface MonthData {
  month: string
  year: number
}

export const allmanager = async (): Promise<{ status: number; success: boolean; data?: string[]; message?: string }> => {
  try {
    const costcollection = await dbconnect("cost");

    const result = await costcollection
      .find({}, { projection: { ManagerName: 1, _id: 0 } })
      .toArray();

    const managers = [...new Set(result.map((item: any) => item.ManagerName))];

    return {
      status: 200,
      success: true,
      data: managers,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Error fetching managers",
    };
  }
};

export const getmonth = async (): Promise<{ status: number; success: boolean; data?: MonthData[]; message?: string }> => {
  try {
    const costcollection = await dbconnect("cost");

    const result = await costcollection
      .find({}, { projection: { month: 1, _id: 0 } })
      .toArray();

    const monthsMap = new Map<string, MonthData>();
    result.forEach((item: any) => {
      if (item.month) {
        const [month, year] = item.month.split('-');
        monthsMap.set(item.month, { month, year: parseInt(year) });
      }
    });
    
    const months = Array.from(monthsMap.values());

    return {
      status: 200,
      success: true,
      data: months,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Error fetching months",
    };
  }
};

export const consthistory = async (
  month: string | MonthData | "all", 
  manager: string
): Promise<{ status: number; success: boolean; data?: CostData[]; message?: string }> => {
  try {
    const costcollection = await dbconnect("cost");
    
    let query: any = {};
    
    if (month && month !== "all") {
      const monthStr = typeof month === 'object' ? `${month.month}-${month.year}` : month;
      query.month = monthStr;
    }
    
    if (manager && manager !== "all") {
      query.ManagerName = manager;
    }
    
    const result = await costcollection.find(query).toArray();
    
    const formattedData = result.map((item: any) => ({
      _id: item._id,
      date: item.date,
      month: item.month,
      Manageremail: item.Manageremail,
      ManagerName: item.ManagerName,
      category: item.category,
      buyer: item.buyer,
      note: item.note,
      items: item.items,
      grandTotal: item.grandTotal || 0,
      createdAt: item.createdAt,
    }));
    
    return {
      status: 200,
      success: true,
      data: formattedData,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Error fetching cost history",
    };
  }
};

export const getCostById = async (id: string): Promise<{ status: number; success: boolean; data?: CostData; message?: string }> => {
  try {
    const costcollection = await dbconnect("cost");
    
    if (!ObjectId.isValid(id)) {
      return {
        status: 400,
        success: false,
        message: "Invalid ID format",
      };
    }
    
    const result = await costcollection.findOne({ _id: new ObjectId(id) });
    
    if (!result) {
      return {
        status: 404,
        success: false,
        message: "Cost details not found",
      };
    }
    
    return {
      status: 200,
      success: true,
      data: {
        _id: result._id,
        date: result.date,
        month: result.month,
        Manageremail: result.Manageremail,
        ManagerName: result.ManagerName,
        category: result.category,
        buyer: result.buyer,
        note: result.note,
        items: result.items,
        grandTotal: result.grandTotal,
        createdAt: result.createdAt,
      },
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Error fetching cost details",
    };
  }
};