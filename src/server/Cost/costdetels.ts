"use server"
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

type CostItem = {
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
};

type CostData = {
  _id: ObjectId;
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

type CostDetailsResponse = {
  status: number;
  success: boolean;
  data?: CostData;
  message?: string;
};

export const costdetels = async (id: string | ObjectId): Promise<CostDetailsResponse> => {
  try {
    const costcollection = await dbconnect("cost");

    const objectId = typeof id === 'string' ? new ObjectId(id) : id;

    const costdetels = await costcollection.findOne({ _id: objectId });

    if (!costdetels) {
      return {
        status: 404,
        success: false,
        message: "Cost details not found"
      };
    }

    return {
      status: 200,
      success: true,
      data: costdetels as CostData
    };
  } catch (error) {
    console.error("Error fetching cost details:", error);
    return {
      status: 500,
      success: false,
      message: "Failed to load cost details data"
    };
  }
};