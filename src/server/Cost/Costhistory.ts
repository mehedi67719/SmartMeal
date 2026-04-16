"use server";

import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

type MonthResponse = {
  status: number;
  success: boolean;
  data?: string[];
  message?: string;
};

type ManagerResponse = {
  status: number;
  success: boolean;
  allmanager?: string[];
  message?: string;
};

type CostItem = {
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
};

type CostData = {
  _id?: ObjectId;
  date: string;
  month: string;
  Manageremail: string;
  ManagerName: string;
  category: string;
  buyer: string;
  note: string;
  items: CostItem[];
  grandTotal: number;
  createdAt: string;
};

type CostHistoryResponse = {
  status: number;
  success: boolean;
  data?: CostData[];
  message?: string;
};

type FilterType = {
  month?: string;
  manager?: string;
};

export const allmonth = async (): Promise<MonthResponse> => {
  try {
    const costcollection = await dbconnect("cost");

    const result = await costcollection
      .find<{ month: string }>({}, { projection: { month: 1, _id: 0 } })
      .toArray();

    const month = [...new Set(result.map((item) => item.month))];

    return {
      status: 200,
      data: month,
      success: true,
    };
  } catch {
    return {
      status: 500,
      success: false,
      message: "Error fetching months",
    };
  }
};

export const allmanager = async (): Promise<ManagerResponse> => {
  try {
    const costcollection = await dbconnect("cost");

    const result = await costcollection
      .find<{ ManagerName: string }>({}, { projection: { ManagerName: 1, _id: 0 } })
      .toArray();

    const allmanager = [...new Set(result.map((item) => item.ManagerName))];

    return {
      allmanager,
      status: 200,
      success: true,
    };
  } catch {
    return {
      status: 500,
      success: false,
      message: "Error fetching all manager",
    };
  }
};

export const costhistory = async (
  filter: FilterType
): Promise<CostHistoryResponse> => {
  try {
    const { month, manager } = filter;

    const costcollection = await dbconnect("cost");

    const query: Partial<Pick<CostData, "month" | "ManagerName">> = {};

    if (month && month !== "all") {
      query.month = month;
    }

    if (manager && manager !== "all") {
      query.ManagerName = manager;
    }

    const result = await costcollection.find<CostData>(query).toArray();

    return {
      status: 200,
      data: result,
      success: true,
    };
  } catch {
    return {
      status: 500,
      success: false,
      message: "Error fetching cost history",
    };
  }
};