"use server";

import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/Authoptions";

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
  secretCode: string;
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
    const session = await getServerSession(authOptions);

    // console.log(session)
    
    if (!session) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const userSecretCode = (session.user as any)?.secretCode;
    
    if (!userSecretCode) {
      return {
        status: 401,
        success: false,
        message: "Secret code not found",
      };
    }

    const costcollection = await dbconnect("cost");

    const result = await costcollection
      .find<{ month: string }>({ secretCode: userSecretCode }, { projection: { month: 1, _id: 0 } })
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
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const userSecretCode = (session.user as any)?.secretCode;
    
    if (!userSecretCode) {
      return {
        status: 401,
        success: false,
        message: "Secret code not found",
      };
    }

    const costcollection = await dbconnect("cost");

    const result = await costcollection
      .find<{ ManagerName: string }>({ secretCode: userSecretCode }, { projection: { ManagerName: 1, _id: 0 } })
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
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return {
        status: 401,
        success: false,
        message: "Unauthorized",
      };
    }

    const userSecretCode = (session.user as any)?.secretCode;
    
    if (!userSecretCode) {
      return {
        status: 401,
        success: false,
        message: "Secret code not found",
      };
    }

    const { month, manager } = filter;

    const costcollection = await dbconnect("cost");

    const query: any = { secretCode: userSecretCode };

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