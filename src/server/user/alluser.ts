"use server"
import { dbconnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";

interface User {
  _id: ObjectId;
  Name: string;
  email: string;
  accountType: string;
  messName: string;
  secretCode: string;
  password: string;
}

interface ApiResponse<T> {
  status: number;
  data: T;
  success: boolean;
  message?: string;
}

export const alluser = async (): Promise<ApiResponse<User[]>> => {
  try {
    const usercollection = await dbconnect("users");

    const users = await usercollection.find({}).toArray();

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);

    return {
      status: 500,
      data: [],
      success: false,
      message: "Failed to fetch users",
    };
  }
};